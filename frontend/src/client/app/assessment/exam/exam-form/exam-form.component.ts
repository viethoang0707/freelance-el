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
import { SelectUsersDialog } from '../../../shared/components/select-user-dialog/select-user-dialog.component';
import { SelectCompetencyLevelDialog } from '../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component';
import { ExamFormContentComponent } from './exam-form-content.component';

@Component({
    moduleId: module.id,
    selector: 'exam-form',
    templateUrl: 'exam-form.component.html',
    styleUrls: ['exam-form.component.css'],
})
export class ExamFormComponent extends BaseComponent {

    private exam: Exam;
    private editor: ExamMember;

    @ViewChild(ExamFormContentComponent) formContent: ExamFormContentComponent;

    constructor(private router: Router, private route: ActivatedRoute, private http: Http) {
        super();
        this.editor = new ExamMember();
        this.exam = new Exam();
    }

    ngOnInit() {
        this.exam = this.route.snapshot.data['exam'];
        if (this.exam.IsNew) {
            this.editor = new ExamMember();
            this.exam.supervisor_id = this.ContextUser.id;
            this.exam.review_state = this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
            this.formContent.render(this.exam, this.editor);
        } else {
            this.exam.examEditor(this).subscribe(member => {
                if (!member) {
                    this.editor = new ExamMember();
                    this.editor.role = 'editor';
                    this.editor.exam_id = this.exam.id;
                } else
                    this.editor = member;
                this.formContent.render(this.exam, this.editor);
            });
        }
    }

    save() {
        this.exam.save(this).subscribe(() => {
            this.editor.role = 'editor';
            this.editor.exam_id = this.exam.id;
            this.editor.save(this).subscribe(() => {
                this.router.navigate(['/assessment/exam/view', this.exam.id]);
            });
        });
    }

    cancel() {
        if (this.exam.IsNew)
            this.router.navigate(['/assessment/exams']);
        else
            this.router.navigate(['/assessment/exam/view', this.exam.id]);
    }
}

