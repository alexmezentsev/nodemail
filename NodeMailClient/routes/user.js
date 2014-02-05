
/*
 * GET users listing.
 */
//var MailListener = require("mail-listener");
var mailHelper = require('../Helpers/mail-helper');

exports.list = function(req, res){
    mailHelper.getMails();
    setTimeout(res.end(), 5000);
};