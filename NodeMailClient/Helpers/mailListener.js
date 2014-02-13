var listenerHelper      = require('./listener-helper'),
    inspect             = require('util').inspect,
    logger              = require('../lib/logger')(module),
    io                  = require('socket.io');

var listenMails = function(socket){
    logger.info("Start listening mails...");
    var connection = listenerHelper.folders[0].fConnection;
    var folder = listenerHelper.folders[0].fName;
    connection.once('ready', function() {

        listenerHelper.openBox(connection, folder, function(err, box) {
            if (err)
            {
                throw err;
            }
            connection.once('mail', function(n) {
                logger.info("NEW MAILS!");
                getNewMails(false, connection, socket);
            });
            getNewMails(true, connection, socket);
        });
    });

    connection.once('error', function(err) {
        logger.error(err);
    });

    connection.once('end', function() {
        logger.info('Connection ended');
    });

    connection.connect();
}

var getNewMails = function(isAppStarting, connection, socket){
    connection.search([ 'UNSEEN' ], function(err, results) {
        if (results.length !== 0)
        {
            logger.info("You have " + results.length + " unseen mails");
            var fetch = connection.fetch(results, {
                bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
                struct: true
            });
            listenerHelper.fetchMails(fetch, function(){
                if(!isAppStarting){
                    //var socket = io.connect('http://localhost');
                    socket.emit('mails', this)//console.log(this);
                }
            });
        }else
        {
            logger.info("no UNSEEN mails in INBOX");
        }
    });
};

exports.listenMails = listenMails;