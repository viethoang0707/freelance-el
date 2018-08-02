import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model, FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';


@Model('etraining.project_submission')
export class ProjectSubmission extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		this.filename = undefined;
        this.file_url =  undefined;
        this.user_id = undefined;
        this.member_id = undefined;
        this.class_id = undefined;
        this.course_id = undefined;
        this.project_id =  undefined;
        this.end = undefined;
        this.start = undefined;
        this.score = undefined;
        this.date_submit =  undefined;
	}
   

    filename: string;
    file_url: string;
    class_id: number;
    course_id: number;
    user_id: number;
    member_id: number;
    project_id: number;
    @FieldProperty<Date>()
    date_submit: Date;
    @FieldProperty<Date>()
    end: Date;
    @FieldProperty<Date>()
    start: Date;
    score: number;
}
