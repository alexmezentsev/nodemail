var config              = require('../lib/config'),
    mailerConfig        = require('../Constants/mailerOptions'),
    Imap                = require('imap'),
    inspect             = require('util').inspect,
    logger              = require('../lib/logger')(module);

var imap = new Imap({
    user                : mailerConfig.credentials.User,
    password            : mailerConfig.credentials.Pass,
    host                : mailerConfig.imapOptions.ImapHost,
    port                : mailerConfig.imapOptions.ImapPort,
    tls                 : true,
    tlsOptions          : { rejectUnauthorized: false }
});

var fetchMails = function(fetch, callback){
    var mailsArr = [];
    fetch.on('message', function(msg, seqno) {
        var newmessage = {};
        msg.on('body', function(stream, info) {
            var buffer = '';
            stream.on('data', function(chunk) {
                if (info.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)')
                {
                    buffer += chunk.toString('utf8');
                }
                if (info.which === 'TEXT')
                {
                    buffer += chunk.toString('utf8');
                }
            });

            stream.once('end', function() {
                if (info.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)')
                {
                    newmessage.mheaders = inspect(Imap.parseHeader(buffer));
                    var obj = eval("(" + newmessage.mheaders + ")");
                    newmessage.mheaders = obj;
                }
                if (info.which === 'TEXT')
                {
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
        var output = {total:mailsArr.length, items:[]};
        output.items = mailsArr;
        console.log(output);
        callback.call(output);
    });
}

exports.fetchMails = fetchMails;

exports.imap = imap;