import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.exam_grade')
export class ExamGrade extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.exam_id = undefined;
		this.min = undefined;
		this.max = undefined;
	}

    name:string;
    exam_id: number;
    min: number;
    max: number;

    static listByExam( context:APIContext, examId: number): Observable<any[]> {
        return ExamGrade.search([],"[('exam_id','=',"+examId+")]",context);
    }
}
