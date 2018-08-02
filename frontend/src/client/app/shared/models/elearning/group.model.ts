import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, UnserializeProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { CourseUnit } from './course-unit.model';
import * as _ from 'underscore';

import { SearchReadAPI } from '../../services/api/search-read.api';
import { ListAPI } from '../../services/api/list.api';
import { Achivement } from './achievement.model';
import { User } from './user.model';
import { Question } from './question.model';
import { Course } from './course.model';
import { Competency } from './competency.model';

@Model('res.groups')
export class Group extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.category = undefined;
		this.order = undefined;
		this.code = undefined;
        this.parent_id = undefined;
        this.achivement_ids = [];
        this.user_ids = [];
        this.competency_ids = [];
        this.course_ids = [];
        this.question_ids = [];
        this.user_count = undefined;
        this.question_count = undefined;
        this.course_count = undefined;
        this.competency_count = undefined;
	}

    name:string;
    category: string;
    code: string;
    order: string;
    parent_id: number;
    @ReadOnlyProperty()
    achivement_ids: number[];
    @ReadOnlyProperty()
    user_ids: number[];
    @ReadOnlyProperty()
    competency_ids: number[];
    @ReadOnlyProperty()
    course_ids: number[];
    @ReadOnlyProperty()
    question_ids: number[];
    user_count: number;
    question_count: number;
    course_count: number;
    competency_count: number;

    static __api__listUserGroup(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Group.Model, fields,"[('category','=','organization')]");
    }

    static listUserGroup(context:APIContext,fields?:string[]):Observable<any> {
        return Group.search(context,fields,"[('category','=','organization')]");
    }

    static __api__listQuestionGroup(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Group.Model, fields,"[('category','=','question')]");
    }

    static listQuestionGroup(context:APIContext,fields?:string[]):Observable<any> {
        return Group.search(context,fields,"[('category','=','question')]");
    }

    static __api__listCourseGroup(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Group.Model, fields,"[('category','=','course')]");
    }

    static listCourseGroup(context:APIContext,fields?:string[]):Observable<any> {
        return Group.search(context,fields,"[('category','=','course')]");
    }

    static __api__listCompetencyGroup(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Group.Model, fields,"[('category','=','competency')]");
    }

    static listCompetencyGroup(context:APIContext,fields?:string[]):Observable<any> {
        return Group.search(context,fields,"[('category','=','competency')]");
    }

    static __api__listAchivements(achivement_ids:number[],fields?:string[]): ListAPI {
        return new ListAPI(Achivement.Model, achivement_ids,fields);
    }

    listAchivements( context:APIContext,fields?:string[]): Observable<any[]> {
        return Achivement.array(context,this.achivement_ids,fields);
    }

    static __api__listUsers(user_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(User.Model, user_ids,fields);
    }

    listUsers( context:APIContext,fields?:string[]): Observable<any[]> {
        return User.array(context,this.user_ids,fields);
    }

    static __api__listCourses(course_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Course.Model, course_ids,fields);
    }

    listCourses( context:APIContext,fields?:string[]): Observable<any[]> {
        return Course.array(context,this.course_ids,fields);
    }

    static __api__listQuestions(question_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Question.Model, question_ids,fields);
    }

    listQuestions( context:APIContext,fields?:string[]): Observable<any[]> {
        return Question.array(context,this.question_ids,fields);
    }

    static __api__listCompetencies(competency_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(Competency.Model, competency_ids,fields);
    }

    listCompetencies( context:APIContext,fields?:string[]): Observable<any[]> {
        return Competency.array(context,this.competency_ids,fields);
    }


    

}
