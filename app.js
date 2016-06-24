//instance of a generic resful web server.
var restify = require('restify');
//cross platform bot library provided by MS
var builder = require('botbuilder');
//LUIS Natural Language processing service to help us gain intent. 
var model = 'https://api.projectoxford.ai/luis/v1/application?id=e1c8189d-a1e1-460c-af14-c23f8719d69f&subscription-key=48fcce0fdf584caa8ccb0c93aa46b126'
//Create an instance of a restful web server
var server = restify.createServer();
//a Bot dialog object that helps us connect to LUIS, basically abstracts out the callback nature of intent handling
var dialog = new builder.LuisDialog(model);
//Register our bot id that we have registered at BotFrameworm, this identifies our bot here to the central bot hub
var ucBot = new builder.BotConnectorBot({ appId: 'UCBOT', appSecret: 'f0f5245b1b15439a850f051fb7c87133' });
//add our dialog to get invoked with our restful root path. Different dialog objects can be connected to restful paths
ucBot.add('/',dialog);
//Registed an intent handler for the LUIS intent 'GetBooks' which is an intent we created over at the LUIS application porthole
dialog.on('GetBooks',function(session, args){
    //LUIS will attempt to extract out data that matches entities we register in LUIS from the users phrase, we get these by this command
    var cl = builder.EntityRecognizer.findEntity(args.entities, 'course');
    //we can send a response back to the user use session.send
    //we can also access and persist data into user.userdata which is persisted through all sessions/chats of the user
    //this is also where we would invoke other classes/services to grab information to return or start a 2-way dialog and even drive more questions from here.
    session.send('Here is the materials list for  **'+cl.entity+'** Summer 2016\r\n\r\n'+
        '*ISBN 123456789 ![duck](http://aka.ms/Fo983c)\r\n\r\n'+
        '*Tuesdays 8:30am - 9:30am\r\n\r\n'+
        '*Thursdays 2:00pm - 3:30pm');

       

        

    
});
//another intent handler
dialog.on('GetClassInformation',function(session, args){
    var cl = builder.EntityRecognizer.findEntity(args.entities, 'course');

    session.send('Here is some information for course **'+cl.entity+'**\r\n\r\n'+
        '*School: Math and Sciences\r\n\r\n'+
        '*Building: East Wing\r\n\r\n'+ 
        '*Instructor: Ryan Galloway, PhD\r\n\r\n'+
        '*Required Books for Course: ISBN 14585421214, Book of Hard Knocks\r\n\r\n'+
        '*Next available opening: Spring 2017');

    
});
//and another
dialog.on('GetClassSchedule',function(session, args){
    var cl = builder.EntityRecognizer.findEntity(args.entities, 'course');
    session.send('Here is course schedule for  **'+cl.entity+'** Summer 2016\r\n\r\n'+
        '*Mondays 8:00am - 9:30am\r\n\r\n'+
        '*Tuesdays 8:30am - 9:30am\r\n\r\n'+
        '*Thursdays 2:00pm - 3:30pm');
});
//Register our bot with restify to have it be the invoked request processor
server.use(ucBot.verifyBotFramework({ appId: 'UCBOT', appSecret: 'f0f5245b1b15439a850f051fb7c87133' }));
//register a base url and have the bot listen to requests
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