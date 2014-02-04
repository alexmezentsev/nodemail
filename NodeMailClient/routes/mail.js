var mailHelper      = require('../Helpers/mail-helper');


exports.mail = function(req, res){
    mailHelper.sendMail();
   // res.send(mailHelper.sendMail(req, res));
};