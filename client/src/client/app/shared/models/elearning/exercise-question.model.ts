import { Cache } from '../../helpers/cache.utils';
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { SearchCountAPI } from '../../services/api/search-count.api';

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
        this.unit_id = undefined;
        this.score = undefined;
        this.order = undefined;
        this.sheet_id = undefined;
        this.group_id__DESC__ = undefined;
    }

    question_id: number;
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
        return new SearchReadAPI(ExerciseQuestion.Model, [],"[('unit_id','=','"+exerciseId+"')]");
    }

    static listByExercise( context:APIContext, exerciseId: number): Observable<any[]> {
        return ExerciseQuestion.search(context,[],"[('unit_id','=',"+exerciseId+")]");
    }

    static __api__countByExercise(exerciseId: number): SearchCountAPI {
        return new SearchCountAPI(ExerciseQuestion.Model,"[('unit_id','=','"+exerciseId+"')]");
    }

    static countByExercise( context:APIContext, exerciseId: number): Observable<any[]> {
        return ExerciseQuestion.count(context,"[('exercise_id','=',"+exerciseId+")]");
    }

    static byQuestion( context:APIContext, questionId: number): Observable<any[]> {
        return ExerciseQuestion.search(context,[],"[('question_id','=',"+questionId+")]").map(questions =>{
            return questions.length ? questions[0]: null;
        });
    }

    static __api__byQuestion(questionId: number): SearchReadAPI {
        return new SearchReadAPI(ExerciseQuestion.Model, [],"[('question_id','=','"+questionId+"')]");
    }

    static byQuestion( context:APIContext, questionId: number): Observable<any[]> {
        return ExerciseQuestion.search(context,[],"[('question_id','=',"+questionId+")]").map(questions =>{
            return questions.length ? questions[0]: null;
        });
    }

}
