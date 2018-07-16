import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { QuestionOption } from './option.model';
import { APIContext } from '../context';
import * as _ from 'underscore';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { CreateAPI } from '../../services/api/create.api';
import { BulkSearchReadAPI } from '../../services/api/bulk-search-read.api';
import { MapUtils } from '../../helpers/map.utils';
import { ExecuteAPI } from '../../services/api/execute.api';

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

    static __api__listByGroup(groupId: number): SearchReadAPI {
        return new SearchReadAPI(Question.Model, [],"[('group_id','=',"+groupId+")]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (Cache.hit(Question.Model))
            return Observable.of(Cache.load(Question.Model)).map(questions=> {
                return _.filter(questions, (q:Question)=> {
                    return q.group_id == groupId;
                });
            });
        return Question.search(context,[],"[('group_id','=',"+groupId+")]");
    }


    static listByGroups(context:APIContext, groupIds):Observable<any> {
        var api = new BulkSearchReadAPI();
        _.each(groupIds, groupId=> {
            var subApi = new SearchReadAPI(Question.Model,[],"[('group_id','=',"+groupId+")]");
            api.add(subApi);
        });
        return context.apiService.execute(api, context.authService.LoginToken).map(questionArrs => {
            questionArrs = _.flatten(questionArrs);
            return _.map(questionArrs, question=> {
                return MapUtils.deserializeModel(Question.Model, question);
            });
        });
    }

    __api__populateOption(): SearchReadAPI {
        return QuestionOption.__api__listByQuestion(this.id);
    }

    populateOption(context:APIContext):Observable<any> {
        if (this.id)
            return QuestionOption.listByQuestion(context,this.id).map(options=> {
                this.options =  options;
                return this;
            });
        else
            return Observable.of(this);
    }

    static populateOptions(context:APIContext, questions: Question[]):Observable<any> {
        var apiList = _.map(questions,(question:Question)=> {
            return question.__api__populateOption();
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

}
