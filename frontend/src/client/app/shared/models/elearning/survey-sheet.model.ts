import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { ListAPI } from '../../services/api/list.api';
import { SurveyQuestion } from './survey-question.model';

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
        this.question_count =  undefined;
	}

    question_count: number;
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


    static __api__listTemplate(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveySheet.Model, fields,"[('survey_id','=',False)]");
    }

    static listTemplate( context:APIContext,fields?:string[]): Observable<any> {
        return SurveySheet.search(context,fields,"[('survey_id','=',False)]");
    }

    static __api__listQuestions(sheetId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyQuestion.Model,fields, "[('sheet_id','=',"+sheetId+")]");
    }

    listQuestions( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return SurveyQuestion.search(context,fields,"[('sheet_id','=',"+this.id+")]");
    }
}
