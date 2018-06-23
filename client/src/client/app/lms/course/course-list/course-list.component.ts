import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    private courseMembers: CourseMember[];
    private reportUtils: ReportUtils;

    @ViewChild(CourseSyllabusDialog) syllabusDialog: CourseSyllabusDialog;

    constructor(private router: Router) {
        super();
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
            CourseMember.listByUser(this, this.ContextUser.id)
            .subscribe(courseMembers => {
                this.displayCourses(courseMembers);
            });
    }

    displayCourses(courseMembers: CourseMember[]) {
        courseMembers = _.filter(courseMembers, (member: CourseMember) => {
            return member.course_id && (member.course_mode == 'self-study' || member.class_id) && member.status == 'active';
        });
        CourseMember.populateCourses(this, courseMembers).subscribe((courses) => {
            courses = _.filter(courses, (course: Course) => {
                return course.review_state == 'approved';
            });
            courses = _.uniq(courses, (course: Course) => {
                return course.id;
            });
            courses.sort((course1: Course, course2: Course): any => {
                return (course1.create_date.getTime() - course2.create_date.getTime());
            });
            _.each(courses, (course: Course) => {
                course["student"] = _.find(courseMembers, (member: CourseMember) => {
                    return member.course_id == course.id && member.role == 'student';
                });
                course["teacher"] = _.find(courseMembers, (member: CourseMember) => {
                    return member.course_id == course.id && (member.role == 'teacher' || member.role == 'supervisor');
                });
                course["editor"] = _.find(courseMembers, (member: CourseMember) => {
                    return member.course_id == course.id && (member.role == 'editor'|| member.role == 'supervisor');
                });
                course["courseMemberData"] = {};
            });
            this.courses = courses;
            var apiList = _.map(this.courses, (course: Course) => {
                return CourseSyllabus.__api__byCourse(course.id);
            });
            BaseModel.bulk_search(this, ...apiList)
                .map(jsonArr => {
                    return _.flatten(jsonArr);
                })
                .subscribe(jsonArr => {
                    var syllabi = CourseSyllabus.toArray(jsonArr);
                    _.each(this.courses, (course: Course) => {
                        course["syllabus"] = _.find(syllabi, (syl: CourseSyllabus) => {
                            return syl.course_id == course.id;
                        });
                    });
                    var searchApiList = [];
                    for (var i = 0; i < this.courses.length; i++) {
                        searchApiList.push(CourseMember.__api__listByCourse(this.courses[i].id))
                    }
                    BaseModel.bulk_search(this, ...searchApiList).subscribe(jsonArr => {
                        for (var i = 0; i < this.courses.length; i++) {
                            var members = CourseMember.toArray(jsonArr[i]);
                            this.courses[i]["courseMemberData"] = this.reportUtils.analyseCourseMember(this.courses[i], members);
                        };
                    });
                    var countApiList = [];
                    for (var i = 0; i < this.courses.length; i++) {
                        countApiList.push(CourseUnit.__api__countBySyllabus(this.courses[i]["syllabus"].id))
                    }
                    BaseModel.bulk_count(this, ...countApiList)
                        .map(countArr => {
                            return _.flatten(countArr);
                        })
                        .subscribe(counts => {
                            for (var i = 0; i < this.courses.length; i++) {
                                this.courses[i]["unit_count"] = counts[i];
                            };
                        });
                });
        });
   }

    editSyllabus(course: Course, member: CourseMember) {
        CourseSyllabus.byCourse(this, course.id).subscribe(syllabus => {
            this.syllabusDialog.show(syllabus, course, member);
        });
    }

    studyCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/study', course.id, member.id]);
    }

    manageCourse(course: Course, member: CourseMember) {
        this.router.navigate(['/lms/courses/manage', course.id]);
    }

}