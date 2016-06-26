"use strict";
const course_model_1 = require('../../models/course.model');
class CourseService {
    constructor() {
    }
    getCourseByCourseName(course) {
        return this.mockGetCourseData(course); // change to database lookup
    }
    mockGetCourseData(c) {
        //this method will not be here in actual bot 
        var course = new course_model_1.Course();
        course.name = c;
        course.building = "Math and Sciences";
        course.instructor = "Ron";
        course.nextsession = "Fall 2017";
        course.school = "Mathematics";
        return course;
    }
}
exports.CourseService = CourseService;
