/**
 * Created by alexander.mezentsev on 2/3/14.
 */
var nodeConfig = require('nconf');

exports.credentials = {
    User: nodeConfig.get('User'),
    Pass: nodeConfig.get('Pass')
}

exports.mailerTransportOptions = {
    Type : nodeConfig.get('Type'),
    Service: nodeConfig.get('Service')
};

exports.imapOptions = {
    ImapHost : nodeConfig.get('imapHost'),
    ImapPort: nodeConfig.get('imapPort'),
    ImapSecure : nodeConfig.get('imapSecure'),
    ImapMailbox: nodeConfig.get('imapMailbox'),
    ImapMarkSeen: nodeConfig.get('imapMarkSeen'),
    ImapFetchUnreadOnStart : nodeConfig.get('imapFetchUnreadOnStart')
};