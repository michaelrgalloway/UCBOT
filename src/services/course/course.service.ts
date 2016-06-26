import {Course} from '../../models/course.model'


export class CourseService {
    constructor() { }

    public getCourseByCourseName(course: string): Course {
        return this.mockGetCourseData(course); // change to database lookup
        
    }

    private mockGetCourseData(c:string):Course{
        //this method will not be here in actual bot 
        var course = new Course();
        course.name = c;
        course.building = "Math and Sciences";
        course.instructor = "Ron";
        course.nextsession = "Fall 2017";
        course.school = "Mathematics";
        return course;
    }

}

