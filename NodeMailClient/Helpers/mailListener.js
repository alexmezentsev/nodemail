var listenerHelper      = require('./listener-helper'),
    inspect             = require('util').inspect,
    logger              = require('../lib/logger')(module),
    io                  = require('socket.io');

var listenMails = function(){
    logger.info("Start listening mails...");
    function openInbox(cb) {
        listenerHelper.imap.openBox('INBOX', true, cb);
    }
    listenerHelper.imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err)
            {
                throw err;
            }
            listenerHelper.imap.once('mail', function(n) {
                logger.info("NEW MAILS!");
                getNewMails();
                //socket.emit('newm', { hello: n });
            });
            getNewMails();
        });
    });

    listenerHelper.imap.once('error', function(err) {
        logger.error(err);
    });

    listenerHelper.imap.once('end', function() {
        logger.info('Connection ended');
    });

    listenerHelper.imap.connect();
}

var getNewMails = function(){
    listenerHelper.imap.search([ 'UNSEEN' ], function(err, results) {
        if (results.length !== 0)
        {
            logger.info("You have " + results.length + " unseen mails");
            var fetch = listenerHelper.imap.fetch(results, {
                bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
                struct: true
            });
            listenerHelper.fetchMails(fetch, function(){
//                var socket = io.connect('http://localhost');
//                socket.emit('mails', this)//console.log(this);
            });
        }else
        {
            logger.info("no UNSEEN mails in INBOX");
        }
    });
};

exports.listenMails = listenMails;