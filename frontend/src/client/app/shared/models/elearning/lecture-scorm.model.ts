
import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { SearchReadAPI } from '../../services/api/search-read.api';

@Model('etraining.scorm_lecture')
export class SCORMLecture extends BaseModel{

    // Default constructor will be called by mapper
    constructor(){
        super();
        
        this.base_url = undefined;
        this.entry_file = undefined;
        this.unit_id = undefined;
        this.package_url = undefined;
        this.package_file_id = undefined;
        this.course_id = undefined;
    }

    entry_file: string;
    package_file_id: number;
    base_url: string;
    package_url: string;
    unit_id: number;
    course_id: number;
}
