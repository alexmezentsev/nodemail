var winston = require('winston');

var logger = function(module){
    var path = module.filename.split('/').slice(-2).join('/');
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize:   true,
                level:      'debug',
                label:      path
            })
        ]
    });
};
