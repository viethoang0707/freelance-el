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
	}


    name:string;
    summary: string;
    instruction: string;
    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;
    status: string;
    supervisor_id: number;
    supervisor_name: string;

    get IsAvailable():boolean {
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
        return Survey.search(context,[],"[('end','>=','"+nowStr+"'),('start','<=','"+nowStr+"'),('status','=','open')]",
    }

}
