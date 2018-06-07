import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';
import { Cache } from '../../helpers/cache.utils';
import { SearchReadAPI } from '../../services/api/search-read.api';
import * as _ from 'underscore';


@Model('etraining.exam_grade')
export class ExamGrade extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

        this.name = undefined;
        this.min_score = undefined;
        this.max_score = undefined;
    }

    name: string;
    min_score: number;
    max_score: number;


    static gradeScore(grades:ExamGrade[], score:number) {
        return _.find(grades, (obj)=> {
            return obj.min_score <= score && obj.max_score >= score;
        });
    }

}
