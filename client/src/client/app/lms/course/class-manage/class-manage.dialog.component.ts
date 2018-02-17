import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Exam } from '../../../shared/models/exam.model';
import { Group } from '../../../shared/models/group.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-lms-class-manage-dialog',
    templateUrl: 'class-manage.dialog.component.html',
})
export class ClassManageDialog extends BaseDialog {


}
