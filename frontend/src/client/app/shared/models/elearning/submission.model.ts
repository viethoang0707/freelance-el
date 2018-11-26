
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty, ReadOnlyProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { ListAPI } from '../../services/api/list.api';
import { Answer } from './answer.model';

@Model('etraining.submission')
export class Submission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.picture = undefined;
        this.user_id = undefined;
        this.member_id = undefined;
        this.exam_id = undefined;
        this.end = undefined;
        this.start = undefined;
        this.score = undefined;
        this.score =  undefined;
        this.grade =  undefined;
        this.study_time = undefined;
        this.course_member_id = undefined;
        this.filename = undefined;
        this.file_url =  undefined;
        this.submit_user_id = undefined;
        this.submission_file_id = undefined;
        this.exam_mode = undefined;
    }
    
    course_member_id: number;
    exam_id: number;
    user_id: number;
    member_id: number;
    study_time: number;
    picture: string;
    score: number;
    grade: string;
    @FieldProperty<Date>()
    end: Date;
    @FieldProperty<Date>()
    start: Date;
    filename: string;
    submission_file_id: string;
    file_url: string;
    exam_mode:string;
    submit_user_id: number;


    static __api__listAnswers(submissionId: number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(Answer.Model,fields, "[('submission_id','=',"+submissionId+")]");
    }

    listAnswers( context:APIContext,fields?:string[]): Observable<any[]> {
        return Answer.search(context,fields, "[('submission_id','=',"+this.id+")]");
    }

}
