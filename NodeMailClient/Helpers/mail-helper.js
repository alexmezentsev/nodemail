/**
 * Created by alexander.mezentsev on 2/3/14.
 */

var transportHelper = require('./transport-helper');
var listenerHelper = require('./listener-helper');

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


}


exports.listenMails = listenMails;

exports.sendMail = sendMail;