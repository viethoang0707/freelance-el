import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.answer')
export class Answer extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.question_id = undefined;
        this.option_id = undefined;
        this.is_correct = undefined;
        this.submission_id = undefined;
        this.question_type = undefined;
        this.question_level = undefined;
        this.text = undefined;
        this.score = undefined;
        this.exam_id =  undefined;
        this.json = undefined;
        this.exam_question_id = undefined;
        this.section_id =  undefined;
        this.section_name = undefined;
	}
    exam_id: number;
    question_id: number;
    option_id: number;
    score: number;
    is_correct: boolean;
    submission_id: number;
    text:string;
    json:string;
    question_level: string;
    question_type: string;
    exam_question_id:number;
    section_id: number;
    section_name: string;
}
