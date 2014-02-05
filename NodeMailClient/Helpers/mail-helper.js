var logger              = require('../lib/logger')(module);
var transportHelper     = require('./transport-helper');
var listenerHelper      = require('./listener-helper');

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

var getMails = function(){

     var fetch = listenerHelper.imap.seq.fetch('1:*', {
         bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
         struct: true
         });

     listenerHelper.fetchMails(fetch);

}

exports.getMails = getMails;

exports.sendMail = sendMail;