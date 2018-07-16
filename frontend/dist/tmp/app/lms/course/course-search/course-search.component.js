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
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var competency_model_1 = require("../../../shared/models/elearning/competency.model");
var CourseSearchComponent = (function (_super) {
    __extends(CourseSearchComponent, _super);
    function CourseSearchComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.competencies = [];
        _this.courses = [];
        return _this;
    }
    CourseSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.courses = [];
        competency_model_1.Competency.all(this).subscribe(function (competencies) {
            _this.competencies = competencies;
        });
    };
    CourseSearchComponent.prototype.searchCourse = function () {
        var _this = this;
        this.courses = [];
        var domain = "('status','=','open'),('review_state','=','approved')";
        if (this.selectedCompetency)
            domain += ",('competency_id','='," + this.selectedCompetency.id + ")";
        if (this.selfStudyMode && !this.groupStudyMode)
            domain += ",('mode','=','self-study')";
        if (!this.selfStudyMode && this.groupStudyMode)
            domain += ",('mode','=','group')";
        if (this.selfStudyMode && this.groupStudyMode)
            domain += ",'|',('mode','=','self-study'),('mode','=','group')";
        domain = "[" + domain + "]";
        course_model_1.Course.search(this, [], domain).subscribe(function (courses) {
            if (_this.keyword != null && _this.keyword != "")
                courses = _.filter(courses, function (course) {
                    return course.name.includes(_this.keyword)
                        || course.summary.includes(_this.keyword)
                        || course.code.includes(_this.keyword)
                        || course.description.includes(_this.keyword);
                });
            _this.courses = courses;
        });
    };
    CourseSearchComponent.prototype.sendEnrollmentRequest = function (course) {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CourseSearchComponent.prototype, "keyword", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CourseSearchComponent.prototype, "selfStudyMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CourseSearchComponent.prototype, "groupStudyMode", void 0);
    CourseSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-course-search',
            template: "<div class=\"card card-w-title ui-g lms-search-course\">     <div class=\"ui-lg-6 ui-md-12 ui-g-12\"><h1>{{'Search courses'|translate}}</h1></div>     <div class=\"search ui-g-12\">         <div class=\"ui-inputgroup \">             <input type=\"text\" pInputText placeholder=\"Keyword\" name=\"keyword\" [(ngModel)]=\"keyword\">             <button pButton type=\"button\" icon=\"ui-icon-search\" (click)=\"searchCourse()\"></button>         </div>     </div>     <div class=\"ui-lg-3 ui-md-12 ui-g-12\">         <div class=\"ui-lg-12 ui-md-6 ui-g-6 filter-course\">             <p-panel header=\"Advance search\" [toggleable]=\"true\" headerStyleClass=\"filter-course-search\">                 <div class=\"ui-g checkbox-filter\">                     <div class=\"ui-lg-6 ui-md-12 ui-g-12\">                         <p-checkbox name=\"self_study_mode\" value=\"'self-study'\" label=\"{{'Self-study'|translate}}\" [(ngModel)]=\"selfStudyMode\" binary=\"true\"></p-checkbox>                     </div>                     <div class=\"ui-lg-6 ui-md-12 ui-g-12\">                         <p-checkbox name=\"group_mode\" value=\"'group'\" label=\"{{'Group study'|translate}}\" [(ngModel)]=\"groupStudyMode\" binary=\"true\"></p-checkbox>                     </div>                     <div class=\"ui-g-12 checkbox-filter\">                     <p-dropdown [options]=\"competencies\" optionLabel=\"name\" dataKey=\"id\" [(ngModel)]=\"selectedCompetency\" placeholder=\"{{'Select a competency'| translate}}\"></p-dropdown>                 </div>                 </div>             </p-panel>         </div>     </div>     <div class=\"ui-lg-9 ui-md-12 ui-g-12\" *ngIf=\"courses && courses.length\">         <p-dataScroller [value]=\"courses\" [rows]=\"10\" styleClass=\"lms-course-list\">             <ng-template let-course pTemplate=\"item\">                 <p-card styleClass=\"lms-course-list-item\">                     <div class=\"ui-g\">                         <div class=\"ui-lg-8 ui-md-12 ui-g-12\">                             <div class=\"ui-lg-12 ui-md-12 ui-g-12 border\">                                 <button pButton type=\"button\" icon=\"ui-icon-send\" title=\"{{'Send enrollment request'| translate}}\" label=\"{{'Send enrollment request'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"sendEnrollmentRequest(course)\"></button>                             </div>                             <div class=\"ui-lg-3 ui-md-12 ui-g-12\">                                 <span class=\"profile-image-wrapper\">                                     <img [src]='course.logo | imageBase64' [ngClass]=\"{'display-none' : !course.logo}\"  />                                     <img *ngIf=\"!course.logo\" src=\"assets/images/logo/logo-course.jpg\">                                 </span>                             </div>                             <div class=\"ui-lg-9 ui-md-12 ui-g-12\">                                 <h4 class=\"heading-course\">                                 <span>{{course.name}}</span>                                 </h4>                                 <span class=\"c-status\">                                         {{CONTENT_STATUS[course.status]|translate}}                                 </span>                                 <div class=\"clearfix\"></div>                                 <p-accordion styleClass=\"cont\">                                     <p-accordionTab header=\"{{'Summary' | translate}}\">                                         {{course.summary}}                                     </p-accordionTab>                                     <p-accordionTab header=\"{{'Description' | translate}}\">                                         <p [innerHTML]=\"course.description\"></p>                                     </p-accordionTab>                                 </p-accordion>                             </div>                         </div>                         <div class=\"ui-lg-4 ui-md-12 ui-g-12\">                             <p-card styleClass=\"lms-course-detail\">                                 <ul class=\"list-cmt\">                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">toys</i>                                         <span class=\"cmt-title\">{{'Code'|translate}}</span>                                         <span class=\"cmt-detail\">{{course.code}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">copyright</i>                                         <span class=\"cmt-title\">{{'Author'|translate}}</span>                                         <span class=\"cmt-detail\">{{course.author_name}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">invert_colors</i>                                         <span class=\"cmt-title\">{{'Mode'|translate}}</span>                                         <span class=\"cmt-detail\">{{COURSE_MODE[course.mode]|translate}}</span>                                     </li>                                     <li class=\"clearfix\">                                         <i class=\"material-icons\">layers</i>                                         <span class=\"cmt-title\">{{'Number of unit'|translate}}</span>                                         <span class=\"cmt-detail\">{{course.unit_count}}</span>                                     </li>                                     <li class=\"clearfix\" style=\"border-bottom: none;\">                                         <i class=\"material-icons\">toc</i>                                         <span class=\"cmt-title\">{{'Group'|translate}}</span>                                         <span class=\"cmt-detail\">{{course.group_id__DESC__}}</span>                                     </li>                                 </ul>                             </p-card>                         </div>                     </div>                 </p-card>             </ng-template>         </p-dataScroller>     </div> </div>",
            styles: [".search input{border:1px solid #bdbdbd;width:360px;border-bottom-left-radius:3px;border-top-left-radius:3px}@media screen and (max-width:500px){.search input{width:280px}}.search button{border-bottom-left-radius:0;border-top-left-radius:0}h4.title-filter{margin-bottom:10px}.filter{background-color:#f6f6f6}.checkbox-filter{width:250px;margin-bottom:10px}.course-search-item{border:1px solid #d6d1d1;padding:5px}.edit-btn,.manager-btn{float:right}.mrg-bt{margin-bottom:15px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#283593;float:right}.c-title{font-size:15px}.c-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}.profile-image-wrapper img{width:100%;border:1px solid #dbdbdb}.border{border-bottom:1px solid #dbdbdb}.heading-course{font-weight:600;color:#192fa9;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 0}.display-none{display:none}"],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CourseSearchComponent);
    return CourseSearchComponent;
}(base_component_1.BaseComponent));
exports.CourseSearchComponent = CourseSearchComponent;
