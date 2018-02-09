import { GROUP_CATEGORY} from './constants';
import { BaseModel } from './base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from './decorator';
import { APIContext } from './context';

@Model('etraining.question_selector')
export class QuestionSelector extends BaseModel{

    constructor(){
        super();
        this.number = undefined;
        this.level = undefined;
        this.group_id = undefined;
        this.mode = undefined;
        this.include_sub_group = undefined;
    }

    mode: string;
    number: number;
    level: number;
    group_id: number;
    include_sub_group: boolean;
}
