import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model,FieldProperty } from '../decorator';
import { APIContext } from '../context';
import { ExamQuestion } from './exam-question.model';
import { Exam } from './exam.model';
import * as _ from 'underscore';
import { SearchReadAPI } from '../../services/api/search-read.api';
import { Cache } from '../../helpers/cache.utils';
import { ListAPI } from '../../services/api/list.api';
import { ProjectSubmission } from './project-submission.model';

@Model('etraining.project')
export class Project extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
        this.status = undefined;
		this.course_id = undefined;
        this.class_id = undefined;
        this.content = undefined;
        this.filename = undefined;
        this.file_url = undefined;
        this.start = undefined;
        this.end = undefined;
        this.submission_ids = [];
	}

    name:string;
    status:string;
    content:string;
    filename: string;
    class_id:number;
    course_id: number;
    file_url: string;
    @FieldProperty<Date>()
    start: Date;
    @FieldProperty<Date>()
    end: Date;
    submission_ids: number[];

    
    get IsAvailable():boolean {
        var now = new Date();
        if (this.start.getTime() > now.getTime())
            return false;
        if (this.end.getTime() < now.getTime())
            return false;
        return true;
    }

    static __api__listSubmissios(submission_ids: number[]): ListAPI {
        return new ListAPI(ProjectSubmission.Model, submission_ids,[]);
    }

    listSubmissions( context:APIContext): Observable<any[]> {
        return ProjectSubmission.array(context,this.submission_ids);
    }

}
