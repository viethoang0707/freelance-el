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
var achievement_model_1 = require("../../../shared/models/elearning/achievement.model");
var base_model_1 = require("../../../shared/models/base.model");
var CourseRecommendComponent = (function (_super) {
    __extends(CourseRecommendComponent, _super);
    function CourseRecommendComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.courses = [];
        return _this;
    }
    CourseRecommendComponent.prototype.ngOnInit = function () {
        this.courses = [];
        this.searchRecommendCourse();
    };
    CourseRecommendComponent.prototype.searchRecommendCourse = function () {
        var _this = this;
        this.courses = [];
        var domain = "('status','=','published')";
        achievement_model_1.Achivement.listByUser(this, this.ContextUser.id).subscribe(function (skills) {
            var apiList = _.map(skills, function (skill) {
                return course_model_1.Course.__api__listByCompetency(skill.competency_id);
            });
            base_model_1.BaseModel.bulk_search.apply(base_model_1.BaseModel, [_this].concat(apiList)).map(function (jsonArr) {
                return _.flatten(jsonArr);
            })
                .subscribe(function (jsonArr) {
                _this.courses = course_model_1.Course.toArray(jsonArr);
            });
        });
    };
    CourseRecommendComponent.prototype.sendEnrollmentRequest = function (course) {
    };
    CourseRecommendComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-course-recommend',
            template: "<div class=\"card card-w-title\">     <h1>{{'Recommended Courses'|translate}}</h1>     <p-dataScroller [value]=\"courses\" [rows]=\"10\" styleClass=\"lms-course-list\">         <ng-template let-course pTemplate=\"item\">             <p-card styleClass=\"lms-course-list-item\">                 <div class=\"ui-g\">                     <div class=\"ui-g-8\">                         <div class=\"ui-g-12 border\">                             <button pButton type=\"button\" icon=\"ui-icon-send\" title=\"{{'Send enrollment request'| translate}}\" label=\"{{'Send enrollment request'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"sendEnrollmentRequest(course)\"></button>                         </div>                         <div class=\"ui-g-3\">                             <span class=\"profile-image-wrapper\">                 <img [src]='course.logo | imageBase64' [ngClass]=\"{'display-none' : !course.logo}\"  />                 <img *ngIf=\"!course.logo\" src=\"assets/images/logo/logo-course.jpg\">               </span>                         </div>                         <div class=\"ui-g-9\">                             <h4 class=\"heading-course\">                 <span>{{course.name}}</span>               </h4>                             <span class=\"c-status\">                 {{CONTENT_STATUS[course.status]|translate}}               </span>                             <div class=\"clearfix\"></div>                             <p-accordion styleClass=\"cont\">                                 <p-accordionTab header=\"{{'Summary' | translate}}\">                                     {{course.summary}}                                 </p-accordionTab>                                 <p-accordionTab header=\"{{'Description' | translate}}\">                                     <p [innerHTML]=\"course.description\"></p>                                 </p-accordionTab>                             </p-accordion>                         </div>                     </div>                     <div class=\"ui-g-4\">                         <p-card styleClass=\"lms-course-detail\">                             <ul class=\"list-cmt\">                                 <li class=\"clearfix\">                                     <i class=\"material-icons\">toys</i>                                     <span class=\"cmt-title\">{{'Code'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.code}}</span>                                 </li>                                 <li class=\"clearfix\">                                     <i class=\"material-icons\">copyright</i>                                     <span class=\"cmt-title\">{{'Author'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.author_name}}</span>                                 </li>                                 <li class=\"clearfix\">                                     <i class=\"material-icons\">invert_colors</i>                                     <span class=\"cmt-title\">{{'Mode'|translate}}</span>                                     <span class=\"cmt-detail\">{{COURSE_MODE[course.mode]|translate}}</span>                                 </li>                                 <li class=\"clearfix\">                                     <i class=\"material-icons\">layers</i>                                     <span class=\"cmt-title\">{{'Number of unit'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.unit_count}}</span>                                 </li>                                 <li class=\"clearfix\" style=\"border-bottom: none;\">                                     <i class=\"material-icons\">toc</i>                                     <span class=\"cmt-title\">{{'Group'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.group_id__DESC__}}</span>                                 </li>                             </ul>                         </p-card>                     </div>                 </div>             </p-card>         </ng-template>     </p-dataScroller> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#283593;float:right}.c-title{font-size:15px}.c-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}.profile-image-wrapper img{width:100%;border:1px solid #dbdbdb}.border{border-bottom:1px solid #dbdbdb}.heading-course{font-weight:600;color:#192fa9;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 0}.display-none{display:none}"],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], CourseRecommendComponent);
    return CourseRecommendComponent;
}(base_component_1.BaseComponent));
exports.CourseRecommendComponent = CourseRecommendComponent;
