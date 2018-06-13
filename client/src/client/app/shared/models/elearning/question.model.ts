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
	}

    title:string;
    content: string;
    explanation: string;
    type: string;
    level: string;
    group_id: number;

    static __api__createWithOption(question:Question, options:QuestionOption[]): CreateAPI {
        question["options"] =  options;
        return new CreateAPI(Question.Model, question);
    }

    static createWithOption(context: APIContext, question:Question, options:QuestionOption[]):Observable<any> {
        question["options"] =  options;
        return question.save(context);
    }

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
        return context.apiService.execute(api, context.authService.CloudAcc.id, context.authService.CloudAcc.api_endpoint).map(questionArrs => {
            questionArrs = _.flatten(questionArrs);
            return _.map(questionArrs, question=> {
                return MapUtils.deserializeModel(Question.Model, question);
            });
        });
    }

}
