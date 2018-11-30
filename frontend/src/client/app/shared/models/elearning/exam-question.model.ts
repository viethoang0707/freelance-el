
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,ReadOnlyProperty } from '../decorator';
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
        this.section_id = undefined;
        this.section_name = undefined;
        this.sheet_layout = undefined;
        this.section_order = undefined;
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
    @ReadOnlyProperty()
    option_ids: number[];
    section_name: string;
    section_id: number;
    sheet_layout: string;
    section_order: number;
    
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
