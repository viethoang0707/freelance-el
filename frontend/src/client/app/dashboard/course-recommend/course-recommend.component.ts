import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../shared/components/base/base.component';
import { ReportUtils } from '../../shared/helpers/report.utils';
import * as _ from 'underscore';
import { GROUP_CATEGORY, CONTENT_STATUS, COURSE_MODE } from '../../shared/models/constants'
import { Course } from '../../shared/models/elearning/course.model';
import { CourseUnit } from '../../shared/models/elearning/course-unit.model';
import { CourseSyllabus } from '../../shared/models/elearning/course-syllabus.model';
import { Competency } from '../../shared/models/elearning/competency.model';
import { Achivement } from '../../shared/models/elearning/achievement.model';
import { User } from '../../shared/models/elearning/user.model';
import { SelectItem } from 'primeng/api';
import { BaseModel } from '../../shared/models/base.model';

const COURSE_FIELDS = ['name', 'code', 'mode','summary' ,'logo', 'status','description', 'author_name', 'group_name', 'unit_count'];

@Component({
    moduleId: module.id,
    selector: 'lms-course-recommend',
    templateUrl: 'course-recommend.component.html',
    styleUrls: ['course-recommend.component.css'],
})

export class CourseRecommendComponent extends BaseComponent implements OnInit {

    COURSE_MODE =  COURSE_MODE;
    CONTENT_STATUS = CONTENT_STATUS;

    private courses: Course[];


    constructor(private router: Router) {
        super();
        this.courses = [];
    }

    ngOnInit() {
        this.courses = [];
        this.searchRecommendCourse();
    }

    searchRecommendCourse() {
        this.courses = [];
        var domain = "('status','=','published')";
        this.ContextUser.listAchivements(this).subscribe(skills=> {
            var apiList = _.map(skills, (skill:Achivement)=> {
                return Course.__api__listByCompetency(skill.competency_id,COURSE_FIELDS);
            });
            BaseModel.bulk_list(this, ...apiList)
            .map(jsonArr=> {
                return _.flatten(jsonArr);
            })
            .subscribe(jsonArr=> {
                this.courses = Course.toArray(jsonArr);
            })
        });
    }

    sendEnrollmentRequest(course:Course) {

    }
    
}