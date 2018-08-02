import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
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
        this.question_ids = [];
	}

    question_count: number;
    survey_id: number;
    name: string;
    seed:number;
    finalized:boolean;
    status: string;
    question_ids: number[];
    
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

    static __api__listQuestions(question_ids: number[],fields?:string[]): ListAPI {
        return new ListAPI(SurveyQuestion.Model, question_ids,fields);
    }

    listQuestions( context:APIContext,fields?:string[]): Observable<any[]> {
        return SurveyQuestion.array(context,this.question_ids,fields);
    }
}
