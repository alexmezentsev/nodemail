var logger              = require('../lib/logger')(module);
var transportHelper     = require('./transport-helper');
var listenerHelper      = require('./listener-helper');
var Imap                = require('imap');
var inspect             = require('util').inspect;


// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Alex m <nodetestproj@gmail.com>", // sender address
    to: "nodetestproj@gmail.com", // list of receivers
    subject: "Hello Alex", // Subject line
    text: "Hello Every One" // plaintext body
    //html: "Hello One" // html body
}

// send mail with defined transport object
var sendMail = function(){
    transportHelper.transport.sendMail(mailOptions, function(error ,actualResult){
        if(error){
            logger.info(error);
        }else{
            logger.info("Message sent: " + actualResult.message);
        }
        transportHelper.transport.close();
    });
}

var getMails = function(req, response){

    function openInbox(cb) {
        listenerHelper.imap.openBox('INBOX', true, cb);
    }

    listenerHelper.imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err){
                throw err;
            }

            var fetch = listenerHelper.imap.seq.fetch('1:*', {
                bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
                struct: true
            });

            listenerHelper.fetchMails(fetch);
        });
    });

    listenerHelper.imap.once('error', function(err) {
        console.log(err);
    });

    listenerHelper.imap.once('end', function() {
        console.log('Connection ended');
    });

    listenerHelper.imap.connect();

}

exports.getMails = getMails;

exports.sendMail = sendMail;