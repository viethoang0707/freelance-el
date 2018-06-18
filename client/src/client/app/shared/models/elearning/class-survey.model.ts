import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ExamQuestion } from './exam-question.model';
import { Exam } from './exam.model';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.class_survey')
export class ClassSurvey extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
        this.status = undefined;
		this.course_id = undefined;
        this.class_id = undefined;
        this.survey_id = undefined;
        this.start = undefined;
        this.end = undefined;
        this.summary = undefined;
        this.instruction = undefined;
	}

    get IsValid() {
        return !isNaN(parseFloat(this.class_id+''))  && !isNaN(parseFloat(this.survey_id+''));
    }

    name:string;
    status:string;
    summary:string;
    instruction: string;
    class_id:number;
    course_id: number;
    survey_id: number;


    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;

    static listByClass(context:APIContext, classId):Observable<any> {
        return ClassSurvey.search(context,[], "[('class_id','=',"+classId+")]");
    }

    static __api__listByClass(classId: number): SearchReadAPI {
        return new SearchReadAPI(ClassSurvey.Model, [],"[('class_id','=',"+classId+")]");
    }

}
