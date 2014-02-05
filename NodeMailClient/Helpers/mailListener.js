var listenerHelper      = require('./listener-helper');
var inspect             = require('util').inspect;

var listenMails = function(){
    console.log("Start listening mails...");
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
                getNewMails();
            });
            getNewMails();
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

var getNewMails = function(){
    listenerHelper.imap.search([ 'UNSEEN' ], function(err, results) {
        if(results.length !== 0){
            var fetch = listenerHelper.imap.fetch(results, {
                bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
                struct: true
            });
            listenerHelper.fetchMails(fetch);
        }
        else{
            console.log("no new mail in INBOX");
        }
    });
};


exports.listenMails = listenMails;