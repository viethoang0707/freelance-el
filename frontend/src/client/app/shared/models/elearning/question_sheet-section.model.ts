import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { ExamQuestion } from './exam-question.model';

import { SearchReadAPI } from '../../services/api/search-read.api';
import * as _ from 'underscore';


@Model('etraining.question_sheet_section')
export class QuestionSheetSection extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

        this.name = undefined;
        this.order = undefined;
        this.sheet_id =  undefined;
        this.exam_id =  undefined;
    }

    name: string;
    order: number;
    sheet_id: number;
    exam_id: number;
    
    static __api__listQuestions(sectionId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(ExamQuestion.Model,fields, "[('section_id','=',"+sectionId+")]");
    }

    listQuestions( context:APIContext,fields?:string[]): Observable<any[]> {
        if (!this.id)
            return Observable.of([]);
        return ExamQuestion.search(context,fields,"[('section_id','=',"+this.id+")]");
    }

}
