var connect = require('connect');
var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic(__dirname + '/www'));

app.listen(process.env.PORT || 5000);