
/*
 * GET users listing.
 */
var MailListener = require("mail-listener");
var mailHelper = require('../Helpers/mail-helper');

exports.list = function(req, res){
    mailHelper.listenMails(req, res);
  //res.send("respond with a resource");
};