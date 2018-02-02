import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.exam_content')
export class ExamContent extends BaseModel{

    constructor(){
        super();
        
        this.duration = undefined;
        this.max_attempt = undefined;
        this.allow_navigation = undefined;
        this.question_selection = undefined;
        this.question_number = undefined;
        this.question_level = undefined;
        this.question_group_id = undefined;
        this.score = undefined;
        this.question_ids = undefined;
    }

    duration: number;
    max_attempt: number;
    allow_navigation: boolean;
    question_selection: string;
    question_number: number;
    question_level: number;
    question_group_id: number;
    score: number;
    question_ids: number[];
}
