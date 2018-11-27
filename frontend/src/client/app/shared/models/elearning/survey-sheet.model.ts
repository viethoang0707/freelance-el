import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { ListAPI } from '../../services/api/list.api';
import { SurveyQuestion } from './survey-question.model';
import { SurveySheetSection } from './survey_sheet-section.model';
import { ExecuteAPI } from '../../services/api/execute.api';

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
        this.layout = undefined;
	}

    question_count: number;
    survey_id: number;
    name: string;
    seed:number;
    finalized:boolean;
    status: string;
    layout:string;
    
    static __api__replicate(sheetId: number): SearchReadAPI {
        return new ExecuteAPI(SurveySheet.Model, 'replicate',{sheetId:sheetId}, null);
    }

    replicate(context:APIContext):Observable<any> {
        return context.apiService.execute(SurveySheet.__api__replicate(this.id), 
            context.authService.LoginToken);
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

    static __api__listSections(sheetId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveySheetSection.Model,fields, "[('sheet_id','=',"+sheetId+")]");
    }

    listSections( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return SurveySheetSection.search(context,fields,"[('sheet_id','=',"+this.id+")]");
    }
}
