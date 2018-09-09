import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Exam } from '../../../shared/models/elearning/exam.model';
import { ExamMember } from '../../../shared/models/elearning/exam-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'exam-view',
    templateUrl: 'exam-view.component.html',
    styleUrls: ['exam-view.component.css'],
})
export class ExamViewComponent extends BaseComponent {

    private exam: Exam;
    private editor: ExamMember;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.editor = new ExamMember();
        this.exam = new Exam();
    }

    ngOnInit() {
        this.exam = this.route.snapshot.data['exam'];
        this.exam.examEditor(this).subscribe(member => {
            if (member)
                this.editor = member;
        });
    }

    editExam() {
        this.router.navigate(['/assessment/exam/form', this.exam.id]);
    }

    close() {
        this.router.navigate(['/assessment/exams']);
    }

}
