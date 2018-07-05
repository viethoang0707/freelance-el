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
        this.group_id__DESC__ = undefined;
    }

    question_id: number;
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
    group_id__DESC__: string;
    sheet_id: number;

    static __api__listByExercise(exerciseId: number): SearchReadAPI {
        return new SearchReadAPI(ExerciseQuestion.Model, [],"[('unit_id','=',"+exerciseId+")]");
    }

    static listByExercise( context:APIContext, exerciseId: number): Observable<any[]> {
        return ExerciseQuestion.search(context,[],"[('unit_id','=',"+exerciseId+")]");
    }

    static __api__countByExercise(exerciseId: number): SearchCountAPI {
        return new SearchCountAPI(ExerciseQuestion.Model,"[('unit_id','=',"+exerciseId+")]");
    }

    static countByExercise( context:APIContext, exerciseId: number): Observable<any[]> {
        return ExerciseQuestion.count(context,"[('exercise_id','=',"+exerciseId+")]");
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

    static populateQuestions(context: APIContext, exerciseQuestions: ExerciseQuestion[]): Observable<any> {
        var questionIds = _.pluck(exerciseQuestions,'question_id');
        questionIds = _.filter(questionIds, id=> {
            return id;
        });
        return Question.array(context, questionIds).do(questions=> {
            _.each(exerciseQuestions, (exerciseQuestion:ExerciseQuestion)=> {
                exerciseQuestion.question =  _.find(questions, (question:ExerciseQuestion)=> {
                    return exerciseQuestion.question_id == question.id;
                });
            });
        });
    }

}
