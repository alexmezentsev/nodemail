/**
 * Created by alexander.mezentsev on 2/3/14.
 */

var transportHelper = require('./transport-helper');
var listenerHelper = require('./listener-helper');
var Imap = require('imap');
    inspect = require('util').inspect;

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Alex m ✔ <nodetestproj@gmail.com>", // sender address
    to: "nodetestproj@gmail.com", // list of receivers
    subject: "Hello Alex", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

// send mail with defined transport object
var sendMail = function(req, response){
    transportHelper.transport.sendMail(mailOptions, function(error, res){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + res.message);
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(res.message);
            response.end();
        }
        // if you don't want to use this transport object anymore, uncomment following line
        transportHelper.transport.close(); // shut down the connection pool, no more messages
    });
}

var listenMails = function(req, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    listenerHelper.imap.once('ready', function() {
        openInbox(function(err, box) {
            if (err) throw err;
            var f = listenerHelper.imap.seq.fetch('1:3', {
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
                        var headers = inspect(Imap.parseHeader(buffer));
                        console.log(prefix + 'Parsed header: %s', headers);
                        response.write(headers);
                    });
                });
                msg.once('attributes', function(attrs) {
                    console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                });
                msg.once('end', function() {
                    console.log(prefix + 'Finished');
                    response.end();
                });
            });
            f.once('error', function(err) {
                console.log('Fetch error: ' + err);
            });
            f.once('end', function() {
                console.log('Done fetching all messages!');
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


function openInbox(cb) {
    listenerHelper.imap.openBox('INBOX', true, cb);
}

exports.listenMails = listenMails;

exports.sendMail = sendMail;