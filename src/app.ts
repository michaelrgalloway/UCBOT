import * as restify from 'restify';
import * as builder from 'botbuilder';
import { Globals } from './config/globals';
import courseluisdialog from './dialogs/course.luis'


//register a dialog
var ucBot = new builder.BotConnectorBot({ appId: Globals.botId, appSecret: Globals.botSecret });
ucBot.add('/',courseluisdialog);
//create server
var server = restify.createServer();
server.use(ucBot.verifyBotFramework({ appId: Globals.botId, appSecret: Globals.botSecret }));
server.post('/v1/messages', ucBot.listen());
//hand default get route incase of navigating with browser
server.get('/', function(req, res, next) {
  res.send('taller louder drier fatter');
  next();
});
//start the slaver
server.listen(process.env.PORT || 5000, function () {
    console.log('%s listening to %s', server.name, server.url);
});