import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import { ReportUtils } from '../../shared/helpers/report.utils';
import * as _ from 'underscore';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE } from '../../shared/models/constants'
import { Course } from '../../shared/models/elearning/course.model';
import { CourseUnit } from '../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../shared/models/elearning/course-syllabus.model';
import { CourseMember } from '../../shared/models/elearning/course-member.model';
import { Group } from '../../shared/models/elearning/group.model';
import { User } from '../../shared/models/elearning/user.model';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../shared/models/base.model';

const COURSE_FIELDS = ['status', 'review_state', 'name', 'write_date', 'create_date', 'supervisor_id', 'logo', 'summary', 'description', 'code', 'mode', 'unit_count', 'group_name', 'syllabus_id'];

@Component({
    moduleId: module.id,
    selector: 'lms-course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})
export class CourseListComponent extends BaseComponent implements OnInit {

    COURSE_STATUS = COURSE_STATUS;
    COURSE_MODE = COURSE_MODE;

    private courses: Course[];
    private filteredCourses: Course[];
    private reportUtils: ReportUtils;

    @Input() keyword: string;


    constructor(private router: Router) {
        super();
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        this.lmsProfileService.init(this).subscribe(() => {
            Course.array(this, this.lmsProfileService.MyCourseIds, COURSE_FIELDS).subscribe(courses => {
                this.displayCourses(courses);
            });
        });
    }

    displayCourses(courses: Course[]) {
        _.each(courses, (course: Course) => {
            course['student'] = this.lmsProfileService.getCourseMemberByRole('student', course.id);
            course['teacher'] = this.lmsProfileService.getCourseMemberByRole('teacher', course.id);
            course['editor'] = this.lmsProfileService.getCourseMemberByRole('editor', course.id);
            course['supervisor'] = this.lmsProfileService.getCourseMemberByRole('supervisor', course.id);
        });
        this.courses = this.filteredCourses = _.sortBy(courses, (course: Course) => {
            return -course.id;
        });
    }

    studyCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/course/study', course.id, member.id]);
    }

    withdrawCourse(course: Course, member: CourseMember) {
        this.confirm(this.translateService.instant('Are you sure to proceed?'), () => {
            member.status = 'withdraw';
            member.save(this).subscribe(() => {
                this.lmsProfileService.invalidateAll();
            })
        });
    }

    viewCourse(course: Course) {
        this.router.navigate(['/lms/course/view', course.id]);
    }

    editCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/course/edit', course.id]);
    }

    publishCourse(course: Course) {
        this.router.navigate(['/cms/course/publish', course.id, course.syllabus_id]);
    }

    manageCourse(course: Course, member: CourseMember) {
        if (course.mode =='group')
            this.router.navigate(['/lms/course/group-manage', course.id, member.id]);
        if (course.mode =='self-study')
            this.router.navigate(['/lms/course/self-study-manage', course.id, member.id]);
    }

    filterCourse() {
        if (!this.keyword)
            return;
        this.keyword = this.keyword.trim();
        if (this.keyword.length == 0)
            this.filteredCourses = this.courses;
        else {
            var keyword = this.keyword.toLowerCase();
            this.filteredCourses = _.filter(this.courses, (course: Course) => {
                return course.name.toLowerCase().includes(this.keyword)
                    || course.summary.toLowerCase().includes(this.keyword)
                    || course.code.toLowerCase().includes(this.keyword)
                    || course.description.toLowerCase().includes(this.keyword);
            });
        }

    }
}