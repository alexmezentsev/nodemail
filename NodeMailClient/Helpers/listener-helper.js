var config              = require('../lib/config');
var mailerConfig        = require('../Constants/mailerOptions');
var Imap                = require('imap');
var inspect             = require('util').inspect;
var logger              = require('../lib/logger')(module);

var imap = new Imap({
    user: mailerConfig.credentials.User,
    password: mailerConfig.credentials.Pass,
    host: mailerConfig.imapOptions.ImapHost,
    port: mailerConfig.imapOptions.ImapPort,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

var fetchMails = function(fetch){
    var mailsArr = [];
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
        });
    });
    fetch.once('error', function(err) {
        logger.error('Fetch error: ' + err);
    });
    fetch.once('end', function() {
        console.log('Done fetching all messages!');
        console.log('Mails Array:');
        console.log(mailsArr);
        // listenerHelper.imap.end();
    });
}

exports.fetchMails = fetchMails;

exports.imap = imap;