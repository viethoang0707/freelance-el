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
        this.exam_id = undefined;
	}

    scale: number;
    exam_id: number;
    max_attempt: number;
    allow_navigation: boolean;
    take_picture_on_submit: boolean;

    static __api__byExam(examId: number): SearchReadAPI {
        return new SearchReadAPI(ExamSetting.Model, [],"[('exam_id','=',"+examId+")]");
    }
    

    static byExam( context:APIContext, examId: number): Observable<any> {
        return ExamSetting.single(context,[],"[('exam_id','=',"+examId+")]");
    }
}
