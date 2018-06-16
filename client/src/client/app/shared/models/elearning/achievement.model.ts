import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as moment from 'moment';
import {SERVER_DATETIME_FORMAT} from '../constants';
import { Token } from '../cloud/cloud-account.model';
import { MapUtils } from '../../helpers/map.utils';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';

@Model('etraining.achivement')
export class Achivement extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.course_id = undefined;
		this.user_group_id = undefined;
		this.exam_id = undefined;
		this.user_id = undefined;
		this.date_acquire = undefined;
		this.competency_id = undefined;
		this.competency_name = undefined;
		this.competency_group_id =  undefined;
		this.competency_group_name =  undefined;
		this.competency_level_id =  undefined;
		this.competency_level_name =  undefined;
	}

    course_id:number;
    exam_id: number;
	user_id: number;
	user_group_id: number;
	@FieldProperty<Date>()
	date_acquire: Date;
	competency_id: number;
	competency_name: string;
	competency_group_id: number;
	competency_group_name: string;
	competency_level_id: number;
	competency_level_name: string;

	static __api__listByUser(userId: number): SearchReadAPI {
        return new SearchReadAPI(Achivement.Model, [],"[('user_id','=',"+userId+")]");
    }

    static listByUser( context:APIContext, userId: number): Observable<any[]> {
        return Achivement.search(context,[],"[('user_id','=',"+userId+")]");
    }

    static __api__listByCompetency(competencyId: number): SearchReadAPI {
        return new SearchReadAPI(Achivement.Model, [],"[('competency_id','=',"+competencyId+")]");
    }

    static listByCompetency( context:APIContext, competencyId: number): Observable<any[]> {
        return Achivement.search(context,[],"[('competency_id','=',"+competencyId+")]");
    }

    static __api__listByGroup(groupId: number): SearchReadAPI {
        return new SearchReadAPI(Achivement.Model, [],"[('user_group_id','=',"+groupId+")]");
    }

    static listByGroup( context:APIContext, groupId: number): Observable<any[]> {
        return Achivement.search(context,[],"[('user_group_id','=',"+groupId+")]");
    }

    static __api__searchByDate(start:Date, end:Date): SearchReadAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Achivement.Model, [],"[('date_acquire','>=','"+startDateStr+"'),('date_acquire','<=','"+endDateStr+"')]");
    }

    static searchByDate(context:APIContext, start:Date, end:Date):Observable<any> {
        if (Cache.hit(Achivement.Model))
            return Observable.of(Cache.load(Achivement.Model)).map(skills=> {
                return _.filter(skills, (skill:Achivement)=> {
                    return skill.date_acquire.getTime() >=  start.getTime() && skill.date_acquire.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return Achivement.search(context,[],"[('date_acquire','>=','"+startDateStr+"'),('date_acquire','<=','"+endDateStr+"')]");
    }

    static __api__searchByDateAndCompetency(competencyId: number, start:Date, end:Date): SearchReadAPI {
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Achivement.Model, [],"[('date_acquire','>=','"+startDateStr+"'),('date_acquire','<=','"+endDateStr+"'),('competency_id','<=',"+competencyId+")]");
    }

    static searchByDateAndCompetency(context:APIContext, competencyId:number, start:Date, end:Date):Observable<any> {
        if (Cache.hit(Achivement.Model))
            return Observable.of(Cache.load(Achivement.Model)).map(skills=> {
                return _.filter(skills, (skill:Achivement)=> {
                    return skill.date_acquire.getTime() >=  start.getTime() && skill.date_acquire.getTime() <= end.getTime() && skill.competency_id == competencyId;
                });
            });
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return Achivement.search(context,[],"[('date_acquire','>=','"+startDateStr+"'),('date_acquire','<=','"+endDateStr+"'),('competency_id','<=',"+competencyId+")]");
    }


}