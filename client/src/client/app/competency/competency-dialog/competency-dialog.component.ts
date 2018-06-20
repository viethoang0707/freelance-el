import { Component, AfterViewInit, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Group } from '../../shared/models/elearning/group.model';
import { BaseDialog } from '../../shared/components/base/base.dialog';
import { Competency } from '../../shared/models/elearning/competency.model';
import * as _ from 'underscore';
import { TreeUtils } from '../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { CompetencyLevel } from '../../shared/models/elearning/competency-level.model';
import { BaseModel } from '../../shared/models/base.model';


@Component({
	moduleId: module.id,
	selector: 'competency-dialog',
	templateUrl: 'competency-dialog.component.html',
})
export class CompetencyDialog extends BaseDialog<Competency>  {

	private tree: TreeNode[];
	private selectedNode: TreeNode;
	private treeUtils: TreeUtils;
	private levels: CompetencyLevel[];

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private changeDetectionRef: ChangeDetectorRef) {
		super();
		this.treeUtils = new TreeUtils();
        this.levels = [];
	}

	nodeSelect(event: any) {
		if (this.selectedNode) {
			this.object.group_id = this.selectedNode.data.id;
			this.object.group_id__DESC__ = this.selectedNode.data.name;
		}
	}

	ngOnInit() {
		this.onShow.subscribe(object => {
            this.levels = [];
            Group.listCompetencyGroup(this).subscribe(groups=> {
                this.tree = this.treeUtils.buildGroupTree(groups);
                if (object.group_id) {
                    this.selectedNode = this.treeUtils.findTreeNode(this.tree, object.group_id);
                }
            });
            if (this.object.id)
                CompetencyLevel.listByCompetency(this, this.object.id).subscribe(levels=> {
                    this.levels = levels;
                });
		});
	}

	addCompetencyLevel() {
        var level = new CompetencyLevel();
        level.name ='New level';
        this.levels.push(level);
    }

    saveWithLevel() {
        this.object.save(this).subscribe(() => {
            _.each(this.levels, (level: CompetencyLevel) => {
                level.competency_id = this.object.id;
            });
            var existLevels = _.filter(this.levels, (level:CompetencyLevel)=> {
                return level.id != null && (level.name && level.name !='');
            });
            var newLevels = _.filter(this.levels, (level:CompetencyLevel)=> {
                return level.id == null && (level.name && level.name !='');
            });
            var deleteLevels = _.filter(this.levels, (level:CompetencyLevel)=> {
                return level.id == null && (!level.name || level.name ==='');
            });
            Observable.forkJoin(CompetencyLevel.updateArray(this, existLevels),
                CompetencyLevel.createArray(this, newLevels), 
                CompetencyLevel.deleteArray(this, deleteLevels))
            .subscribe(()=> {
                if (this.isNew) {
                    this.onCreateCompleteReceiver.next(this.object);
                    this.success(this.translateService.instant('Object created successfully.'));
                    this.hide();
                } else {
                    this.onUpdateCompleteReceiver.next(this.object);
                    this.success(this.translateService.instant('Object created successfully.'));
                    this.hide();
                }
            });
        });
    }
}


