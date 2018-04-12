
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';

@Model('etraining.question_selector')
export class QuestionSelector extends BaseModel{

    constructor(){
        super();
        this.number = undefined;
        this.level = undefined;
        this.group_id = undefined;
        this.mode = undefined;
        this.include_sub_group = undefined;
        this.sheet_id = undefined;
        this.score = undefined;
    }

    mode: string;
    number: number;
    level: string;
    group_id: number;
    score: number;
    include_sub_group: boolean;
    sheet_id: number;

    static listBySheet( context:APIContext, sheetId: number): Observable<any[]> {
        return QuestionSelector.search(context,[],"[('sheet_id','=',"+sheetId+")]");
    }
}
