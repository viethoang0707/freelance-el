import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
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
        this.group_id__DESC__ = undefined;
	}

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
    group_id__DESC__: string;

    static __api__listBySheet(sheetId: number): SearchReadAPI {
        return new SearchReadAPI(ExamQuestion.Model, [],"[('sheet_id','=',"+sheetId+")]");
    }
    
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
        q.group_id__DESC__ = this.group_id__DESC__;
        return q;
    }


    static listBySheet( context:APIContext, sheetId: number): Observable<any[]> {
        return ExamQuestion.search(context,[],"[('sheet_id','=',"+sheetId+")]");
    }

    static __api__countBySheet(sheetId: number): SearchCountAPI {
        return new SearchCountAPI(ExamQuestion.Model, "[('sheet_id','=',"+sheetId+")]");
    }

    static countBySheet( context:APIContext, sheetId: number): Observable<any> {
        return ExamQuestion.count(context,"[('sheet_id','=',"+sheetId+")]");
    }

    static __api__countByExam(examId: number): SearchCountAPI {
        return new SearchCountAPI(ExamQuestion.Model, "[('exam_id','=',"+examId+")]");
    }

    static countByExam( context:APIContext, examId: number): Observable<any> {
        return ExamQuestion.count(context,"[('exam_id','=',"+examId+")]");
    }

    static __api__byQuestion(questionId: number): SearchReadAPI {
        return new SearchReadAPI(ExamQuestion.Model, [],"[('question_id','=',"+questionId+")]");
    }

    static byQuestion( context:APIContext, questionId: number): Observable<any[]> {
        return ExamQuestion.search(context,[],"[('question_id','=',"+questionId+")]").map(questions =>{
            return questions.length ? questions[0]: null;
        });
    }

    __api__populateQuestion(): ListAPI {
        return new ListAPI(Question.Model, [this.question_id], []);
    }

    populateQuestion(context: APIContext): Observable<any> {
        if (!this.question_id)
            return Observable.of(null);
        return Question.get(context, this.question_id).do(question => {
            this.question = question;
        });
    }

    static populateQuestions(context: APIContext, examQuestions: ExamQuestion[]): Observable<any> {
        var questionIds = _.pluck(examQuestions,'question_id');
        questionIds = _.filter(questionIds, id=> {
            return id;
        });
        return Question.array(context, questionIds).do(questions=> {
            _.each(examQuestions, (examQuestion:ExamQuestion)=> {
                examQuestion.question =  _.find(questions, (question:Question)=> {
                    return examQuestion.question_id == question.id;
                });
            });
        });
    }

}
