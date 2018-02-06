
import { Component, OnInit, Input} from '@angular/core';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ExamContent } from '../../../shared/models/exam-content.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';


@Component({
    moduleId: module.id,
    selector: 'etraining-exam-content-dialog',
    templateUrl: 'exam-content.component.html',
})
export class ExamContentComponent extends BaseDialog<ExamContent> {


    constructor() {
        super();
    }

}


