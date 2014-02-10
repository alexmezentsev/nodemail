var express         = require('express'),
    routes          = require('./routes'),
    user            = require('./routes/user'),
    mail            = require('./routes/mail'),
    config          = require('./lib/config'),
    http            = require('http'),
    path            = require('path'),
    winston         = require('winston'),
    logger          = require('./lib/logger')(module),
    errorHandler    = require('./middleware/errorHandling'),
    mailListener    = require('./Helpers/mailListener');
    api             = require('./routes/api');

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

// Routes.
app.get('/', routes.index);
app.get('/partials/:name', routes.partial);


// JSON API.
app.get('/api/getAllMails', api.getAllMails);
app.get('/api/versionInfo', api.versionInfo);
app.get('/api/userLogin', api.getUserLogin);


//app.get('/users', user.list);
//app.get('/mails', mail.mail);

app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function(){
    // TODO: Realize mail listener as mediator.
    logger.info('Express server listening on port ' + app.get('port'));
    mailListener.listenMails();
});
