
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,ReadOnlyProperty, UnserializeProperty } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { SearchCountAPI } from '../../services/api/search-count.api';
import { Question } from './question.model';
import { ListAPI } from '../../services/api/list.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import * as _ from 'underscore';

@Model('etraining.exercise_question')
export class ExerciseQuestion extends BaseModel{

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
        this.question =  new Question();
        this.unit_id = undefined;
        this.score = undefined;
        this.order = undefined;
        this.sheet_id = undefined;
        this.group_name =  undefined;
    }

    group_name: string;
    question_id: number;
    @UnserializeProperty()
    question: Question;
    unit_id: number;
    score: number;
    order: number;
    level: string;
    title:string;
    content: string;
    explanation: string;
    type: string;
    group_id: number;
    sheet_id: number;

    populateQuestion(context: APIContext,fields?:string[]): Observable<any> {
        if (!this.question_id)
            return Observable.of(null);
        if (!this.question.IsNew)
            return Observable.of(this);
        return Question.get(context, this.question_id,fields).do(question => {
            this.question = question;
        });
    }

    static populateQuestions(context: APIContext, exerciseQuestions: ExerciseQuestion[],fields?:string[]): Observable<any> {
        exerciseQuestions = _.filter(exerciseQuestions, (q:ExerciseQuestion)=> {
            return q.question.IsNew;
        });
        var questionIds = _.pluck(exerciseQuestions,'question_id');
        questionIds = _.filter(questionIds, id=> {
            return id;
        });
        return Question.array(context, questionIds,fields).do(questions=> {
            _.each(exerciseQuestions, (exerciseQuestion:ExerciseQuestion)=> {
                exerciseQuestion.question =  _.find(questions, (question:ExerciseQuestion)=> {
                    return exerciseQuestion.question_id == question.id;
                });
            });
        });
    }

}
