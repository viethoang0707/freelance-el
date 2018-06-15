import { SearchReadAPI } from '../../services/api/search-read.api';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
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
        this.group_id__DESC__ = undefined;
	}

    question_id: number;
    question: Question;
    survey_id: number;
    sheet_id: number;
    order: number;
    title: string;
    content: string;
    type: string;
    group_id: number;
    group_id__DESC__: string;

    clone() {
        var question = new SurveyQuestion();
        question.question_id = this.question_id;
        question.order = this.order;
        question.title = this.title;
        question.content = this.content;
        question.type = this.type;
        question.group_id = this.group_id;
        question.group_id__DESC__ = this.group_id__DESC__;
        return question;
    }


    static __api__listBySheet(sheetId: number): SearchReadAPI {
        return new SearchReadAPI(SurveyQuestion.Model, [], "[('sheet_id','='," + sheetId + ")]");
    }

    static __api__countBySheet(sheetId: number): SearchCountAPI {
        return new SearchCountAPI(SurveyQuestion.Model, "[('sheet_id','='," + sheetId + ")]");
    }

    static __api__countBySurvey(surveyId: number): SearchCountAPI {
        return new SearchCountAPI(SurveyQuestion.Model, "[('survey_id','='," + surveyId + ")]");
    }

    static countBySurvey(context: APIContext, surveyId: number): Observable<any> {
        return SurveyQuestion.count(context, "[('survey_id','='," + surveyId + ")]");
    }


    static __api__byQuestion(questionId: number): SearchReadAPI {
        return new SearchReadAPI(SurveyQuestion.Model, [], "[('question_id','='," + questionId + ")]");
    }


    static listBySheet(context: APIContext, sheetId: number): Observable<any[]> {
        return SurveyQuestion.search(context, [], "[('sheet_id','='," + sheetId + ")]");
    }


    static countBySheet(context: APIContext, sheetId: number): Observable<any> {
        return SurveyQuestion.count(context, "[('sheet_id','='," + sheetId + ")]");
    }

    static byQuestion(context: APIContext, questionId: number): Observable<any[]> {
        return SurveyQuestion.search(context, [], "[('question_id','='," + questionId + ")]").map(questions => {
            return questions.length ? questions[0] : null;
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

    static populateQuestionForArray(context: APIContext, surveyQuestions: SurveyQuestion[]): Observable<any> {
        var questionIds = _.pluck(surveyQuestions, 'question_id');
        questionIds = _.filter(questionIds, id => {
            return id;
        });
        return Question.array(context, questionIds).do(questions => {
            _.each(surveyQuestions, (surveyQuestion: SurveyQuestion) => {
                surveyQuestion.question = _.find(questions, (question: Question) => {
                    return surveyQuestion.question_id == question.id;
                });
            });
        });
    }

}
