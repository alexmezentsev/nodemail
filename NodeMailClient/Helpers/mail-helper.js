var transportHelper     = require('./transport-helper');
var listenerHelper      = require('./listener-helper');
var Imap                = require('imap');
var inspect             = require('util').inspect;
var logger              = require('../lib/logger')(module);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Alex m ✔ <nodetestproj@gmail.com>", // sender address
    to: "nodetestproj@gmail.com", // list of receivers
    subject: "Hello Alex", // Subject line
    text: "Hello Every One", // plaintext body
    html: "<b>Hello One</b>" // html body
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

var listenMails = function(req, response){
    response.writeHead(200, {"Content-Type": "text/plain"});


    function openInbox(cb) {
        listenerHelper.imap.openBox('INBOX', true, cb);
    }

    listenerHelper.imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err) throw err;
            var f = listenerHelper.imap.seq.fetch('1:10', {
                bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                struct: true
            });
            f.on('message', function(msg, seqno) {
                console.log('Message #%d', seqno);
                var prefix = '(#' + seqno + ') ';
                msg.on('body', function(stream, info) {
                    var buffer = '';
                    stream.on('data', function(chunk) {
                        buffer += chunk.toString('utf8');
                    });
                    stream.once('end', function() {
                        console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                        response.write(inspect(Imap.parseHeader(buffer)));
                    });
                });
                msg.once('attributes', function(attrs) {
                    console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                });
                msg.once('end', function() {
                    console.log(prefix + 'Finished');
                });
            });
            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function() {
                console.log('Done fetching all messages!');
                response.end();
                listenerHelper.imap.end();
            });
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



exports.listenMails = listenMails;

exports.sendMail = sendMail;