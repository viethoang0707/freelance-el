import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.survey_sheet')
export class SurveySheet extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.survey_id = undefined;
        this.name = undefined;
        this.seed = undefined;
        this.finalized = undefined;
        this.status =  undefined;
	}
    survey_id: number;
    name: string;
    seed:number;
    finalized:boolean;
    status: string;
    
    clone() {
        var sheet = new SurveySheet();
        sheet.name =  this.name;
        sheet.seed =  this.seed;
        sheet.finalized =  this.finalized;
        return sheet;
    }


    static __api__listTemplate(): SearchReadAPI {
        return new SearchReadAPI(SurveySheet.Model, [],"[('survey_id','=',False)]");
    }

    static listTemplate( context:APIContext): Observable<any> {
        return SurveySheet.search(context,[],"[('survey_id','=',False)]");
    }
}
