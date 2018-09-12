import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseDialog } from '../../../shared/components/base/base.dialog';
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
    selector: 'exam-dialog',
    templateUrl: 'exam-dialog.component.html',
})
export class ExamDialog extends BaseDialog<Exam> {

    private editor: ExamMember;

    @ViewChild(ExamFormContentComponent) formContent: ExamFormContentComponent;

    constructor() {
        super();
        this.editor = new ExamMember();
    }

    ngOnInit() {
        this.onShow.subscribe(() => {
            if (this.object.IsNew) {
                this.editor = new ExamMember();
                this.object.supervisor_id = this.ContextUser.id;
                this.object.review_state = this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
                this.formContent.render(this.object, this.editor);
            } else {
                this.object.examEditor(this).subscribe(member => {
                    if (!member) {
                        this.editor = new ExamMember();
                        this.editor.role = 'editor';
                        this.editor.exam_id = this.object.id;
                    } else
                        this.editor = member;
                    this.formContent.render(this.object, this.editor);
                });
            }
        });
    }

    save() {
        this.object.save(this).subscribe(() => {
            this.editor.role = 'editor';
            this.editor.exam_id = this.object.id;
            this.editor.save(this).subscribe(() => {
                this.hide();
                this.onUpdateCompleteReceiver.next();
            });
        });
    }
}

