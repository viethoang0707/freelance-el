import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.survey_answer')
export class SurveyAnswer extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
        this.question_id = undefined;
        this.option_id = undefined;
        this.submission_id = undefined;
        this.question_type = undefined;
        this.text = undefined;
        this.json = undefined;
        this.survey_id =  undefined;
        this.survey_question_id = undefined;
        this.section_id =  undefined;
        this.section_name = undefined;
	}
    survey_id: number;
    question_id: number;
    option_id: number;
    submission_id: number;
    text:string;
    json:string;
    question_type: string;
    survey_question_id:number;
    section_id: number;
    section_name: string;

}
