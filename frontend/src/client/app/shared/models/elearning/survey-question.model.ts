import { SearchReadAPI } from '../../services/api/search-read.api';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,UnserializeProperty ,ReadOnlyProperty} from '../decorator';
import { APIContext } from '../context';
import { SearchCountAPI } from '../../services/api/search-count.api';
import { ListAPI } from '../../services/api/list.api';
import { Question } from './question.model';
import * as _ from 'underscore';

@Model('etraining.survey_question')
export class SurveyQuestion extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

		this.title = undefined;
        this.question = new Question();
		this.content = undefined;
		this.type = undefined;
        this.group_id = undefined;
        this.question_id = undefined;
        this.survey_id = undefined;
        this.sheet_id = undefined;
        this.order = undefined;
        this.option_ids = [];
        this.group_name = undefined;
	}

    group_name: string;
    question_id: number;
    @UnserializeProperty()
    question: Question;
    survey_id: number;
    sheet_id: number;
    order: number;
    title: string;
    content: string;
    type: string;
    group_id: number;
    @ReadOnlyProperty()
    option_ids: number[];

    clone() {
        var question = new SurveyQuestion();
        question.question_id = this.question_id;
        question.order = this.order;
        question.title = this.title;
        question.content = this.content;
        question.type = this.type;
        question.group_id = this.group_id;
        question.group_name = this.group_name;
        return question;
    }

    static __api__populateQuestion(question_id: number, fields?:string[]): ListAPI {
        return new ListAPI(Question.Model, [question_id], fields);
    }

    populateQuestion(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.question_id)
            return Observable.of(null);
        return Question.get(context, this.question_id,fields).do(question => {
            this.question = question;
        });
    }

    static populateQuestions(context: APIContext, surveyQuestions: SurveyQuestion[],fields?:string[]): Observable<any> {
        surveyQuestions = _.filter(surveyQuestions, (q:SurveyQuestion)=> {
            return q.question.IsNew;
        });
        var questionIds = _.pluck(surveyQuestions, 'question_id');
        questionIds = _.filter(questionIds, id => {
            return id;
        });
        return Question.array(context, questionIds,fields).do(questions => {
            _.each(surveyQuestions, (surveyQuestion: SurveyQuestion) => {
                surveyQuestion.question = _.find(questions, (question: Question) => {
                    return surveyQuestion.question_id == question.id;
                });
            });
        });
    }

}
