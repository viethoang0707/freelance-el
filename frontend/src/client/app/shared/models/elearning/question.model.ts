import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model ,UnserializeProperty, ReadOnlyProperty} from '../decorator';
import { QuestionOption } from './option.model';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { CreateAPI } from '../../services/api/create.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import { MapUtils } from '../../helpers/map.utils';
import { ExecuteAPI } from '../../services/api/execute.api';
import { Group } from './group.model';
import { ListAPI } from '../../services/api/list.api';
import { BulkSearchReadAPI } from '../../services/api/bulk-search-read.api';

@Model('etraining.question')
export class Question extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.title = undefined;
		this.content = undefined;
		this.explanation = undefined;
		this.type = undefined;
        this.level = undefined;
        this.group_id = undefined;
        this.max_rating =  undefined;
        this.options = [];
        this.group_name = undefined;
	}

    title:string;
    content: string;
    explanation: string;
    type: string;
    level: string;
    group_id: number;
    max_rating: number;
    @UnserializeProperty()
    options: QuestionOption[];
    group_name: string;

    static listByGroups(context:APIContext, groups:Group[],fields?:string[]):Observable<any> {
        var api = new BulkSearchReadAPI();
        _.each(groups, (group:Group)=> {
            var subApi = Group.__api__listQuestions(group.id,fields)
            api.add(subApi);
        });
        return context.apiService.execute(api, context.authService.LoginToken).map(questionArrs => {
            questionArrs = _.flatten(questionArrs);
            return _.map(questionArrs, question=> {
                return MapUtils.deserializeModel(Question.Model, question);
            });
        });
    }
    static listOptionsForArray(context:APIContext, questions: Question[],fields?:string[]):Observable<any> {
        var apiList = _.map(questions,(question:Question)=> {
            return Question.__api__listOptions(question.id,fields);
        });
        return BaseModel.bulk_search(context, ...apiList)
        .map(jsonArr => {
            return _.flatten(jsonArr);
        })
        .do(jsonArr=> {
            var options = QuestionOption.toArray(jsonArr);
            _.each(questions, (question:Question)=> {
                question.options =  _.filter(options, (option:QuestionOption)=> {
                    return option.question_id == question.id;
                });
            });
        })
    }

    static __api__import_question(questions: any, options: any): ExecuteAPI {
        return new ExecuteAPI(Question.Model, 'import_question',{questions:questions,options:options}, null);
    }

    static importQuestion(context:APIContext, questions: any, options: any):Observable<any> {
        return context.apiService.execute(Question.__api__import_question(questions, options), 
            context.authService.LoginToken);

    }

    static __api__listOptions(questionId:number,fields?:string[]): SearchReadAPI {
        return new SearchReadAPI(QuestionOption.Model,fields, "[('question_id','=',"+questionId+")]");
    }

    listOptions( context:APIContext,fields?:string[]): Observable<any[]> {
        return QuestionOption.search(context,fields,"[('question_id','=',"+this.id+")]");
    }

}
