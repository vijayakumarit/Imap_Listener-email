
var MailListener = require("mail-listener2");
const simpleParser = require('mailparser').simpleParser;

var mailListener = new MailListener({
  username: "vijayakumar.vellaisamy@kumaran.com",
  password: "arielWINTE666",
  host: "outlook.office365.com",
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: false, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});
 
mailListener.start(); // start listening
 
// stop listening
//mailListener.stop();
 
mailListener.on("server:connected", function(){
  console.log("imapConnected");
});
 
mailListener.on("server:disconnected", function(){
  console.log("imapDisconnected");
});
 
mailListener.on("error", function(err){
  console.log(err);
});
 
mailListener.on("mail", async function(mail, seqno, attributes){
  // do something with mail object including attachments
  console.log("************");
  console.log("emailParsed", Object.keys(mail));
  console.log("^^^^^^^^^^", mail.subject);
  
  let parsed = await simpleParser(mail.text);
  //console.log("&&&&&", parsed.to.value)
  console.log("&&&&&", parsed.text)
  // mail processing code goes here
});
 
mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});
 
// it's possible to access imap object from node-imap library for performing additional actions. E.x.
//mailListener.imap.move(:msguids, :mailboxes, function(){})