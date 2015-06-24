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

var watch = require('gulp-watch');

var paths = {
	sass: ['./src/**/*.scss'],
	js: ['./src/**/*/.js'],
	templates: ['./src/**/*.html']
};

var packageJson = require('./package.json');

gulp.task('default', ['sass', 'js', 'templates']);

gulp.task('js', function (done) {
	buildJS(false).on('end', done);
});

gulp.task('sass', function (done) {
	buildCSS().on('end', done);
});

gulp.task('templates', function (done) {
	copyTemplates().on('end', done);
});

gulp.task('watch', function () {
	buildCSS(true);
	copyTemplates(true);
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

function copyTemplates(isWatched) {
	var stream = gulp.src(paths.templates);
	if (isWatched) {
		stream = stream.pipe(watch(paths.templates));
	}
	return stream.pipe(copy('www', {prefix: 1}));
}

function buildCSS(isWatched) {
	var stream = gulp.src('./src/strizhapp.scss');
	if (isWatched) {
		stream = stream.pipe(watch(paths.sass));
	}
	return stream
		.pipe(sass())
		.pipe(gulp.dest('./www/css/'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./www/css/'));
}

function buildJS(isWatched) {
	var args = watchify.args;
	args.paths = [
		"src",
		"www/lib/ionic/js",
		"www/lib"
	];
	var bundler = browserify('strizhapp.js', args);
	if (isWatched) {
		bundler = watchify(bundler);
	}
	bundler.on('log', gutil.log);
	if (packageJson.browserify.external) {
		bundler.external(packageJson.browserify.external);
	}


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