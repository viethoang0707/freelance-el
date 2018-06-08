import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { APIService } from '../../../shared/services/api.service';
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


@Component({
    moduleId: module.id,
    selector: 'lms-course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['course-list.component.css'],
})

export class CourseListComponent extends BaseComponent implements OnInit {

    private courses: Course[];
    private currentUser: User;
    private reportUtils: ReportUtils;
    CONTENT_STATUS = CONTENT_STATUS;
    COURSE_MODE = COURSE_MODE;
    @ViewChild(CourseSyllabusDialog) syllabusDialog:CourseSyllabusDialog;

    constructor(private router: Router) {
        super();
        this.reportUtils = new ReportUtils();
    }

    ngOnInit() {
        this.currentUser = this.authService.UserProfile;
        this.loadCourses();
    }

    loadCourses() {
        
        CourseMember.listByUser(this, this.currentUser.id).subscribe(members => {
            members = _.filter(members, (member=> {
                return member.course_id && (member.course_mode=='self-study' || member.class_id) && member.status=='active'
            }));
            var courseIds = _.pluck(members,'course_id');
            Observable.zip(Course.array(this, courseIds), Course.listByAuthor(this, this.currentUser.id))            
            .map(courses => {
                var courstList = _.flatten(courses);
                return _.uniq(courstList, (course)=> {
                    return course.id;
                });
            })
            .subscribe(courses => {
                this.courses = courses;
                _.each(this.courses, (course)=> {
                    course["courseMemberData"] = {};
                    CourseMember.listByCourse(this, course.id).subscribe(members => {
                        course["courseMemberData"] = this.reportUtils.analyseCourseMember(course,members);
                    });
                    if (course.syllabus_id)
                        CourseUnit.countBySyllabus(this, course.syllabus_id).subscribe(count => {
                            course["unit_count"] = count;
                        });
                    else
                        course["unit_count"]   = 0;
                    course["member"] = _.find(members, (member:CourseMember)=> {
                        return member.course_id == course.id;
                    });
                });
                this.courses.sort((course1, course2): any => {
                    if (course1.create_date > course2.create_date)
                        return -1;
                    else if (course1.create_date < course2.create_date)
                        return 1;
                    else
                        return 0;
                });
                
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

    studyCourse( course:Course,member: CourseMember) {
        if ( course.status =='published') {
            
            CourseSyllabus.byCourse(this, course.id).subscribe(syl=> {
                if (syl && syl.status == 'published')
                    this.router.navigate(['/lms/courses/study',course.id, member.id]);
                else
                    this.error('The course has not been published');
                
            });
        }
        else {
            this.error('The course has not been published');
        }
    }

    manageCourse( course: Course,member: CourseMember) {
        if ( course.status =='published') {
            
            CourseSyllabus.byCourse(this, course.id).subscribe(syl=> {
                if (syl && syl.status == 'published')
                    this.router.navigate(['/lms/courses/manage',course.id]);
                else
                    this.error('The course has not been published');
                
            });
        }
        else {
            this.error('The course has not been published');
        }
        
    }
}