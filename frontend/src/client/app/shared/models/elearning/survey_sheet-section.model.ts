import { BaseModel } from '../base.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Model } from '../decorator';
import { APIContext } from '../context';

import { SearchReadAPI } from '../../services/api/search-read.api';
import * as _ from 'underscore';


@Model('etraining.survey_sheet_section')
export class SurveySheetSection extends BaseModel {

    // Default constructor will be called by mapper
    constructor() {
        super();

        this.name = undefined;
        this.order = undefined;
        this.sheet_id =  undefined;
        this.exam_id =  undefined;
    }

    name: string;
    order: number;
    sheet_id: number;
    exam_id: number;
    

}
