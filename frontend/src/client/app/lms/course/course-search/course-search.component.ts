import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../shared/components/base/base.component';
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
import { BaseModel } from '../../../shared/models/base.model';

const COURSE_FIELDS = ['name', 'code', 'mode','summary' ,'logo', 'status','description', 'author_name', 'group_name', 'unit_count'];

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
        var domain = "('status','=','open'),('review_state','=','approved')";
        if (this.selectedCompetency)
            domain += ",('competency_id','=',"+this.selectedCompetency.id +")";
        if (this.selfStudyMode && !this.groupStudyMode)
            domain += ",('mode','=','self-study')";
        if (!this.selfStudyMode && this.groupStudyMode)
            domain += ",('mode','=','group')";
        if (this.selfStudyMode && this.groupStudyMode)
            domain += ",'|',('mode','=','self-study'),('mode','=','group')";
        domain = "[" + domain +"]";
        Course.search(this, COURSE_FIELDS,domain).subscribe(courses=> {
            if (this.keyword!= null && this.keyword!="")
                var keyword = this.keyword.toLowerCase();
                courses = _.filter(courses, (course:Course)=> {
                    return course.name.toLowerCase().includes(keyword)
                    || course.code.toLowerCase().includes(keyword);
                });
            this.courses =  courses;
        });
    }

    sendEnrollmentRequest(course:Course) {

    }

    back() {
        this.router.navigate(['/lms/courses']);
    }
    
}