import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.exercise_question')
export class ExerciseQuestion extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.title = undefined;
		this.content = undefined;
		this.explanation = undefined;
		this.type = undefined;
        this.level = undefined;
        this.group_id = undefined;
        this.question_id = undefined;
        this.unit_id = undefined;
        this.score = undefined;
        this.order = undefined;
        this.group_id__DESC__ = undefined;
	}

    question_id: number;
    unit_id: number;
    score: number;
    order: number;
    title:string;
    content: string;
    explanation: string;
    type: string;
    level: number;
    group_id: number;
    group_id__DESC__: string;

    static listByExercise( context:APIContext, unitId: number): Observable<any[]> {
        return ExerciseQuestion.search(context,[],"[('unit_id','=',"+unitId+")]");
    }


}
