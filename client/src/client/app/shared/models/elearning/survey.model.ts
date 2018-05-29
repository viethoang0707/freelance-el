import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { SurveyQuestion } from './survey-question.model';
import * as _ from 'underscore';

@Model('etraining.survey')
export class Survey extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.summary = undefined;
		this.instruction = undefined;
        this.start = undefined;
        this.end = undefined;
        this.status = undefined;
        this.course_id = undefined;
        this.class_id = undefined;
	}

    name:string;
    course_id: number;
    class_id: number;
    summary: string;
    instruction: string;
    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;
    status: string;


    get IsAvailable():boolean {
        if (this.status !='published')
            return false;
        var now = new Date();
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }



}
