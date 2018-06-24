import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
import * as moment from 'moment';
import { SERVER_DATETIME_FORMAT} from '../constants';

@Model('etraining.survey')
export class Survey extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.instruction = undefined;
        this.start = undefined;
        this.end = undefined;
        this.status = undefined;
        this.supervisor_id =  undefined;
        this.supervisor_name = undefined;
        this.is_public =  undefined;
        this.review_state = undefined;
	}

    review_state:string;
    name:string;
    summary: string;
    instruction: string;
    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;
    status: string;
    is_public: boolean;
    supervisor_id: number;
    supervisor_name: string;

    get IsAvailable():boolean {
        if (this.review_state != 'approved')
            return false;
        if (this.status !='open')
            return false;
        var now = new Date();
        if (this.start.getTime() > now.getTime())
            return false;
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }

    static __api__listAvailableSurvey(): SearchReadAPI {
        var now = new Date();
        var nowStr = moment(now).format(SERVER_DATETIME_FORMAT);
        return new SearchReadAPI(Survey.Model, [],"[('end','>=','"+nowStr+"'),('start','<=','"+nowStr+"'),('status','=','open')]");
    }

    static listAvailableSurvey(context:APIContext):Observable<any> {
        var now = new Date();
        var nowStr = moment(now).format(SERVER_DATETIME_FORMAT);
        return Survey.search(context,[],"[('end','>=','"+nowStr+"'),('start','<=','"+nowStr+"'),('status','=','open')]");
    }

    static __api__listPublicSurvey(): SearchReadAPI {
        return new SearchReadAPI(Survey.Model, [],"[('is_public','=',True)");
    }

    static listPublicSurvey(context:APIContext):Observable<any> {
        return Survey.search(context,[],"[('is_public','=',True)]");
    }

    static __api__allForEnroll(): SearchReadAPI {
        return new SearchReadAPI(Survey.Model, [],"[('review_state','=','approved'),('status','=','published')]");
    }

    static allForEnroll(context:APIContext):Observable<any> {
        if (Cache.hit(Survey.Model))
            return Observable.of(Cache.load(Survey.Model)).map(surveys=> {
                return _.filter(surveys, (survey:Survey)=> {
                    return survey.review_state == 'approved' && survey.status =='published';
                });
            });
        return Survey.search(context,[],"[('review_state','=','approved'),('status','=','published')]");
    }

}
