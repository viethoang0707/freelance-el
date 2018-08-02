
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.course_material')
export class CourseMaterial extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
		
		this.name = undefined;
		this.course_id = undefined;
		this.filename = undefined;
        this.type = undefined;
        this.url = undefined;
    }
    
    name:string;
    course_id: number;
    filename:string;
    type:string;
    url:string;

}
