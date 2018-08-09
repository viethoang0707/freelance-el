
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { DEFAULT_DATE_FORMAT } from '../constants';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('ir.config_parameter')
export class Setting extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.value = undefined;
		this.key = undefined;
	}

    key:string;
    value: string;

    static __api__dateFormat(): SearchReadAPI {
        return new SearchReadAPI(Setting.Model,[],"[('key','=','DATE_FORMAT')]");
    }

    static dateFormat( context:APIContext): Observable<any> {
        return Setting.single(context,[],"[('key','=','DATE_FORMAT')]").map(setting=> {
            if (!setting) {
                setting = new Setting();
                setting.key = "DATE_FORMAT";
                setting.value =DEFAULT_DATE_FORMAT;
            }
            return setting;
        });
    }

}
