import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Survey } from '../../../shared/models/elearning/survey.model';
import { SurveyMember } from '../../../shared/models/elearning/survey-member.model';
import { Http, Response } from '@angular/http';
import { DEFAULT_DATE_LOCALE, EXAM_STATUS, EXAM_MEMBER_ROLE, EXAM_MEMBER_STATUS } from '../../../shared/models/constants'
import { SelectItem, MenuItem } from 'primeng/api';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'survey-view',
    templateUrl: 'survey-view.component.html',
    styleUrls: ['survey-view.component.css'],
})
export class SurveyViewComponent extends BaseComponent {

    private survey: Survey;
    private editor: SurveyMember;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.editor = new SurveyMember();
        this.survey = new Survey();
    }

    ngOnInit() {
        this.survey = this.route.snapshot.data['survey'];
        this.survey.surveyEditor(this).subscribe(member => {
            if (member)
                this.editor = member;
        });
    }

    editSurvey() {
        this.router.navigate(['/assessment/survey/form', this.survey.id]);
    }

    close() {
        this.router.navigate(['/assessment/surveys']);
    }

}
