import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base.component';
import { AuthService } from '../../shared/services/auth.service';
import * as _ from 'underscore';
import { QUESTION_TYPE, GROUP_CATEGORY, QUESTION_LEVEL } from '../../shared/models/constants'
import { Competency } from '../../shared/models/elearning/competency.model';
import { Group } from '../../shared/models/elearning/group.model';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode, MenuItem } from 'primeng/api';
import { CompetencyLevel } from '../../shared/models/elearning/competency-level.model';
import { BaseModel } from '../../shared/models/base.model';

const GROUP_FIELDS = ['name', 'category' ,'parent_id', 'competency_count'];


@Component({
    moduleId: module.id,
    selector: 'competency-list',
    templateUrl: 'competency-list.component.html',
    styleUrls: ['competency-list.component.css'],
})
export class CompetencyListComponent extends BaseComponent {

    private tree: TreeNode[];
    private competencies: Competency[];
    private levels: CompetencyLevel[];
    private displayCompetencies: Competency[];
    private selectedGroupNodes: TreeNode[];
    private selectedCompetency: any;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
        this.competencies = [];
    }

    ngOnInit() {
        Group.listCompetencyGroup(this,GROUP_FIELDS).subscribe(groups => {
            var treeUtils = new TreeUtils()
            this.tree = treeUtils.buildGroupTree(groups);
        })
        this.loadCompetencies();
    }


    addCompetency() {
        this.router.navigate(['/competency/form']);
    }

    editCompetency(competency: Competency) {
        this.router.navigate(['/competency/form', competency.id]);
    }

    viewCompetency(competency: Competency) {
        this.router.navigate(['/competency/view', competency.id]);
    }

    deleteCompetency(competency: Competency) {
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            competency.delete(this).subscribe(() => {
                this.selectedCompetency = null;
                this.loadCompetencies();
                this.competencies = _.reject(this.competencies, (obj: Competency) => {
                    return competency.id == obj.id;
                });
                this.success(this.translateService.instant('Delete competency successfully'));
            });
        });
    }

    loadCompetencies() {
        Competency.all(this).subscribe(competencies => {
            CompetencyLevel.all(this).subscribe(levels => {
                this.levels = levels;
                _.each(competencies, competency => {
                    competency.levels = _.filter(this.levels, (level: CompetencyLevel) => {
                        return level.competency_id == competency.id;
                    });
                });
                this.competencies = _.sortBy(competencies, (competency:Competency)=> {
                    return -competency.id;
                });
                this.displayCompetencies = this.competencies;
            });
        });
    }

    filterCompetency() {
        if (this.selectedGroupNodes.length != 0) {
            this.displayCompetencies = _.filter(this.competencies, competency => {
                var parentGroupNode = _.find(this.selectedGroupNodes, node => {
                    return node.data.id == competency.group_id;
                });
                return parentGroupNode != null;
            });
        } else {
            this.displayCompetencies = this.competencies;
        }
    }
}