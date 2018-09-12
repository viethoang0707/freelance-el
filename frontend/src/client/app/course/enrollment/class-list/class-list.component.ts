import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { Group } from '../../../shared/models/elearning/group.model';
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseClass } from '../../../shared/models/elearning/course-class.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { GROUP_CATEGORY, CLASS_STATUS, COURSE_MODE } from '../../../shared/models/constants'
import { BaseModel } from '../../../shared/models/base.model';

const CLASS_FIELDS = ['name', 'member_count', 'status', 'course_name', 'supervisor_id', 'start', 'end'];

@Component({
    moduleId: module.id,
    selector: 'class-list',
    templateUrl: 'class-list.component.html',
    styleUrls: ['class-list.component.css'],
})
export class CourseClassListComponent extends BaseComponent implements OnInit {

    COURSE_MODE = COURSE_MODE;
    CLASS_STATUS = CLASS_STATUS;

    private classes: CourseClass[];
    private courseId: number;
    private selectedClass: any;
    private display: boolean;

    constructor(private location: Location, private router: Router, private route: ActivatedRoute) {
        super();
        this.classes = [];
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.courseId = +params['courseId'];
            BaseModel.bulk_search(this, Course.__api__listClasses(+params['courseId'], CLASS_FIELDS))
                .map(jsonArr => {
                    return _.flatten(jsonArr)
                }).subscribe(jsonArr => {
                    this.classes = _.sortBy(CourseClass.toArray(jsonArr), (clazz:CourseClass)=> {
                        return -clazz.id;
                    });
                });
        });
    }

    enroll(courseClass: CourseClass) {
        this.router.navigate(['/course/enroll/class', courseClass.id]);
    }


    close() {
        this.router.navigate(['/course/enrollments']);
    }

    addClass() {
        this.router.navigate(['/course/class/form', this.courseId]);
    }

    editClass(courseClass: CourseClass) {
        this.router.navigate(['/course/class/form', this.courseId, courseClass.id]);
    }

    deleteClass(courseClass: CourseClass) {
        if (courseClass.member_count)
            this.error(this.translateService.instant('You cannot delete class with member inside'));
        else
            this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
                courseClass.delete(this).subscribe(() => {
                    this.selectedClass = null;
                    this.classes = _.reject(this.classes, (obj: CourseClass) => {
                        return courseClass.id == obj.id;
                    });
                    this.success(this.translateService.instant('Delete class successfully'));
                })
            });
    }

    closeClass(courseClass: CourseClass) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != courseClass.supervisor_id) {
            this.error(this.translateService.instant('You do not have close permission for this class.  You will not be able to enroll new members after the class is closed'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
            courseClass.close(this).subscribe(() => {
                this.success(this.translateService.instant('Class close'));
            });
        });
    }

    openClass(courseClass: CourseClass) {
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != courseClass.supervisor_id) {
            this.error(this.translateService.instant('You do not have open permission for this class'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
            courseClass.open(this).subscribe(() => {
                this.success(this.translateService.instant('Class open'));
            });
        });

    }
}
