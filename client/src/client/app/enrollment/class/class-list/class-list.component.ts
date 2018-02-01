import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { CourseClass } from '../../../shared/models/course-class.model';
import { CourseMember } from '../../../shared/models/course-member.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { CourseClassDialog } from '../class-dialog/class-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'etraining-class-list',
    templateUrl: 'class-list.component.html',
    styleUrls: ['class-list.component.css'],
})
export class CourseClassListComponent extends BaseComponent implements OnInit {

    @ViewChild(CourseClassDialog) classDialog: CourseClassDialog;
    selectedClass: CourseClass;
    classes: CourseClass[];

    constructor() {
        super();
    }

    ngOnInit() {
        this.loadTableData();
    }

    add() {
        var courseClass =  new CourseClass();
        this.classDialog.show(courseClass);
        this.classDialog.onCreateComplete.subscribe(()=> {
            this.loadTableData();
        })
    }

    edit() {
        if (this.selectedClass)
            this.classDialog.show(this.selectedClass);
    }

    delete() {
        if (this.selectedClass)
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to delete ?'),
            accept: () => {
                this.selectedClass.data.delete(this).subscribe(()=> {
                    this.loadTableData();
                })
            }
        });
    }

    loadTableData() {
        var self = this;
        CourseClass.all(this).subscribe(classes => {
            this.classes = classes;
            _.each(classes, function(clazz) {
                if (clazz.supervisor_id)
                    CourseMember.get(self, clazz.supervisor_id).subscribe(member => {
                        clazz.supevisor = member;
                    });
            });
        });
    }
    

}
