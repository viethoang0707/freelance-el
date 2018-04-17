import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ExamQuestion } from './exam-question.model';
import { Exam } from './exam.model';
import * as _ from 'underscore';

@Model('etraining.class_exam')
export class ClassExam extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
        this.status = undefined;
		this.course_id = undefined;
        this.class_id = undefined;
        this.exam_id = undefined;
        this.start = undefined;
        this.end = undefined;
        this.summary = undefined;
        this.instruction = undefined;
	}

    name:string;
    status:string;
    summary:string;
    instruction: string;
    class_id:number;
    course_id: number;
    exam_id: number;


    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;

    static listByClass(context:APIContext, classId):Observable<any> {
        return ClassExam.search(context,[], "[('class_id','=',"+classId+")]");
    }

    containsOpenEndQuestion(context:APIContext):Observable<any> {
        return ExamQuestion.listOpenQuestionByExam(context, this.exam_id).flatMap(questions => {
            return Observable.of(questions.length > 0);
        });        
    }

}
