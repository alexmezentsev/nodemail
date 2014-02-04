var config              = require('../lib/config');
var mailerConfig        = require('../Constants/mailerOptions');
var Imap                = require('imap');

var imap = new Imap({
    user: mailerConfig.credentials.User,
    password: mailerConfig.credentials.Pass,
    host: mailerConfig.imapOptions.ImapHost,
    port: mailerConfig.imapOptions.ImapPort,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

exports.imap = imap;