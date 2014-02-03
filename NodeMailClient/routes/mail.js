/**
 * Created by alexander.mezentsev on 2/3/14.
 */

var mailHelper = require('../Helpers/mail-helper');

exports.mail = function(req, res){
    mailHelper.sendMail(req, res);
   // res.send(mailHelper.sendMail(req, res));
};