"use strict";
var botframework = require('botbuilder');
var globals_1 = require('../config/globals');
var course_service_1 = require('../services/course/course.service');
var CourseLuisDialog = (function () {
    function CourseLuisDialog() {
    }
    CourseLuisDialog.prototype.GetClassInformation = function (session, args) {
        var cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        //reach out to course service for some data
        var _courseService = new course_service_1.CourseService();
        var course = _courseService.getCourseByCourseName(cl.entity);
        var textResponse = "Here is some information for course **" + cl.entity + "**\r\n\r\n\n                      *School: " + course.school + "\r\n\r\n\n                      *Building: " + course.building + "\r\n\r\n\n                      *Instructor: " + course.instructor + "\r\n\r\n\n                      *Required Books for Course: ISBN 14585421214, Book of Hard Knocks\r\n\r\n\n                      *Next available opening: " + course.nextsession;
        var reply = new builder.Message().setText(session, textResponse)
            .addAttachment({ fallbackText: text, contentType: 'image/jpeg', contentUrl: 'http://neveryetmelted.com/wp-images/SpockSalute.jpg' });
        session.send(reply);
        // session.send(`Here is some information for course **${cl.entity}**\r\n\r\n
        //               *School: ${course.school}\r\n\r\n
        //               *Building: ${course.building}\r\n\r\n
        //               *Instructor: ${course.instructor}\r\n\r\n
        //               *Required Books for Course: ISBN 14585421214, Book of Hard Knocks\r\n\r\n
        //               *Next available opening: ${course.nextsession}`);
    };
    CourseLuisDialog.prototype.GetBooks = function (session, args) {
        var cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        session.send("Here is the materials list for  **" + cl.entity + "** Summer 2016\r\n\r\n\n                      *ISBN 123456789 ![duck](http://aka.ms/Fo983c)\r\n\r\n\n                      *Tuesdays 8:30am - 9:30am\r\n\r\n\n                      *Thursdays 2:00pm - 3:30pm");
    };
    CourseLuisDialog.prototype.GetClassSchedule = function (session, args) {
        var cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        session.send("Here is course schedule for  **" + cl.entity + "** Summer 2016\r\n\r\n\n                      *Mondays 8:00am - 9:30am\r\n\r\n\n                      *Tuesdays 8:30am - 9:30am\r\n\r\n\n                      *Thursdays 2:00pm - 3:30pm");
    };
    CourseLuisDialog.prototype.ConstructDialog = function () {
        var dialog = new botframework.LuisDialog(globals_1.Globals.LUISDialogModelUrl);
        dialog.on('GetBooks', this.GetBooks);
        dialog.on('GetClassInformation', this.GetClassInformation);
        dialog.on('GetClassSchedule', this.GetClassSchedule);
        return dialog;
    };
    return CourseLuisDialog;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new CourseLuisDialog().ConstructDialog();
