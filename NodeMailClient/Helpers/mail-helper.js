var logger              = require('../lib/logger')(module),
    transportHelper     = require('./transport-helper'),
    listenerHelper      = require('./listener-helper');

// setup e-mail data with unicode symbols
var mailOptions = {
    from                : "Alex m <nodetestproj@gmail.com>", // sender address
    to                  : "nodetestproj@gmail.com", // list of receivers
    subject             : "Hello Alex", // Subject line
    text                : "Hello Every One" // plaintext body
}

// send mail with defined transport object
var sendMail = function(){
    transportHelper.transport.sendMail(mailOptions, function(error ,actualResult){
        if (error)
        {
            logger.error(error);
        }else
        {
            logger.info("Message sent: " + actualResult.message);
        }
        transportHelper.transport.close();
    });
}

var getMails = function(folder, callback){

    var connection = listenerHelper.folders[folder].fConnection;
    var folderName = listenerHelper.folders[folder].fName;

    if(folder === 0)
    {
        fetchAll(connection, function(){
            callback.call(this);
        });
    }
    else
    {
        connection.connect();

        connection.once('ready', function() {
            listenerHelper.openBox(connection, folderName, function(err, box) {
                if (err)
                {
                    throw err;
                }
                fetchAll(connection, function(){

                    callback.call(this);
                    if(folder === 1){

                    }
                    //connection.end();
                });
            });
        });

        connection.once('error', function(err) {
            logger.error(err);
        });

        connection.once('end', function() {
            logger.info('Connection ended');
        });
    }
}

var fetchAll = function(connection, callback){
    var fetch = connection.seq.fetch('1:*', {
        bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
        struct: true
    });
    listenerHelper.fetchMails(fetch, function(){
        callback.call(this);
    });
}

exports.getMails = getMails;

exports.sendMail = sendMail;