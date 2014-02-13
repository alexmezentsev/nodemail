
var mailerConfig         = require('../Constants/mailerOptions'),
    mailHelper           = require('../Helpers/mail-helper');
    listenerHelper       = require('../Helpers/listener-helper');

var versionInfo = function (req, res) {
    res.json({"version": "0.1"});
};

var getUserLogin = function (req, res) {
    res.json({"login": mailerConfig.credentials.User});
};

var getAllMails = function (req, res) {
    var folderId = req.params.folderId;
    mailHelper.getMails(folderId, function(){
        res.json(this);
    });

};

exports.getAllMails = getAllMails;
exports.versionInfo = versionInfo;
exports.getUserLogin = getUserLogin;

