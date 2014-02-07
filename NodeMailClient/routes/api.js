
var mailerConfig      = require('../Constants/mailerOptions');

var versionInfo = function (req, res) {
    res.json({"version": "0.1"});
};

var getUserLogin = function (req, res) {
    res.json({"login": mailerConfig.credentials.User});
};

exports.versionInfo = versionInfo;
exports.getUserLogin = getUserLogin;