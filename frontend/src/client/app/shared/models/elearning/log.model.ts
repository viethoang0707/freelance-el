import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ExamMember } from './exam-member.model';
import { Answer } from './answer.model';
import { User } from './user.model';
import { Submission } from './submission.model';
import { CourseUnit } from './course-unit.model';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

import { CourseMember } from './course-member.model';

@Model('etraining.course_log')
export class CourseLog extends BaseModel{

    constructor(){
        super();
        
        this.user_id = undefined;
        this.member_id = undefined;
        this.course_id = undefined;
        this.class_id = undefined;
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
    member_id: number;
    course_id: number;
    class_id: number;
    res_model: string;
    note: string;
    code: string;
    @FieldProperty<Date>()
    start: Date;
    attachment_url: string;
    attachment_id: number;

    static __api__userStudyActivity(userId, courseId):SearchReadAPI {
        var domain = "";
        if (courseId)
            domain = "[('user_id','=',"+userId+"),('course_id','=',"+courseId+")]";
        else
            domain = "[('user_id','=',"+userId+")]"
        return new SearchReadAPI(CourseLog.Model, [], domain );
    }

    static userStudyActivity(context:APIContext, userId, courseId):Observable<any> {
        var domain = "";
        if (courseId)
            domain = "[('user_id','=',"+userId+"),('course_id','=',"+courseId+")]";
        else
            domain = "[('user_id','=',"+userId+")]"
        return CourseLog.search(context,[], domain );
    }

    static __api__memberStudyActivity(memberId, courseId):SearchReadAPI {
        var domain = "";
        if (courseId)
            domain = "[('member_id','=',"+memberId+"),('course_id','=',"+courseId+")]";
        else
            domain = "[('member_id','=',"+memberId+")]"
        return new SearchReadAPI(CourseLog.Model, [], domain );
    }

    static memberStudyActivity(context:APIContext, memberId, courseId):Observable<any> {
        var domain = "";
        if (courseId)
            domain = "[('member_id','=',"+memberId+"),('course_id','=',"+courseId+")]";
        else
            domain = "[('member_id','=',"+memberId+")]"
        return CourseLog.search(context,[], domain );
    }

    static __api__courseActivity(courseId):SearchReadAPI {
        return new SearchReadAPI(CourseLog.Model, [], "[('course_id','=',"+courseId+")]" );
    }

    static courseActivity(context:APIContext, courseId):Observable<any> {
        return CourseLog.search(context,[], "[('course_id','=',"+courseId+")]" );
    }

    static __api__classActivity(classId):SearchReadAPI {
        return new SearchReadAPI(CourseLog.Model, [], "[('class_id','=',"+classId+")]" );
    }

    static classActivity(context:APIContext, classId):Observable<any> {
        return CourseLog.search(context,[], "[('class_id','=',"+classId+")]" );
    }

    static startCourseUnit(context:APIContext, member:CourseMember,  unit:CourseUnit):Observable<any> {
        var log = new CourseLog();
        log.member_id = member.id;
        log.res_id = unit.id;
        log.course_id = member.course_id;
        log.class_id = member.class_id;
        log.res_model = CourseUnit.Model;
        log.note = 'Start course unit';
        log.code = "START_COURSE_UNIT";
        log.start = new Date();
        return log.save(context);
    }

    static stopCourseUnit(context:APIContext, member:CourseMember,  unit:CourseUnit):Observable<any> {
        var log = new CourseLog();
        log.member_id = member.id;
        log.res_id = unit.id;
        log.course_id = member.course_id;
        log.class_id = member.class_id;
        log.res_model = CourseUnit.Model;
        log.note = 'finish course unit';
        log.code = "FINISH_COURSE_UNIT";
        log.start = new Date();
        return log.save(context);
    }

    static completeCourseUnit(context:APIContext,  member:CourseMember,  unit:CourseUnit):Observable<any> {
        var log = new CourseLog();
        log.member_id = member.id;
        log.res_id = unit.id;
        log.course_id = member.course_id;
        log.class_id = member.class_id;
        log.res_model = CourseUnit.Model;
        log.note = 'finish course unit';
        log.code = "COMPLETE_COURSE_UNIT";
        log.start = new Date();
        return log.save(context);
    }

    static __api__listByCourse(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseLog.Model, [],"[('course_id','=',"+courseId+")]");
    }

    static listByCourse( context:APIContext, courseId: number): Observable<any[]> {
        return CourseLog.search(context,[],"[('course_id','=',"+courseId+")]");
    }

    static __api__listCompleteUnitByCourse(courseId: number): SearchReadAPI {
        return new SearchReadAPI(CourseLog.Model, [],"[('course_id','=',"+courseId+"),('code','=','COMPLETE_COURSE_UNIT')]");
    }

    static listCompleteUnitByCourse( context:APIContext, courseId: number): Observable<any[]> {
        return CourseLog.search(context,[],"[('course_id','=',"+courseId+"),('code','=','COMPLETE_COURSE_UNIT')]");
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
        this.member_id = undefined;
        this.code = undefined;
        this.start = undefined;
        this.attachment_url = undefined;
        this.attachment_id = undefined;
    }

    res_id: number;
    user_id: number;
    exam_id: number;
    member_id: number;
    res_model: string;
    note: string;
    code: string;
    @FieldProperty<Date>()
    start: Date;
    attachment_url: string;
    attachment_id: number;


    static startExam(context:APIContext, member: ExamMember, submit: Submission):Observable<any> {
        var log = new ExamLog();
        log.member_id =  member.id;
        log.exam_id = member.exam_id;
        log.res_id = submit.id;
        log.res_model = Submission.Model;
        log.note = 'Start exam';
        log.code = 'START_EXAM';
        log.start = new Date();
        return log.save(context);
    }

    static finishExam(context:APIContext, member: ExamMember, submit: Submission):Observable<any> {
        var log = new ExamLog();
        log.member_id =  member.id;
        log.exam_id = member.exam_id;
        log.res_id = submit.id;
        log.res_model = Submission.Model;
        log.note = 'Finish exam';
        log.code = 'FINISH_EXAM';
        log.start = new Date();
        return log.save(context);
    }

    static startAnswer(context:APIContext, memberId: number,  answerId:number):Observable<any> {
        var log = new ExamLog();
        log.member_id =  memberId;
        log.res_id = answerId;
        log.res_model = Answer.Model;
        log.note = 'Start answer';
        log.code = "START_ANSWER";
        log.start = new Date();
        return log.save(context);
    }

    static finishAnswer(context:APIContext, memberId: number, answerId:number):Observable<any> {
        var log = new ExamLog();
        log.member_id =  memberId;
        log.res_id = answerId;
        log.res_model = Answer.Model;
        log.note = 'Close answer';
        log.code = "CLOSE_ANSWER";
        log.start = new Date();
        return log.save(context);
    }

    static __api__listByExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamLog.Model, [],"[('exam_id','=',"+examId+")]");
    }

    static listByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamLog.search(context,[],"[('exam_id','=',"+examId+")]");
    }

    static __api__memberStudyActivity(memberId, examId):SearchReadAPI {
        var domain = "";
        if (examId)
            domain = "[('member_id','=',"+memberId+"),('exam_id','=',"+examId+")]";
        else
            domain = "[('member_id','=',"+memberId+")]"
        return new SearchReadAPI(ExamLog.Model, [], domain );
    }

    static memberStudyActivity(context:APIContext, memberId, examId):Observable<any> {
        var domain = "";
        if (examId)
            domain = "[('member_id','=',"+memberId+"),('exam_id','=',"+examId+")]";
        else
            domain = "[('member_id','=',"+memberId+")]"
        return ExamLog.search(context,[], domain );
    }
}


@Model('etraining.user_log')
export class UserLog extends BaseModel{

    constructor(){
        super();
        this.res_id = undefined;
        this.res_model = undefined;
        this.user_id = undefined;
        this.note = undefined;
        this.code = undefined;
        this.start = undefined;
    }
    res_id: number;
    res_model: string;
    user_id: number;
    note: string;
    code: string;
    @FieldProperty<Date>()
    start: Date;


    static login(context:APIContext, userId:number):Observable<any> {
        var log = new UserLog();
        log.user_id = userId;
        log.res_id = userId;
        log.res_model =  User.Model;
        log.note = 'User login';
        log.code = 'LOGIN';
        log.start = new Date();
        return log.save(context);
    }

    static logout(context:APIContext, userId:number):Observable<any> {
        var log = new UserLog();
        log.user_id = userId;
        log.res_id = userId;
        log.res_model =  User.Model;
        log.note = 'User logout';
        log.code = 'LOGOUT';
        log.start = new Date();
        return log.save(context);
    }

}