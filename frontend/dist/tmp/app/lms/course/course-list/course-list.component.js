"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var base_component_1 = require("../../../shared/components/base/base.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_syllabus_dialog_component_1 = require("../../../cms/course/course-syllabus/course-syllabus.dialog.component");
var course_publish_dialog_component_1 = require("../../../cms/course/course-publish/course-publish.dialog.component");
var CourseListComponent = (function (_super) {
    __extends(CourseListComponent, _super);
    function CourseListComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.COURSE_STATUS = constants_1.COURSE_STATUS;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    CourseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            var courses = _this.lmsProfileService.MyCourses;
            _this.displayCourses(courses);
        });
    };
    CourseListComponent.prototype.displayCourses = function (courses) {
        var _this = this;
        _.each(courses, function (course) {
            course['student'] = _this.lmsProfileService.getCourseMemberByRole('student', course.id);
            course['teacher'] = _this.lmsProfileService.getCourseMemberByRole('teacher', course.id);
            course['editor'] = _this.lmsProfileService.getCourseMemberByRole('editor', course.id);
            course['supervisor'] = _this.lmsProfileService.getCourseMemberByRole('supervisor', course.id);
            if (course['supervisor'])
                course['editor'] = course['supervisor'];
        });
        this.courses = this.filteredCourses = _.sortBy(courses, function (course) {
            return -_this.lmsProfileService.getLastCourseTimestamp(course);
        });
    };
    CourseListComponent.prototype.studyCourse = function (course, member) {
        this.router.navigate(['/lms/courses/study', course.id, member.id]);
    };
    CourseListComponent.prototype.withdrawCourse = function (course, member) {
        var _this = this;
        this.confirm('Are you sure to proceed ?', function () {
            member.status = 'withdraw';
            member.save(_this).subscribe(function () {
                _this.lmsProfileService.invalidateAll();
            });
        });
    };
    CourseListComponent.prototype.viewCourse = function (course) {
        this.router.navigate(['/lms/courses/view', course.id]);
    };
    CourseListComponent.prototype.editSyllabus = function (course, member) {
        this.router.navigate(['/lms/courses/edit', course.id, member.id]);
    };
    CourseListComponent.prototype.publishCourse = function (course) {
        this.publisiDialog.show(course);
    };
    CourseListComponent.prototype.manageCourse = function (course, member) {
        this.router.navigate(['/lms/courses/manage', course.id, member.id]);
    };
    CourseListComponent.prototype.filterCourse = function () {
        var _this = this;
        if (!this.keyword)
            return;
        this.keyword = this.keyword.trim();
        if (this.keyword.length == 0)
            this.filteredCourses = this.courses;
        else {
            var keyword = this.keyword.toLowerCase();
            this.filteredCourses = _.filter(this.courses, function (course) {
                return course.name.toLowerCase().includes(_this.keyword)
                    || course.summary.toLowerCase().includes(_this.keyword)
                    || course.code.toLowerCase().includes(_this.keyword)
                    || course.description.toLowerCase().includes(_this.keyword);
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CourseListComponent.prototype, "keyword", void 0);
    __decorate([
        core_1.ViewChild(course_syllabus_dialog_component_1.CourseSyllabusDialog),
        __metadata("design:type", course_syllabus_dialog_component_1.CourseSyllabusDialog)
    ], CourseListComponent.prototype, "syllabusDialog", void 0);
    __decorate([
        core_1.ViewChild(course_publish_dialog_component_1.CoursePublishDialog),
        __metadata("design:type", course_publish_dialog_component_1.CoursePublishDialog)
    ], CourseListComponent.prototype, "publisiDialog", void 0);
    CourseListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-course-list',
            template: "<style> ul {     list-style-type: none;     padding-left: 0px; }  .vertical {     vertical-align: middle; } </style> <div class=\"card card-w-title ui-g\">     <div class=\"ui-lg-12 ui-md-12 ui-g-12\">         <div class=\"ui-lg-6 ui-md-6 ui-g-12\">             <h1>{{'My courses'|translate}}</h1>         </div>         <div class=\"search ui-lg-6 ui-md-6 ui-g-12\">             <div class=\"ui-inputgroup fRight\">                 <input type=\"text\" pInputText (input)=\"filterCourse()\" placeholder=\"{{'Keyword'|translate}}\" name=\"keywordInput\" [(ngModel)]=\"keyword\">             </div>         </div>     </div>     <div class=\"clearfix\"></div>     <div class=\"ui-lg-12 ui-md-12 ui-g-12\">         <p-dataList [value]=\"filteredCourses\" [paginator]=\"true\" [rows]=\"5\" styleClass=\"lms-course-list\">             <ng-template let-course pTemplate=\"item\">                 <p-card styleClass=\"lms-course-list-item\">                     <div class=\"ui-g\">                         <div class=\"ui-lg-9 ui-md-12 ui-g-12\">                             <div class=\"ui-lg-12 ui-g-12 border\">                                 <button pButton type=\"button\" icon=\"ui-icon-arrow-forward\" title=\"{{'Join'| translate}}\" label=\"{{'Join'|translate}}\" class=\"mr4 green-btn\" (click)=\"studyCourse(course, course.student)\" *ngIf=\"course.student!=null\" [disabled]=\"! course.IsAvailable || course.student.status!='active'\"></button>                                 <button pButton type=\"button\" icon=\"ui-icon-exit-to-app\" title=\"{{'Withdraw'| translate}}\" label=\"{{'Withdraw'|translate}}\" class=\"mr4 red-btn\" (click)=\"withdrawCourse(course, course.student)\" *ngIf=\"course.student!=null\" [disabled]=\"! course.IsAvailable || course.student.status!='active'\"></button>                                 <button pButton type=\"button\" icon=\"ui-icon-visibility\" title=\"{{'View'| translate}}\" label=\"{{'View'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"viewCourse(course)\" *ngIf=\"course.teacher!=null\" ></button>                                 <button pButton type=\"button\" icon=\"ui-icon-publish\" title=\"{{'Publish'| translate}}\" label=\"{{'Publish'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"publishCourse(course)\" *ngIf=\"course.supervisor!=null\" ></button>                                 <button pButton type=\"button\" icon=\"ui-icon-edit\" title=\"{{'Edit course'| translate}}\" label=\"{{'Edit'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"editSyllabus(course,course.editor!)\" *ngIf=\"course.editor!=null\"></button>                                 <button pButton type=\"button\" icon=\"ui-icon-supervisor-account\" title=\"{{'Manage course'| translate}}\" label=\"{{'Manage'|translate}}\" class=\"mr4 orange-btn\" (click)=\"manageCourse(course, course.teacher)\" *ngIf=\"course.teacher !=null \"[disabled]=\"!course.IsAvailable\"></button>                             </div>                             <div class=\"ui-lg-3 ui-md-4 ui-g-12\">                                 <span class=\"profile-image-wrapper\">                                     <img [src]='course.logo | imageBase64' [ngClass]=\"{'display-none' : !course.logo}\"  />                                     <img *ngIf=\"!course.logo\" src=\"assets/images/logo/logo-course.jpg\">                                 </span>                             </div>                             <div class=\"ui-lg-5 ui-md-8 ui-g-12\">                                 <h4 class=\"heading-course\"><span>{{course.name}}</span></h4>                                 <span class=\"c-status\">{{COURSE_STATUS[course.status]|translate}}</span>                                 <div class=\"clearfix\"></div>                                 <p-accordion styleClass=\"cont\">                                     <p-accordionTab header=\"{{'Summary' | translate}}\">                                         {{course.summary}}                                     </p-accordionTab>                                     <p-accordionTab header=\"{{'Description' | translate}}\">                                         <p [innerHTML]=\"course.description\"></p>                                     </p-accordionTab>                                 </p-accordion>                             </div>                             <!--div class=\"ui-lg-4 ui-md-12 ui-g-12\">                                 <div class=\"status-bars\" *ngIf=\"course.teacher !=null && course.mode=='group'\">                                     <ul>                                         <li>                                             <div class=\"status-bar status-bar-2\">                                                 <div class=\"status-bar-value\" style=\"width:{{course.courseMemberData.percentage_member_registered}}%\">{{course.courseMemberData.percentage_member_registered}}%</div>                                             </div>                                             <i class=\"material-icons\">&#xE86C;</i>                                             <span>{{'Registered'|translate}}</span>                                         </li>                                         <li>                                             <div class=\"status-bar status-bar-3\">                                                 <div class=\"status-bar-value\" style=\"width:{{course.courseMemberData.percentage_member_inprogress}}%\">{{course.courseMemberData.percentage_member_inprogress}}%</div>                                             </div>                                             <i class=\"material-icons\">&#xE868;</i>                                             <span>{{'In-progress'|translate}}</span>                                         </li>                                         <li>                                             <div class=\"status-bar status-bar-4\">                                                 <div class=\"status-bar-value\" style=\"width:{{course.courseMemberData.percentage_member_completed}}%\">{{course.courseMemberData.percentage_member_completed}}</div>                                             </div>                                             <i class=\"material-icons\">&#xE8B2;</i>                                             <span>{{'Completed'|translate}}</span>                                         </li>                                     </ul>                                                                      </div>                           </div> -->                         </div>                         <div class=\"ui-lg-3 ui-md-12 ui-g-12\">                             <p-card styleClass=\"lms-course-detail\">                                 <ul class=\"list-cmt\">                                     <li class=\"clearfix\" *ngIf=\"!course.IsAvailable\">                                             <i class=\"material-icons\">error</i>                                             <span class=\"cmt-title\">{{'Course not available'|translate}}</span>                                         </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">toys</i>                                         <span class=\"cmt-title\">{{'Code'|translate}}</span>                                         <span class=\"cmt-detail\">{{course.code}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">invert_colors</i>                                         <span class=\"cmt-title\">{{'Mode'|translate}}</span>                                         <span class=\"cmt-detail\">{{COURSE_MODE[course.mode]|translate}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">layers</i>                                         <span class=\"cmt-title\">{{'Number of unit'|translate}}</span>                                         <span class=\"cmt-detail\">{{course.unit_count}}</span>                                     </li>                                     <li class=\"clearfix\" style=\"border-bottom: none;\">                                         <i class=\"material-icons\">toc</i>                                         <span class=\"cmt-title\">{{'Group'|translate}}</span>                                         <span class=\"cmt-detail\">{{course.group_id__DESC__}}</span>                                     </li>                                                                      </ul>                             </p-card>                         </div>                     </div>                 </p-card>             </ng-template>         </p-dataList>         <course-syllabus-dialog></course-syllabus-dialog>         <course-publish-dialog></course-publish-dialog>     </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#283593;float:right}.c-title{font-size:15px}.c-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}.profile-image-wrapper img{width:100%;border:1px solid #dbdbdb}.border{border-bottom:1px solid #dbdbdb}.heading-course{font-weight:600;color:#192fa9;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 0}.display-none{display:none}.search input{border:1px solid #bdbdbd;width:360px;border-bottom-left-radius:3px;border-top-left-radius:3px;border-radius:3px;height:30px}.search button{border-bottom-left-radius:0;border-top-left-radius:0}@media screen and (max-width:500px){.search input{width:280px;margin-right:20px}}"],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CourseListComponent);
    return CourseListComponent;
}(base_component_1.BaseComponent));
exports.CourseListComponent = CourseListComponent;
