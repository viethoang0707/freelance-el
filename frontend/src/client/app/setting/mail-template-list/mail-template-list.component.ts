import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../shared/models/constants'
import { Mail } from '../../shared/models/elearning/mail.model';
import { Group } from '../../shared/models/elearning/group.model';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { CompetencyLevel } from '../../shared/models/elearning/competency-level.model';
import { BaseModel } from '../../shared/models/base.model';

@Component({
    moduleId: module.id,
    selector: 'mail-template-list',
    templateUrl: 'mail-template-list.component.html',
    styleUrls: ['mail-template-list.component.css'],
})
export class MailTemplateListComponent extends BaseComponent {


    private templates: Mail[];
    private selectedTemplate: any;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.templates = [];
    }

    ngOnInit() {
        this.loadTemplates();
    }

    editTemplate(template: Mail) {
        this.router.navigate(['/settings/mail/form', template.id]);
    }

    loadTemplates() {
        BaseModel.bulk_search(this, 
            Mail.__api__getCourseRegisterTemplate(),
            Mail.__api__getCourseOpenTemplate(),
            Mail.__api__getCourseCloseTemplate(),
            Mail.__api__getClassRegisterTemplate(),
            Mail.__api__getClassOpenTemplate(),
            Mail.__api__getClassCloseTemplate(),
            Mail.__api__getExamRegisterTemplate(),
            Mail.__api__getExamOpenTemplate(),
            Mail.__api__getExamCloseTemplate(),
            Mail.__api__getSurveyInvitationTemplate())
        .map(jsonArr=> {
            return _.flatten(jsonArr);
        })
        .subscribe(templates=> {
            this.templates =  Mail.toArray(templates);
        })

    }


}