import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';

@Model('etraining.course_message')
export class CourseMessage extends BaseModel {

    constructor() {
        super();

        this.message = undefined;
        this.course_id = undefined;
    }

    message: string;
    course_id: number;
}
