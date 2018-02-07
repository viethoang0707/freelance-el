import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { GROUP_CATEGORY, EXAM_STATUS } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/course.model';
import { CourseMember } from '../../../shared/models/course-member.model';
import { Group } from '../../../shared/models/group.model';
import { SelectItem } from 'primeng/api';

@Component({
    moduleId: module.id,
    selector: 'etraining-lms-course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})

export class CourseListComponent extends BaseComponent implements OnInit {

    courses: Course[];
    EXAM_STATUS = EXAM_STATUS;


    constructor() {
        super();

    }

    ngOnInit() {
        CourseMember.listByUser(this, this.authService.CurrentUser.id).subscribe(members => {
            var examIds = _.pluck(members,'exam_id');
            Exam.array(this, examIds).subscribe(exams => {
                this.exams =  exams;
                _.each(exams, function(exam) {
                    exam.member = _.find(members, function(member) {
                        return member.exam_id == exam.id;
                    });
                });
            })
        });
    }


}