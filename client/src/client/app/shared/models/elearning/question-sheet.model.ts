import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';

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
	}

    name: string;
    exam_id: number;
    exercise_id: number;
    seed:number;
    finalized:boolean;

    static byExam( context:APIContext, examId: number): Observable<any> {
        return QuestionSheet.search(context,[],"[('exam_id','=',"+examId+")]").map(sheets =>{
            return sheets.length ? sheets[0]: null;
        });
    }

    static listTemplate( context:APIContext): Observable<any> {
        return QuestionSheet.search(context,[],"[('exam_id','=',False)]");
    }
}
