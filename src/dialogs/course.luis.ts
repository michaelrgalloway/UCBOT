import * as botframework from 'botbuilder';
import { Globals } from '../config/globals';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course/course.service';

class CourseLuisDialog {

    constructor() {

    }

    public GetClassInformation(session: botframework.Session, args: any): void {
        let cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        //reach out to course service for some data
        let _courseService = new CourseService();
        let course = _courseService.getCourseByCourseName(cl.entity);

        let textResponse = `Here is some information for course **${cl.entity}**\r\n\r\n
                      *School: ${course.school}\r\n\r\n
                      *Building: ${course.building}\r\n\r\n
                      *Instructor: ${course.instructor}\r\n\r\n
                      *Required Books for Course: ISBN 14585421214, Book of Hard Knocks\r\n\r\n
                      *Next available opening: ${course.nextsession}`

        var reply = new botframework.Message().setText(session, textResponse)
                .addAttachment({ fallbackText: 'pelnog', contentType: 'image/jpeg', contentUrl: 'http://neveryetmelted.com/wp-images/SpockSalute.jpg' });
        session.send(reply);
        // session.send(`Here is some information for course **${cl.entity}**\r\n\r\n
        //               *School: ${course.school}\r\n\r\n
        //               *Building: ${course.building}\r\n\r\n
        //               *Instructor: ${course.instructor}\r\n\r\n
        //               *Required Books for Course: ISBN 14585421214, Book of Hard Knocks\r\n\r\n
        //               *Next available opening: ${course.nextsession}`);

    }

    public GetBooks(session: botframework.Session, args: any): void {
        let cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        session.send(`Here is the materials list for  **${cl.entity}** Summer 2016\r\n\r\n
                      *ISBN 123456789 ![duck](http://aka.ms/Fo983c)\r\n\r\n
                      *Tuesdays 8:30am - 9:30am\r\n\r\n
                      *Thursdays 2:00pm - 3:30pm`);

    }

    public GetClassSchedule(session: botframework.Session, args: any): void {
        let cl = botframework.EntityRecognizer.findEntity(args.entities, 'course');
        session.send(`Here is course schedule for  **${cl.entity}** Summer 2016\r\n\r\n
                      *Mondays 8:00am - 9:30am\r\n\r\n
                      *Tuesdays 8:30am - 9:30am\r\n\r\n
                      *Thursdays 2:00pm - 3:30pm`);

    }

    public ConstructDialog(): botframework.LuisDialog {
        let dialog = new botframework.LuisDialog(Globals.LUISDialogModelUrl);
        dialog.on('GetBooks', this.GetBooks);
        dialog.on('GetClassInformation', this.GetClassInformation);
        dialog.on('GetClassSchedule', this.GetClassSchedule);
        return dialog;
    }

}

export default new CourseLuisDialog().ConstructDialog();