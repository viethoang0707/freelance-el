import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { CourseUnit } from './course-unit.model';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';

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
	}

    name:string;
    category: string;
    code: string;
    order: string;
    parent_id: number;

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
                    return group.category == 'organization';
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

}
