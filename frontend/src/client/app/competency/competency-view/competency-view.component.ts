import { Component, AfterViewInit, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../shared/services/auth.service';
import { Group } from '../../shared/models/elearning/group.model';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Competency } from '../../shared/models/elearning/competency.model';
import * as _ from 'underscore';
import { CompetencyLevel } from '../../shared/models/elearning/competency-level.model';
import { BaseModel } from '../../shared/models/base.model';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
	moduleId: module.id,
	selector: 'competency-view',
	templateUrl: 'competency-view.component.html',
})
export class CompetencyViewComponent extends BaseComponent {

	private levels: CompetencyLevel[];
    private competency: Competency;

	constructor(private router: Router, private route: ActivatedRoute) {
		super();
        this.levels = [];
        this.competency = new Competency();
	}


	ngOnInit() {
		this.competency = this.route.snapshot.data['competency'];
        this.competency.listLevels(this).subscribe(levels => {
            this.levels = levels;
        });
	}

    editCompetency() {
        this.router.navigate(['/competency/form', this.competency.id]);
    }

    close() {
        this.router.navigate(['/competency/list']);
    }
}


