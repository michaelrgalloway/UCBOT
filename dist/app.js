"use strict";
var restify = require('restify');
var builder = require('botbuilder');
var globals_1 = require('./config/globals');
var course_luis_1 = require('./dialogs/course.luis');
//register a dialog
var ucBot = new builder.BotConnectorBot({ appId: globals_1.Globals.botId, appSecret: globals_1.Globals.botSecret });
ucBot.add('/', course_luis_1.default);
//create server
var server = restify.createServer();
server.use(ucBot.verifyBotFramework({ appId: globals_1.Globals.botId, appSecret: globals_1.Globals.botSecret }));
server.post('/v1/messages', ucBot.listen());
//hand default get route incase of navigating with browser
server.get('/', function (req, res, next) {
    res.send('taller louder drier fatter');
    next();
});
//start the slaver
server.listen(process.env.PORT || 5000, function () {
    console.log('%s listening to %s', server.name, server.url);
});
