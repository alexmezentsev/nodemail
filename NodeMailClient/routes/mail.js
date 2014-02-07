var mailHelper      = require('../Helpers/mail-helper');

exports.mail = function(req, res){
    mailHelper.sendMail();
    setTimeout(res.end(), 5000);
};