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

var listenMails = function(req, response){

    function openInbox(cb) {
        listenerHelper.imap.openBox('INBOX', true, cb);
    }

    listenerHelper.imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err){
                throw err;
            }

            listenerHelper.imap.once('mail', function(numNewMsgs) {
                console.log("NEW MAILS : " + numNewMsgs);
            });

            var mailsArr = [];

            var fetch = listenerHelper.imap.seq.fetch('1:*', {
                bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
                struct: true
            });
            fetch.on('message', function(msg, seqno) {
                var prefix = seqno;
                var newmessage = {};
                msg.on('body', function(stream, info) {
                    var buffer = '';
                    stream.on('data', function(chunk) {
                        if (info.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)'){
                            buffer += chunk.toString('utf8');
                        }
                        if (info.which === 'TEXT'){
                            buffer += chunk.toString('utf8');
                        }
                    });
                    stream.once('end', function() {
                        //console.log(prefix + ' Message');
                        if (info.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)'){
                            //console.log("{H E A D E R} \n", inspect(Imap.parseHeader(buffer)));
                            newmessage.mheaders = inspect(Imap.parseHeader(buffer));
                        }
                        if (info.which === 'TEXT'){
                            //console.log("{B O D Y} \n", buffer);
                            newmessage.mbody = buffer;
                        }
                    });
                });
                msg.once('attributes', function(attrs) {
                    newmessage.mid = attrs.uid;
                });
                msg.once('end', function() {
                    mailsArr.push(newmessage);
                    console.log(prefix + ' Message Finished');
                    console.log("----------------------------------------------------------------------------------------------");
                });
            });
            fetch.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });
            fetch.once('end', function() {
                console.log('Done fetching all messages!');
                console.log('Mails Array:');
                console.log(mailsArr);
               // listenerHelper.imap.end();
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