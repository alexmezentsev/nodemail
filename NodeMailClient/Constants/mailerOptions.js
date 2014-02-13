var nodeConfig = require('nconf');

exports.credentials = {
    User                    : nodeConfig.get('User'),
    Pass                    : nodeConfig.get('Pass')
};

exports.mailerTransportOptions = {
    Type                    : nodeConfig.get('Type'),
    Service                 : nodeConfig.get('Service')
};

exports.imapOptions = {
    imapMainBox             : nodeConfig.get('imapMainBox'),
    ImapHost                : nodeConfig.get('imapHost'),
    ImapPort                : nodeConfig.get('imapPort'),
    ImapSecure              : nodeConfig.get('imapSecure'),
    ImapMailbox             : nodeConfig.get('imapMailbox'),
    ImapMarkSeen            : nodeConfig.get('imapMarkSeen'),
    ImapFetchUnreadOnStart  : nodeConfig.get('imapFetchUnreadOnStart')
};

exports.imapGmail = {
    Inbox               : nodeConfig.get('gmailInbox'),
    Sent                : nodeConfig.get('gmailSentMails'),
    Trash               : nodeConfig.get('gmailTrash')
}