var nodeConf = require("nconf");

nodeConf.argv().env().file({file:'./config.json'});

module.exports = nodeConf;