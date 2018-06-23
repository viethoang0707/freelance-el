import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { AuthService } from '../../../shared/services/auth.service';
import { ReportUtils } from '../../../shared/helpers/report.utils';
import * as _ from 'underscore';
import { GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE } from '../../../shared/models/constants'
import { Course } from '../../../shared/models/elearning/course.model';
import { CourseUnit } from '../../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../../shared/models/elearning/course-syllabus.model';
import { Competency } from '../../../shared/models/elearning/competency.model';
import { Group } from '../../../shared/models/elearning/group.model';
import { User } from '../../../shared/models/elearning/user.model';
import { SelectItem } from 'primeng/api';
import { CourseSyllabusDialog } from '../../../cms/course/course-syllabus/course-syllabus.dialog.component';
import { BaseModel } from '../../../shared/models/base.model';


@Component({
    moduleId: module.id,
    selector: 'lms-course-search',
    templateUrl: 'course-search.component.html',
    styleUrls: ['course-search.component.css'],
})

export class CourseSearchComponent extends BaseComponent implements OnInit {

    COURSE_MODE =  COURSE_MODE;
    CONTENT_STATUS = CONTENT_STATUS;

    private courses: Course[];
    private competencies: Competency[];
    private selectedCompetency: any;

    @Input() keyword: string;
    @Input() selfStudyMode: boolean;
    @Input() groupStudyMode: boolean;

    constructor(private router: Router) {
        super();
        this.competencies = [];
        this.courses = [];
    }

    ngOnInit() {
        this.courses = [];
        Competency.all(this).subscribe(competencies=> {
            this.competencies =  competencies;
        });
    }

    searchCourse() {
        this.courses = [];
        var domain = "('status','=','published')";
        if (this.selectedCompetency)
            domain += ",('competency_id','=',"+this.selectedCompetency.id +")";
        if (this.selfStudyMode && !this.groupStudyMode)
            domain += ",('mode','=','self-study')";
        if (!this.selfStudyMode && this.groupStudyMode)
            domain += ",('mode','=','group')";
        if (this.selfStudyMode && this.groupStudyMode)
            domain += ",'|',('mode','=','self-study'),('mode','=','group')";
        domain = "[" + domain +"]";
        Course.search(this, [],domain).subscribe(courses=> {
            if (this.keyword!= null && this.keyword!="")
                courses = _.filter(courses, (course:Course)=> {
                    return course.name.includes(this.keyword) 
                    || course.summary.includes(this.keyword)
                    || course.code.includes(this.keyword)
                    || course.description.includes(this.keyword);
                });
            this.courses =  courses;
            var courseIds = _.pluck(this.courses, 'id');
            CourseSyllabus.fromCourseArray(this, courseIds).subscribe(sylList => {
                _.each(this.courses, (course: Course) => {
                    course["syllabus"] = _.find(sylList, (syl: CourseSyllabus) => {
                        return syl.course_id == course.id;
                    });
                });
                var sylIds = _.pluck(sylList, 'id');
                CourseUnit.countBySyllabusArray(this, sylIds).subscribe(unitCounts => {
                    for (var i = 0; i < sylIds.length; i++) {
                        let course: Course = _.find(this.courses, (obj: Course) => {
                            return obj["syllabus"].id == sylIds[i];
                        });
                        course["unit_count"] = unitCounts[i];
                    }
                });
            });
        });
    }

    sendEnrollmentRequest(course:Course) {

    }
    
}