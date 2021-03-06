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
        this.group_name = undefined;
        this.section_id = undefined;
        this.section_name = undefined;
        this.sheet_layout = undefined;
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
    section_name: string;
    section_id: number;
    sheet_layout: string;

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
