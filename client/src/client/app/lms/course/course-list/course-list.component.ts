import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import * as _ from 'underscore';
import { GROUP_CATEGORY, COURSE_STATUS, COURSE_MODE } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { CourseMember } from '../../../shared/models/elearning/course-member.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { SelectItem } from 'primeng/api';
import { CourseSyllabusDialog } from '../../../cms/course/course-syllabus/course-syllabus.dialog.component';


@Component({
    moduleId: module.id,
    selector: 'lms-course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})

export class CourseListComponent extends BaseComponent implements OnInit {

    courses: Course[];
    currentUser: User;
    COURSE_STATUS = COURSE_STATUS;
    COURSE_MODE = COURSE_MODE;
    @ViewChild(CourseSyllabusDialog) syllabusDialog:CourseSyllabusDialog;

    constructor(private router: Router, private reportUtils: ReportUtils) {
        super();
    }

    ngOnInit() {
        this.currentUser = this.authService.UserProfile;
        CourseMember.listByUser(this, this.currentUser.id).subscribe(members => {
            var courseIds = _.pluck(members,'course_id');
            Observable.zip(Course.array(this, courseIds), Course.listByAuthor(this, this.currentUser.id))            
            .map(courses => {
                return _.flatten(courses);
            })
            .subscribe(courses => {
                courses = _.uniq(courses, (course)=> {
                    return course.id;
                });
                _.each(courses, (course)=> {
                    course.courseMemberData = {};
                    CourseMember.listByCourse(this, course.id).subscribe(members => {
                        course.courseMemberData = this.reportUtils.analyseCourseMember(course,members);
                    });
                    if (course.syllabus_id)
                        CourseUnit.countBySyllabus(this, course.syllabus_id).subscribe(count => {
                            course.unit_count = count;
                        });
                    else
                        course.unit_count  = 0;
                    course.member = _.find(members, (member:CourseMember)=> {
                        return member.course_id == course.id;
                    });

                });
                this.courses = courses;
            });
        });
    }

    getCourseSyllabus(course:Course):Observable<any> {
        return CourseSyllabus.byCourse(this, course.id).flatMap((syllabus:CourseSyllabus) => {
            if (syllabus)
                return Observable.of(syllabus);
            else {
                var syllabus = new CourseSyllabus();
            syllabus.course_id =  course.id;
            syllabus.name =  course.name;
            return syllabus.save(this);
            }
        });
    }

    editSyllabus(course:Course) {
        this.getCourseSyllabus(course).subscribe(syllabus => {
            this.syllabusDialog.show(syllabus);
        });
    }

    studyCourse(member: CourseMember, course:Course) {
        if (course.syllabus_id && course.status =='published')
            this.router.navigate(['/lms/courses/study',course.id, member.id]);
    }

    manageCourse(member: CourseMember, course: Course) {
        this.router.navigate(['/lms/courses/manage',course.id, member.id]);
    }
}