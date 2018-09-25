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
    user_count: number;
    question_count: number;
    course_count: number;
    competency_count: number;

    treeLabel(count?:boolean) {
        if (!this.user_count)
            this.user_count = 0;
        if (!this.course_count)
            this.course_count = 0;
        if (!this.question_count)
            this.question_count = 0;
        if (!this.competency_count)
            this.competency_count = 0;
        if (count && this.category =='organization')
            return `${this.name}(${this.user_count})`;
        if (count && this.category =='course')
            return `${this.name}(${this.course_count})`;
        if (count && this.category =='question')
            return `${this.name}(${this.question_count})`;
        if (count && this.category =='competency')
            return `${this.name}(${this.competency_count})`;
        return this.name;
    }

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

    static __api__listAchivements(groupId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Achivement.Model,fields,"[('group_id','=',"+groupId+")]");
    }

    listAchivements( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Achivement.search(context,fields,"[('group_id','=',"+this.id+")]");
    }

    static __api__listUsers(groupId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(User.Model,fields,"[('group_id','=',"+groupId+")]");
    }

    listUsers( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return User.search(context,fields,"[('group_id','=',"+this.id+")]");
    }

    static __api__listCourses(groupId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Course.Model,fields,"[('group_id','=',"+groupId+")]");
    }

    listCourses( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Course.search(context,fields,"[('group_id','=',"+this.id+")]");
    }

    static __api__listQuestions(groupId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Question.Model,fields,"[('group_id','=',"+groupId+")]");
    }

    listQuestions( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Question.search(context,fields,"[('group_id','=',"+this.id+")]");
    }

    static __api__listCompetencies(groupId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Competency.Model,fields,"[('group_id','=',"+groupId+")]");
    }

    listCompetencies( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return Competency.search(context,fields,"[('group_id','=',"+this.id+")]");
    }


    

}
