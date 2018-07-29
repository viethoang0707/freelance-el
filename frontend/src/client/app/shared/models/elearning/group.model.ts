import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { CourseUnit } from './course-unit.model';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
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
	}

    name:string;
    category: string;
    code: string;
    order: string;
    parent_id: number;
    achivement_ids: number[];
    user_ids: number[];
    competency_ids: number[];
    course_ids: number[];
    question_ids: number[];

    static __api__listUserGroup(): SearchReadAPI {
        return new SearchReadAPI(Group.Model, [],"[('category','=','organization')]");
    }

    static listUserGroup(context:APIContext):Observable<any> {
        if (Cache.hit(Group.Model))
            return Observable.of(Cache.load(Group.Model)).map(groups=> {
                return _.filter(groups, (group:Group)=> {
                    return group.category == 'organization';
                });
            });
        return Group.search(context,[],"[('category','=','organization')]");
    }

    static __api__listQuestionGroup(): SearchReadAPI {
        return new SearchReadAPI(Group.Model, [],"[('category','=','question')]");
    }

    static listQuestionGroup(context:APIContext):Observable<any> {
        if (Cache.hit(Group.Model))
            return Observable.of(Cache.load(Group.Model)).map(groups=> {
                return _.filter(groups, (group:Group)=> {
                    return group.category == 'question';
                });
            });
        return Group.search(context,[],"[('category','=','question')]");
    }

    static __api__listCourseGroup(): SearchReadAPI {
        return new SearchReadAPI(Group.Model, [],"[('category','=','course')]");
    }

    static listCourseGroup(context:APIContext):Observable<any> {
        if (Cache.hit(Group.Model))
            return Observable.of(Cache.load(Group.Model)).map(groups=> {
                return _.filter(groups, (group:Group)=> {
                    return group.category == 'course';
                });
            });
        return Group.search(context,[],"[('category','=','course')]");
    }

    static __api__listCompetencyGroup(): SearchReadAPI {
        return new SearchReadAPI(Group.Model, [],"[('category','=','competency')]");
    }

    static listCompetencyGroup(context:APIContext):Observable<any> {
        if (Cache.hit(Group.Model))
            return Observable.of(Cache.load(Group.Model)).map(groups=> {
                return _.filter(groups, (group:Group)=> {
                    return group.category == 'competency';
                });
            });
        return Group.search(context,[],"[('category','=','competency')]");
    }

    static __api__listAchivements(achivement_ids:number[]): ListAPI {
        return new ListAPI(Achivement.Model, achivement_ids,[]);
    }

    listAchivements( context:APIContext): Observable<any[]> {
        return Achivement.array(context,this.achivement_ids);
    }

    static __api__listUsers(user_ids: number[]): ListAPI {
        return new ListAPI(User.Model, user_ids,[]);
    }

    listUsers( context:APIContext): Observable<any[]> {
        return User.array(context,this.user_ids);
    }

    static __api__listCourses(course_ids: number[]): ListAPI {
        return new ListAPI(Course.Model, course_ids,[]);
    }

    listCourses( context:APIContext): Observable<any[]> {
        return Course.array(context,this.course_ids);
    }

    static __api__listQuestions(question_ids: number[]): ListAPI {
        return new ListAPI(Question.Model, question_ids,[]);
    }

    listQuestions( context:APIContext): Observable<any[]> {
        return Question.array(context,this.question_ids);
    }

    static __api__listCompetencies(competency_ids: number[]): ListAPI {
        return new ListAPI(Competency.Model, competency_ids,[]);
    }

    listCompetencies( context:APIContext): Observable<any[]> {
        return Competency.array(context,this.competency_ids);
    }


    

}
