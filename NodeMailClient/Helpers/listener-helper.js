/**
 * Created by alexander.mezentsev on 2/3/14.
 */

var config = require('../Helpers/config');
var mailerConfig = require('../Constants/mailerOptions');

//var imapListener = function(){
//    return new MailListener({
//    username: mailerConfig.credentials.User,
//    password: mailerConfig.credentials.Pass,
//    host: mailerConfig.imapOptions.ImapHost,
//    port: mailerConfig.imapOptions.ImapPort, // imap port
//    secure: mailerConfig.imapOptions.ImapSecure, // use secure connection
//    mailbox: mailerConfig.imapOptions.ImapMailbox, // mailbox to monitor
//    markSeen: mailerConfig.imapOptions.ImapMarkSeen, // all fetched email willbe marked as seen and not fetched next time
//    fetchUnreadOnStart: mailerConfig.imapOptions.ImapFetchUnreadOnStart // use it only if you want to get all unread email on lib start. Default is `false`
//});
//}

exports.imapListener = imapListener;