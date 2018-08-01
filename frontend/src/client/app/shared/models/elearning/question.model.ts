import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { QuestionOption } from './option.model';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { CreateAPI } from '../../services/api/create.api';
import { BulkListAPI } from '../../services/api/bulk-list.api';
import { MapUtils } from '../../helpers/map.utils';
import { ExecuteAPI } from '../../services/api/execute.api';
import { Group } from './group.model';
import { ListAPI } from '../../services/api/list.api';

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
        this.group_id__DESC__ = undefined;
        this.max_rating =  undefined;
        this.options = [];
        this.option_ids = [];
	}

    title:string;
    content: string;
    explanation: string;
    type: string;
    level: string;
    group_id: number;
    group_id__DESC__: string;
    max_rating: number;
    options: QuestionOption[];
    option_ids: number[];

    static listByGroups(context:APIContext, groups:Group[]):Observable<any> {
        var api = new BulkListAPI();
        _.each(groups, (group:Group)=> {
            var subApi = Group.__api__listQuestions(group.question_ids)
            api.add(subApi);
        });
        return context.apiService.execute(api, context.authService.LoginToken).map(questionArrs => {
            questionArrs = _.flatten(questionArrs);
            return _.map(questionArrs, question=> {
                return MapUtils.deserializeModel(Question.Model, question);
            });
        });
    }
    static listOptionsForArray(context:APIContext, questions: Question[]):Observable<any> {
        var apiList = _.map(questions,(question:Question)=> {
            return Question.__api__listOptions(question.option_ids);
        });
        return BaseModel.bulk_list(context, ...apiList)
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

    static __api__listOptions(option_ids: number[]): ListAPI {
        return new ListAPI(QuestionOption.Model, option_ids,[]);
    }

    listOptions( context:APIContext): Observable<any[]> {
        return QuestionOption.array(context,this.option_ids);
    }

}
