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

const COURSE_FIELDS = ['name', 'group_id', 'code', 'mode', 'status', 'review_state', 'supervisor_name', 'supervisor_id', 'create_date', 'write_date'];
const GROUP_FIELDS = ['name', 'category', 'parent_id'];


@Component({
    moduleId: module.id,
    selector: 'course-enrollment-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})
export class CourseEnrollmentListComponent extends BaseComponent {

    COURSE_MODE = COURSE_MODE;
    COURSE_STATUS = COURSE_STATUS;
    REVIEW_STATE = REVIEW_STATE;

    private tree: TreeNode[];
    private courses: Course[];
    private displayCourses: Course[];
    private selectedGroupNodes: TreeNode[];
    private selectedCourse: Course;

    constructor(private router: Router, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        Group.listCourseGroup(this, GROUP_FIELDS).subscribe(groups => {
            var treeUtils = new TreeUtils();
            this.tree = treeUtils.buildGroupTree(groups);
        })
        this.loadCourses();
    }


    enrollCourse(course: Course) {
        if (this.ContextUser.id != course.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this course'));
            return;
        }
        if (course.mode == 'self-study')
            this.router.navigate(['/course/enroll', course.id]);
        else if (course.mode == 'group')
            this.router.navigate(['/course/class/list', course.id]);
    }

    loadCourses() {
        Course.allForEnroll(this, COURSE_FIELDS).subscribe(courses => {
            this.courses = courses;
            this.displayCourses = _.sortBy(courses, (course: Course) => {
                return course.id;
            });
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

    closeCourse(course: Course) {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != course.supervisor_id) {
            this.error(this.translateService.instant('You do not have close permission for this class'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed ? You will not be able to add new class after the course is closed'), () => {
            course.close(this).subscribe(() => {
                this.success(this.translateService.instant('Course close'));
            });
        });
    }

    openCourse(course: Course) {
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != course.supervisor_id) {
            this.error(this.translateService.instant('You do not have open permission for this class'));
            return;
        }
        this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
            course.open(this).subscribe(() => {
                this.success(this.translateService.instant('Course open'));
            });
        });

    }
}
