import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.exam_setting')
export class ExamSetting extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.max_attempt = undefined;
		this.allow_navigation = undefined;
		this.take_picture_on_submit = undefined;
        this.scale =  undefined;
	}

    scale: number;
    max_attempt: number;
    allow_navigation: boolean;
    take_picture_on_submit: boolean;

    static appSetting( context:APIContext): Observable<any> {
        return ExamSetting.all(context).map(settings => {
            if (settings && settings.length) {
                return Observable.of(settings[0]);
            } else 
                return Observable.of(null)
        });
    }

    static all( context:APIContext): Observable<any[]> {
        return ExamSettingCache.all(context);
    }
}
