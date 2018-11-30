import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { QuestionSheetSection } from './question_sheet-section.model';
import { ExecuteAPI } from '../../services/api/execute.api';

import { ListAPI } from '../../services/api/list.api';
import { ExamQuestion } from './exam-question.model';

@Model('etraining.question_sheet')
export class QuestionSheet extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.exam_id = undefined;
        this.exercise_id = undefined;
        this.seed = undefined;
        this.finalized = undefined;
        this.name = undefined;
        this.status =  undefined;
        this.question_count =  undefined;
        this.layout = undefined;
	}

    name: string;
    question_count: number;
    exam_id: number;
    exercise_id: number;
    seed:number;
    finalized:boolean;
    status: string;
    layout:string;
    
    static __api__replicate(sheetId: number, name:string): SearchReadAPI {
        return new ExecuteAPI(QuestionSheet.Model, 'replicate',{sheetId:sheetId,name:name}, null);
    }

    replicate(context:APIContext, name:string):Observable<any> {
        return context.apiService.execute(QuestionSheet.__api__replicate(this.id,name), 
            context.authService.LoginToken);
    }
    
    static __api__listTemplate(fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(QuestionSheet.Model, fields,"[('exam_id','=',False)]");
    }

    static listTemplate( context:APIContext,fields?:string[]): Observable<any> {
        return QuestionSheet.search(context,fields,"[('exam_id','=',False)]");
    }

    static __api__listQuestions(sheetId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamQuestion.Model,fields, "[('sheet_id','=',"+sheetId+")]");
    }

    listQuestions( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ExamQuestion.search(context,fields,"[('sheet_id','=',"+this.id+")]");
    }

    static __api__listSections(sheetId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(QuestionSheetSection.Model,fields, "[('sheet_id','=',"+sheetId+")]");
    }

    listSections( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return QuestionSheetSection.search(context,fields,"[('sheet_id','=',"+this.id+")]");
    }
}
