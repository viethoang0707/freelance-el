import { SearchReadAPI } from '../../services/api/search-read.api';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { ListAPI } from '../../services/api/list.api';
import { SurveyAnswer } from './survey-answer.model';

@Model('etraining.survey_submission')
export class SurveySubmission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
        this.user_id = undefined;
        this.member_id = undefined;
        this.end = undefined;
        this.start = undefined;
	    this.survey_id =  undefined;
    }
    
    survey_id: number;
    user_id: number;
    member_id: number;
    @FieldProperty<Date>()
    end: Date;
    @FieldProperty<Date>()
    start: Date;

    static __api__listAnswers(submissionId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(SurveyAnswer.Model,fields, "[('submission_id','=',"+submissionId+")]");
    }

    listAnswers( context:APIContext,fields?:string[]): Observable<any[]> {
        return SurveyAnswer.search(context,fields, "[('submission_id','=',"+this.id+")]");
    }


}
