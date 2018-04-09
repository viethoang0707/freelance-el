
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ExamMember } from './exam-member.model';
import { Answer } from './answer.model';
import { Submission } from './submission.model';
import { CourseUnit } from './course-unit.model';

@Model('etraining.course_log')
export class CourseLog extends BaseModel{

    constructor(){
        super();
        
        this.user_id = undefined;
        this.course_id = undefined;
        this.res_id = undefined;
        this.res_model = undefined;
        this.note = undefined;
        this.code = undefined;
        this.start = undefined;
        this.attachment_url = undefined;
        this.attachment_id = undefined;
    }

    res_id: number;
    user_id: number;
    course_id: number;
    res_model: string;
    note: string;
    code: string;
    @FieldProperty<Date>()
    start: Date;
    attachment_url: string;
    attachment_id: number;

    static userStudyActivity(context:APIContext, userId, courseId):Observable<any> {
        var domain = "";
        if (courseId)
            domain = "[('user_id','=',"+userId+"),('course_id','=',"+courseId+")]";
        else
            domain = "[('user_id','=',"+userId+")]"
        return CourseLog.search(context,[], domain );
    }

    static courseActivity(context:APIContext, courseId):Observable<any> {
        return CourseLog.search(context,[], "[('course_id','=',"+courseId+")]" );
    }

    static startCourseUnit(context:APIContext, userId:number, courseId: number,  unit:CourseUnit):Observable<any> {
        var log = new CourseLog();
        log.user_id = userId;
        log.res_id = unit.id;
        log.course_id = courseId;
        log.res_model = CourseUnit.Model;
        log.note = 'Start course unit';
        log.code = "START_UNIT";
        log.start = new Date();
        return log.save(context);
    }

    static finishCourseUnit(context:APIContext, userId:number, courseId: number,  unit:CourseUnit):Observable<any> {
        var log = new CourseLog();
        log.user_id = userId;
        log.res_id = unit.id;
        log.course_id = courseId;
        log.res_model = CourseUnit.Model;
        log.note = 'finish course unit';
        log.code = "FINISH_UNIT";
        log.start = new Date();
        return log.save(context);
    }

}


@Model('etraining.exam_log')
export class ExamLog extends BaseModel{

    constructor(){
        super();
        
        this.user_id = undefined;
        this.exam_id = undefined;
        this.res_id = undefined;
        this.res_model = undefined;
        this.note = undefined;
        this.code = undefined;
        this.start = undefined;
        this.attachment_url = undefined;
        this.attachment_id = undefined;
    }

    res_id: number;
    user_id: number;
    exam_id: number;
    res_model: string;
    note: string;
    code: string;
    @FieldProperty<Date>()
    start: Date;
    attachment_url: string;
    attachment_id: number;


    static userExamActivity(context:APIContext, userId, examId):Observable<any> {
        var domain = "";
        if (examId)
            domain = "[('user_id','=',"+userId+"),('exam_id','=',"+examId+")]";
        else
            domain = "[('user_id','=',"+userId+")]"
        return ExamLog.search(context,[], domain );
    }

    static startExam(context:APIContext, userId:number, examId: number, submit:Submission):Observable<any> {
        var log = new ExamLog();
        log.user_id = userId;
        log.exam_id =  examId;
        log.res_id = submit.id;
        log.res_model = Submission.Model;
        log.note = 'Start exam';
        log.code = 'START_EXAM';
        log.start = new Date();
        return log.save(context);
    }

    static finishExam(context:APIContext, userId:number, examId: number, submit:Submission):Observable<any> {
        var log = new ExamLog();
        log.user_id = userId;
        log.exam_id =  examId;
        log.res_id = submit.id;
        log.res_model = Submission.Model;
        log.note = 'Finish exam';
        log.code = 'FINISH_EXAM';
        log.start = new Date();
        return log.save(context);
    }

    static startAnswer(context:APIContext, userId:number,examId: number,  answer:Answer):Observable<any> {
        var log = new ExamLog();
        log.user_id = userId;
        log.exam_id =  examId;
        log.res_id = answer.id;
        log.res_model = Answer.Model;
        log.note = 'Start answer';
        log.code = "START_ANSWER";
        log.start = new Date();
        return log.save(context);
    }

    static finishAnswer(context:APIContext, userId:number, examId: number, answer:Answer):Observable<any> {
        var log = new ExamLog();
        log.user_id = userId;
        log.exam_id =  examId;
        log.res_id = answer.id;
        log.res_model = Answer.Model;
        log.note = 'Close answer';
        log.code = "CLOSE_ANSWER";
        log.start = new Date();
        return log.save(context);
    }

}