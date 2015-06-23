var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var copy = require('gulp-copy');

var paths = {
	sass: ['./scss/**/*.scss'],
	js: ['./src/**/*/.js'],
	templates: ['./src/**/*.html']
};

gulp.task('default', ['sass', 'js', 'templates']);

gulp.task('js', function (done) {
	buildJS(false)
	.on('end', done);
});

gulp.task('sass', function (done) {
	gulp.src('./scss/ionic.app.scss')
		.pipe(sass())
		.pipe(gulp.dest('./www/css/'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./www/css/'))
		.on('end', done);
});

gulp.task('templates', function (done) {
	gulp.src(paths.templates)
	.pipe(copy('www', {prefix: 1}))
	.on('end', done);
});

gulp.task('watch', function () {
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.templates, ['templates']);
	buildJS(true);
});

gulp.task('install', ['git-check'], function () {
	return bower.commands.install()
		.on('log', function (data) {
			gutil.log('bower', gutil.colors.cyan(data.id), data.message);
		});
});

gulp.task('git-check', function (done) {
	if (!sh.which('git')) {
		console.log(
			'  ' + gutil.colors.red('Git is not installed.'),
			'\n  Git, the version control system, is required to download Ionic.',
			'\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
			'\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
		);
		process.exit(1);
	}
	done();
});

function buildJS(watch) {
	var args = watchify.args;
	args.paths = [
		"src",
		"www/lib/ionic/js",
		"www/lib"
	];
	var bundler = browserify('strizhapp.js', args);
	if (watch) {
		bundler = watchify(bundler);
	}
	bundler.on('log', gutil.log);

	function rebundle(files) {
		if (files) {
			gutil.log('Browserify Update', files);
		}

		var stream = bundler
			.bundle()
			.on('error', function(error) {
				gutil.log('Browserify Error', error, gutil.colors.red);
			})
			.pipe(source('strizhapp.js'))
			.pipe(gulp.dest('./www/js/'));

		return stream;
	}

	bundler.on('update', rebundle);

	/*
	stream = stream.pipe(buffer()).pipe(uglify());
	 */
	return rebundle()
}