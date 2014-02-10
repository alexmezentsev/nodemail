
var mailHelper = require('../Helpers/mail-helper');

exports.list = function(req, res){
    mailHelper.getMails();
    // TODO: remove server response to the callback function.
    setTimeout(res.end(), 5000);
};