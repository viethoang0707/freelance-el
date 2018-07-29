import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { CompetencyLevel } from './competency-level.model';
import { Course } from './course.model';

@Model('etraining.competency')
export class Competency extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.group_id = undefined;
		this.category = undefined;
        this.group_id__DESC__ = undefined;
        this.group_name =  undefined;
        this.achivement_ids = [];
        this.level_ids = [];
        this.level_summary = undefined;
        this.course_ids = [];
	}

    name:string;
    group_name:string;
    group_id: number;
    category: string;
    group_id__DESC__: string;
    level_ids: number[];
    achivement_ids: number[];
    level_summary: string;
    course_ids: number[];

    static __api__listLevels(level_ids: number[]): SearchReadAPI {
        return CompetencyLevel.__api__get(level_ids);
    }

    listLevels(context:APIContext):Observable<any> {
        if (this.id)
            return CompetencyLevel.array(context,this.level_ids)
            return Observable.of([]);
    }

    static __api__listCourses(course_ids: number[]): SearchReadAPI {
        return Course.__api__get(course_ids);
    }

    listCourses(context:APIContext):Observable<any> {
        if (this.id)
            return Course.array(context,this.course_ids).map(courses=> {
            });
        else
            return Observable.of([]);
    }

}
