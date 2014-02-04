var nodemailer       = require("nodemailer");
var config           = require('../lib/config');
var mailerConfig     = require('../Constants/mailerOptions');

// create reusable transport method (opens pool of SMTP connections)
var transport = nodemailer.createTransport(mailerConfig.mailerTransportOptions.Type,{
    service: mailerConfig.mailerTransportOptions.Service,
    auth: {
        user: mailerConfig.credentials.User,
        pass: mailerConfig.credentials.Pass
    }
});

exports.transport = transport;
