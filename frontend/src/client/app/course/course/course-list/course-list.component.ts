import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import * as _ from 'underscore';
import { USER_STATUS, GROUP_CATEGORY, COURSE_MODE, COURSE_STATUS, REVIEW_STATE } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/elearning/course.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { TreeUtils } from '../../../shared/helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { BaseModel } from '../../../shared/models/base.model';
import { User } from '../../../shared/models/elearning/user.model';
import { DataTable } from 'primeng/primeng';

const COURSE_FIELDS = ['name', 'group_id', 'code', 'mode', 'status', 'review_state', 'supervisor_name', 'supervisor_id', 'create_date', 'write_date'];
const GROUP_FIELDS = ['name', 'category' ,'parent_id', 'course_count'];

@Component({
    moduleId: module.id,
    selector: 'course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})
export class CourseListComponent extends BaseComponent {

    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;
    REVIEW_STATE = REVIEW_STATE;

    private tree: TreeNode[];
    private courses: Course[];
    private displayCourses: Course[];
    private selectedGroupNodes: TreeNode[];
    private selectedCourse: any;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        Group.listCourseGroup(this,GROUP_FIELDS).subscribe(groups => {
            var treeUtils = new TreeUtils();
            this.tree = treeUtils.buildGroupTree(groups);
        })
        this.loadCourses();
    }

    checkDuplicate(course: Course) {
        var duplicates = _.filter(this.courses, (obj: Course) => {
            return course.code == obj.code;
        });
        if (duplicates.length >= 2)
            this.warn(this.translateService.instant('There is another course with same code in database'));
    }

    addCourse() {
        this.router.navigate(['/course/form']);
    }

    editCourse(course: Course) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != course.supervisor_id) {
            this.error(this.translateService.instant('You do not have edit permission for this course'));
            return;
        }
        this.router.navigate(['/course/form', course.id]);
    }

    viewCourse(course: Course) {
        this.router.navigate(['/course/view', course.id]);
    }

    requestReview(course: Course) {
        if (this.ContextUser.id != course.supervisor_id) {
            this.error(this.translateService.instant('You do not have submit-review permission for this course'));
            return;
        }
        this.workflowService.createCourseReviewTicket(this, course).subscribe(() => {
            this.success(this.translateService.instant('Request submitted'));
            course.populate(this).subscribe();
        });
    }

    deleteCourse(course: Course) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != course.supervisor_id) {
            this.error(this.translateService.instant('You do not have delete permission for this course'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to delete?'), () => {
            course.delete(this).subscribe(() => {
                this.selectedCourse = null;
                this.courses = _.reject(this.courses, (obj: Course) => {
                    return course.id == obj.id;
                });
                this.displayCourses = this.courses;
                this.success(this.translateService.instant('Delete course successfully'));
            })
        });
    }

    loadCourses() {
        Course.all(this, COURSE_FIELDS).subscribe(courses => {
            this.courses = _.sortBy(courses, (course: Course) => {
                return -course.id
            })
            this.displayCourses = this.courses;
        });
    }

    filterCourse() {
        if (this.selectedGroupNodes.length != 0) {
            this.displayCourses = _.filter(this.courses, course => {
                var parentGroupNode = _.find(this.selectedGroupNodes, node => {
                    return node.data.id == course.group_id;
                });
                return parentGroupNode != null;
            });
        } else {
            this.displayCourses = this.courses;
        }
    }
}

