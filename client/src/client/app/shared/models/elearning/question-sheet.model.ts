import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';

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
	}

    name: string;
    question_count: number;
    exam_id: number;
    exercise_id: number;
    seed:number;
    finalized:boolean;
    status: string;

    static __api__byExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(QuestionSheet.Model, [],"[('exam_id','=',"+examId+")]");
    }
    
    clone():QuestionSheet {
        var sheet = new QuestionSheet();
        sheet.name = this.name;
        sheet.exam_id = this.exam_id;
        sheet.exercise_id = this.exercise_id;
        sheet.finalized = this.finalized;
        sheet.seed = this.seed;
        return sheet;
    }
    
    static __api__listTemplate(): SearchReadAPI {
        return new SearchReadAPI(QuestionSheet.Model, [],"[('exam_id','=',False)]");
    }

    static listTemplate( context:APIContext): Observable<any> {
        return QuestionSheet.search(context,[],"[('exam_id','=',False)]");
    }
}
