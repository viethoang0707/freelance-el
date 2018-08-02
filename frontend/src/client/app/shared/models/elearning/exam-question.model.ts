
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,UnserializeProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { SearchCountAPI } from '../../services/api/search-count.api';
import { Question } from './question.model';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import * as _ from 'underscore';

@Model('etraining.exam_question')
export class ExamQuestion extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.title = undefined;
		this.content = undefined;
		this.explanation = undefined;
		this.type = undefined;
        this.level = undefined;
        this.group_id = undefined;
        this.question_id = undefined;
        this.exam_id = undefined;
        this.sheet_id = undefined;
        this.score = undefined;
        this.order = undefined;
        this.question =  new Question();
        this.option_ids = [];
        this.group_name = undefined;
	}

    group_name: string;
    question_id: number;
    question: Question;
    exam_id: number;
    sheet_id: number;
    score: number;
    order: number;
    level: string;
    title:string;
    content: string;
    explanation: string;
    type: string;
    group_id: number;
    option_ids: number[];
    
    clone():ExamQuestion {
        var q = new ExamQuestion();
        q.question_id = this.question_id;
        q.exam_id = this.exam_id;
        q.sheet_id = this.sheet_id;
        q.score = this.score;
        q.order = this.order;
        q.level = this.level;
        q.title = this.title;
        q.content = this.content;
        q.explanation = this.explanation;
        q.type = this.type;
        q.group_id = this.group_id;
        q.group_name = this.group_name;
        return q;
    }

    __api__populateQuestion(fields?:string[]): ListAPI {
        return new ListAPI(Question.Model, [this.question_id], fields);
    }

    populateQuestion(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.question_id)
            return Observable.of(null);
        if (!this.question.IsNew)
            return Observable.of(this);
        return Question.get(context, this.question_id,fields).do(question => {
            this.question = question;
        });
    }

    static populateQuestions(context: APIContext, examQuestions: ExamQuestion[],fields?:string[]): Observable<any> {
        examQuestions = _.filter(examQuestions, (q:ExamQuestion)=> {
            return q.question.IsNew;
        });
        var questionIds = _.pluck(examQuestions,'question_id');
        questionIds = _.filter(questionIds, id=> {
            return id;
        });
        return Question.array(context, questionIds,fields).do(questions=> {
            _.each(examQuestions, (examQuestion:ExamQuestion)=> {
                examQuestion.question =  _.find(questions, (question:Question)=> {
                    return examQuestion.question_id == question.id;
                });
            });
        });
    }

}
