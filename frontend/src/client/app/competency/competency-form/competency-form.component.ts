import { Component, AfterViewInit, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth.service';
import { Group } from '../../shared/models/elearning/group.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Competency } from '../../shared/models/elearning/competency.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CompetencyLevel } from '../../shared/models/elearning/competency-level.model';
import { BaseModel } from '../../shared/models/base.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

const GROUP_FIELDS = ['name', 'category' ,'parent_id', 'competency_count'];

@Component({
	moduleId: module.id,
	selector: 'competency-form',
	templateUrl: 'competency-form.component.html',
})
export class CompetencyFormComponent extends BaseComponent {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private treeUtils: TreeUtils;
	private levels: CompetencyLevel[];
    private competency: Competency;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
		this.treeUtils = new TreeUtils();
        this.levels = [];
        this.competency = new Competency();
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.competency.group_id = this.selectedNode.data.id;
			this.competency.group_name = this.selectedNode.data.name;
		}
	}

	ngOnInit() {
		this.competency = this.route.snapshot.data['competency'];
        Group.listCompetencyGroup(this, GROUP_FIELDS).subscribe(groups => {
            this.tree = this.treeUtils.buildGroupTree(groups);
            if (this.competency.group_id) {
                this.selectedNode = this.treeUtils.findTreeNode(this.tree, this.competency.group_id);
            }
        });
        if (this.competency.id)
            this.competency.listLevels(this).subscribe(levels => {
                this.levels = levels;
            });
	}

	addCompetencyLevel() {
        var level = new CompetencyLevel();
        level.name = 'New level';
        this.levels.push(level);
    }

    save() {
        var isNew = this.competency.IsNew;
        this.competency.save(this).subscribe(() => {
            _.each(this.levels, (level: CompetencyLevel) => {
                level.competency_id = this.competency.id;
            });
            var existLevels = _.filter(this.levels, (level: CompetencyLevel) => {
                return !level.IsNew && (level.name && level.name != '');
            });
            var newLevels = _.filter(this.levels, (level: CompetencyLevel) => {
                return level.IsNew && (level.name && level.name != '');
            });
            var deleteLevels = _.filter(this.levels, (level: CompetencyLevel) => {
                return !level.IsNew && (!level.name || level.name === '');
            });
            Observable.forkJoin(CompetencyLevel.updateArray(this, existLevels),
                CompetencyLevel.createArray(this, newLevels),
                CompetencyLevel.deleteArray(this, deleteLevels))
                .subscribe(() => {
                    this.router.navigate(['/competency/view', this.competency.id]);
                });
        });
    }

    cancel() {
        this.router.navigate(['/competency/list']);
    }
}


