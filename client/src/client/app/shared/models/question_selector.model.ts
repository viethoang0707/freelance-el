import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.question_selector')
export class QuestionSelector extends BaseModel{

    constructor(){
        super();
        
        
        this.question_number = undefined;
        this.question_level = undefined;
        this.question_group_id = undefined;

    }

    
    question_number: number;
    question_level: number;
    question_group_id: number;
    
}
