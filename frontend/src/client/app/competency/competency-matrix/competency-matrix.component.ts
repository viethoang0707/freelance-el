import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';

import { AuthService } from '../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../shared/models/constants'
import { Competency } from '../../shared/models/elearning/competency.model';
import { Group } from '../../shared/models/elearning/group.model';
import { CompetencyDialog } from '../competency-dialog/competency-dialog.component';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { Course } from '../../shared/models/elearning/course.model';

@Component({
    moduleId: module.id,
    selector: 'competency-matrix',
    templateUrl: 'competency-matrix.component.html',
    styleUrls: ['competency-matrix.component.css'],
})
export class CompetencyMatrixComponent extends BaseComponent {


    private courses: Course[];

    constructor() {
        super();
        this.courses = [];
    }

    ngOnInit() {
        Course.all(this).subscribe(courses => {
            this.courses = courses;
        });
    }

    
}