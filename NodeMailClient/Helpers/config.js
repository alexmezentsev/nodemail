/**
 * Created by alexander.mezentsev on 2/3/14.
 */
var nodeConf = require("nconf");

nodeConf.argv().env().file({file:'./config.json'});

module.exports = nodeConf;