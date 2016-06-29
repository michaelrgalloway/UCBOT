"use strict";
var course_model_1 = require('../../models/course.model');
var CourseService = (function () {
    function CourseService() {
    }
    CourseService.prototype.getCourseByCourseName = function (course) {
        return this.mockGetCourseData(course); // change to database lookup
    };
    CourseService.prototype.mockGetCourseData = function (c) {
        //this method will not be here in actual bot 
        var course = new course_model_1.Course();
        course.name = c;
        course.building = "Math and Sciences";
        course.instructor = "Ron";
        course.nextsession = "Fall 2017";
        course.school = "Mathematics";
        return course;
    };
    return CourseService;
}());
exports.CourseService = CourseService;
