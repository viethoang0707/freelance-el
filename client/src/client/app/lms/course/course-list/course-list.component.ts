import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, concatAll } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { ModelAPIService } from '../../../shared/services/api/model-api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import * as _ from 'underscore';
import { GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { SelectItem } from 'primeng/api';
import { CourseSyllabusDialog } from '../../../cms/course/course-syllabus/course-syllabus.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';
import { CoursePublishDialog } from '../../../cms/course/course-publish/course-publish.dialog.component';


@Component({
    moduleId: module.id,
    selector: 'lms-course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})

export class CourseListComponent extends BaseComponent implements OnInit {

    CONTENT_STATUS = CONTENT_STATUS;
    COURSE_MODE = COURSE_MODE;

    private courses: Course[];
    private filteredCourses: Course[];
    private courseMembers: CourseMember[];
    private reportUtils: ReportUtils;
    @Input() keyword: string;

    @ViewChild(CourseSyllabusDialog) syllabusDialog: CourseSyllabusDialog;
    @ViewChild(CoursePublishDialog) publisiDialog: CoursePublishDialog;

    constructor(private router: Router) {
        super();
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        this.lmsService.init(this).subscribe(()=> {
            this.lmsService.initCourseContent(this).subscribe(()=> {
                this.lmsService.initCourseAnalytic(this).subscribe(()=> {
                    this.displayCourses();
                });
            });
        })
    }

    displayCourses() {
        var courses = this.lmsService.MyCourse;
        this.courses = this.filteredCourses = _.sortBy(courses, (course: Course) => {
            return -this.lmsService.getLastCourseTimestamp(course);
        });
        for (var i = 0; i < courses.length; i++) {
            var syllabus = this.lmsService.getCourseSyllabusFromCourse(courses[i].id);
            var units = this.lmsService.getSyllabusUnit(syllabus.id);
            courses[i]["unit_count"] = units.length;
        };
    }

    studyCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/study', course.id, member.id]);
    }

    viewCourse(course: Course) {
        this.router.navigate(['/lms/courses/view', course.id]);
    }

    editSyllabus(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/edit', course.id, member.id]);
    }

    publishCourse(course: Course) {
        this.publisiDialog.show(course);
    }

    manageCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/manage', course.id, member.id]);
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