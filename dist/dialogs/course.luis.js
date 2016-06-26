"use strict";
const botframework = require('botbuilder');
const globals_1 = require('../config/globals');
const course_service_1 = require('../services/course/course.service');
class CourseLuisDialog {
    constructor(_courseService) {
        this._courseService = _courseService;
    }
    GetClassInformation(session, args) {
        var cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        //reach out to course service for some data
        var course = this._courseService.getCourseByCourseName(cl.entity);
        session.send(`Here is some information for course **${cl.entity}**\r\n\r\n' +
            '*School: ${course.school}\r\n\r\n' +
            '*Building: ${course.building}\r\n\r\n' +
            '*Instructor: ${course.instructor}\r\n\r\n' +
            '*Required Books for Course: ISBN 14585421214, Book of Hard Knocks\r\n\r\n' +
            '*Next available opening: ${course.nextsession}`);
    }
    GetBooks(session, args) {
        var cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        session.send(`Here is the materials list for  **' + cl.entity + '** Summer 2016\r\n\r\n' +
            '*ISBN 123456789 ![duck](http://aka.ms/Fo983c)\r\n\r\n' +
            '*Tuesdays 8:30am - 9:30am\r\n\r\n' +
            '*Thursdays 2:00pm - 3:30pm`);
    }
    GetClassSchedule(session, args) {
        var cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        session.send(`Here is course schedule for  **' + cl.entity + '** Summer 2016\r\n\r\n' +
            '*Mondays 8:00am - 9:30am\r\n\r\n' +
            '*Tuesdays 8:30am - 9:30am\r\n\r\n' +
            '*Thursdays 2:00pm - 3:30pm`);
    }
    ConstructDialog() {
        var dialog = new botframework.LuisDialog(globals_1.Globals.LUISDialogModelUrl);
        dialog.on('GetBooks', this.GetBooks);
        dialog.on('GetClassInformation', this.GetClassInformation);
        dialog.on('GetClassSchedule', this.GetClassSchedule);
        return dialog;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new CourseLuisDialog(new course_service_1.CourseService()).ConstructDialog();
