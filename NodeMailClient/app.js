var express         = require('express');
var routes          = require('./routes');
var user            = require('./routes/user');
var mail            = require('./routes/mail');
var config          = require('./lib/config');
var http            = require('http');
var path            = require('path');
var winston         = require('winston');
var logger          = require('./lib/logger')(module);
var errorHandler      = require('./middleware/errorHandling');

var app = express();

// Set up environments.
app.set('port', process.env.PORT || config.get('port'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());// TODO: Change standard icon to customer icon.
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser(config.get("cookieParserPass")));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(errorHandler.notFoundError);
app.use(errorHandler.internalError);

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/mails', mail.mail);

http.createServer(app).listen(app.get('port'), function(){
    logger.info('Express server listening on port ' + app.get('port'));
});
