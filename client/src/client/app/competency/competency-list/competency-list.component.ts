import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../../shared/models/constants'
import { Competency } from '../../../shared/models/elearning/competency.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { CompetencyDialog } from '../competency-dialog/competency-dialog.component';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { QuestionImportDialog } from '../import-dialog/import-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'competency-list',
    templateUrl: 'competency-list.component.html',
    styleUrls: ['competency-list.component.css'],
})
export class CompetencyListComponent extends BaseComponent {

    @ViewChild(CompetencyDialog) competencyDialog: CompetencyDialog;

    private tree: TreeNode[];
    private items: MenuItem[];
    private competencies: Competency[];
    private displayCompetencies: Competency[];
    private selectedGroupNodes: TreeNode[];
    private treeUtils: TreeUtils;
    private selectedCompetency: any;

    constructor() {
        super();
        this.treeUtils = new TreeUtils();
        this.competencies = [];
    }

    ngOnInit() {
        this.buildCompetencyGroup();
        this.loadCompetencies();
    }

    buildCompetencyGroup() {
        this.startTransaction();
        Group.listCompetencyGroup(this).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
            this.closeTransaction();
        });
    }

    addCompetency() {
        var competency = new Competency();
        this.competencyDialog.show(competency);
        this.competencyDialog.onCreateComplete.subscribe(() => {
            this.loadCompetencies();
        });
    }

    editQuestion() {
        if (this.selectedCompetency )
            this.competencyDialog.show(this.selectedCompetency);
    }

    deleteCompetency(){
        if(this.selectedCompetency)
            this.confirm('Are you sure to delete ?', () => {
                this.startTransaction();
                this.selectedCompetency.delete(this).subscribe(() => {
                    this.this.selectedCompetency = null;
                    this.loadCompetencies();
                    this.closeTransaction();
                });
            });
    }

    loadCompetencies() {
        this.startTransaction();
        Competency.all(this).subscribe(competencies => {
            this.competencies = competencies;
            this.displayCompetencies = competencies;
            this.closeTransaction();
        });
    }

    filterCompetency() {
        if (this.selectedGroupNodes.length != 0) {
            this.displayCompetencies = _.filter(this.competencies, competency => {
                var parentGroupNode =  _.find(this.selectedGroupNodes, node => {
                    return node.data.id == competency.group_id;
                });
                return parentGroupNode != null;
            });
        } else {
            this.displayCompetencies =  this.competencies;
        }
    }
}