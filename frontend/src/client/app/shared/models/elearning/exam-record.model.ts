import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';

import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.exam_record')
export class ExamRecord extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.score = undefined;
		this.grade = undefined;
		this.member_id = undefined;
        this.user_id =  undefined;
        this.submission_id =  undefined;
        this.class_id =  undefined;
        this.exam_id =  undefined;
        this.course_member_id = undefined;
	}

    score: number;
    grade: string;
    member_id: number;
    course_member_id: number;
    user_id: number;
    exam_id: number;
    class_id: number;
    submission_id: number;


}
