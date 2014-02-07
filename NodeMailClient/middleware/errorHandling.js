var log                 = require('../lib/logger')(module);

// TODO Remove 404 status response to custom 404 render view;
var notFoundError = function(req,res, next){
    log.error('Router was not found : ' + req.url);

    var response = {
        status      : 404,
        message     : 'Page not found',
        call_stack  : req.url
    };

    res.json(response);
};

// TODO Remove 500 status response to custom 500 render view;
var internalError = function(err, req, res, next){
    log.error('Internal error: ' + JSON.stringify(err));

    var response = {
        status      : 500,
        message     : 'Internal server error',
        call_stack  : err.data
    };

    res.json(response);
};

exports.notFoundError = notFoundError;
exports.internalError = internalError;