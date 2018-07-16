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
var course_model_1 = require("../../../shared/models/elearning/course.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_faq_dialog_component_1 = require("../course-faq/course-faq.dialog.component");
var course_material_dialog_component_1 = require("../course-material/course-material.dialog.component");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var unit_container_directive_1 = require("../../../cms/course/course-unit-template/unit-container.directive");
var CourseViewComponent = (function (_super) {
    __extends(CourseViewComponent, _super);
    function CourseViewComponent(router, route, componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.CONTENT_STATUS = constants_1.CONTENT_STATUS;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.course = new course_model_1.Course();
        return _this;
    }
    CourseViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var courseId = +params['courseId'];
            _this.lmsProfileService.init(_this).subscribe(function () {
                _this.lmsProfileService.getCourseContent(courseId).subscribe(function (content) {
                    _this.syl = content["syllabus"];
                    _this.faqs = content["faqs"];
                    _this.materials = content["materials"];
                    _this.units = content["units"];
                    _this.displayCouseSyllabus();
                });
            });
        });
    };
    CourseViewComponent.prototype.displayCouseSyllabus = function () {
        this.units = _.filter(this.units, function (unit) {
            return unit.status == 'published';
        });
        this.tree = this.sylUtils.buildGroupTree(this.units);
        this.treeList = this.sylUtils.flattenTree(this.tree);
        if (this.syl.status != 'published')
            this.warn('Cours syllabus is not published');
    };
    CourseViewComponent.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.selectedUnit = this.selectedNode.data;
            this.unloadCurrentUnit();
        }
    };
    CourseViewComponent.prototype.unloadCurrentUnit = function () {
        var viewContainerRef = this.unitHost.viewContainerRef;
        if (viewContainerRef)
            viewContainerRef.clear();
    };
    CourseViewComponent.prototype.prevUnit = function () {
        if (this.selectedUnit) {
            var prevUnit = this.computedPrevUnit(this.selectedUnit.id);
            this.selectedNode = this.sylUtils.findTreeNode(this.tree, prevUnit.id);
            this.selectedUnit = this.selectedNode.data;
            this.unloadCurrentUnit();
        }
    };
    CourseViewComponent.prototype.nextUnit = function () {
        if (this.selectedUnit) {
            var nextUnit = this.computedNextUnit(this.selectedUnit.id);
            this.selectedNode = this.sylUtils.findTreeNode(this.tree, nextUnit.id);
            this.selectedUnit = this.selectedNode.data;
            this.unloadCurrentUnit();
        }
    };
    CourseViewComponent.prototype.computedPrevUnit = function (currentUnitId) {
        var currentNodeIndex = 0;
        for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.id == currentUnitId)
                break;
        }
        currentNodeIndex--;
        while (currentNodeIndex >= 0) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.type != 'folder')
                break;
            currentNodeIndex--;
        }
        return (currentNodeIndex >= 0 ? this.treeList[currentNodeIndex].data : null);
    };
    CourseViewComponent.prototype.computedNextUnit = function (currentUnitId) {
        var currentNodeIndex = 0;
        for (; currentNodeIndex < this.treeList.length; currentNodeIndex++) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.id == currentUnitId)
                break;
        }
        currentNodeIndex++;
        while (currentNodeIndex < this.treeList.length) {
            var node = this.treeList[currentNodeIndex];
            if (node.data.type != 'folder')
                break;
            currentNodeIndex++;
        }
        return (currentNodeIndex < this.treeList.length ? this.treeList[currentNodeIndex].data : null);
    };
    __decorate([
        core_1.ViewChild(course_material_dialog_component_1.CourseMaterialDialog),
        __metadata("design:type", course_material_dialog_component_1.CourseMaterialDialog)
    ], CourseViewComponent.prototype, "materialDialog", void 0);
    __decorate([
        core_1.ViewChild(course_faq_dialog_component_1.CourseFaqDialog),
        __metadata("design:type", course_faq_dialog_component_1.CourseFaqDialog)
    ], CourseViewComponent.prototype, "faqDialog", void 0);
    __decorate([
        core_1.ViewChild(unit_container_directive_1.CourseUnitContainerDirective),
        __metadata("design:type", unit_container_directive_1.CourseUnitContainerDirective)
    ], CourseViewComponent.prototype, "unitHost", void 0);
    CourseViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-view',
            template: "<div class=\"card card-w-title ui-g\">     <div class=\"ui-g-12 ui-lg-12\"><h1>{{'Course'|translate}}: {{course.name}} </h1></div>     <div class=\"ui-g-12 ui-lg-12\">         <p-tabView [style]=\"{width: '100%', height: '600px'}\">             <p-tabPanel header=\"{{'Course info'|translate}}\" leftIcon=\"ui-icon-info\">                  <div class=\"ui-g\">                     <div class=\"ui-lg-8 ui-g-12\">                         <div class=\"ui-lg-4 ui-g-12\">                             <span class=\"profile-image-wrapper\">                               <img [src]='course.logo | imageBase64' [ngClass]=\"{'display-none' : !course.logo}\"  />                               <img *ngIf=\"!course.logo\" src=\"assets/images/logo/logo-course.jpg\">                             </span>                         </div>                         <div class=\"ui-lg-8 ui-g-12\">                             <h3 class=\"heading-course\">                                 <span>{{course.name}}</span>                             </h3>                             <span class=\"c-status\">                                 {{CONTENT_STATUS[course.status]|translate}}                             </span>                             <div class=\"clearfix\"></div>                             <h4 class=\"summary\"><i class=\"material-icons\">keyboard_arrow_right</i>{{'Summary'|translate}}</h4>                             <p>{{course.summary}}</p>                             <h4 class=\"summary\"><i class=\"material-icons\">keyboard_arrow_right</i>{{'Description'|translate}}</h4>                             <p [innerHTML]=\"course.description\"></p>                         </div>                     </div>                     <div class=\"ui-lg-4 ui-g-12\">                         <p-card styleClass=\"lms-course-detail\">                             <ul class=\"list-cmt\">                                 <li class=\"clearfix\">                                     <i class=\"material-icons\">toys</i>                                     <span class=\"cmt-title\">{{'Code'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.code}}</span>                                 </li>                                 <li class=\"clearfix\">                                     <i class=\"material-icons\">invert_colors</i>                                     <span class=\"cmt-title\">{{'Mode'|translate}}</span>                                     <span class=\"cmt-detail\">{{COURSE_MODE[course.mode]|translate}}</span>                                 </li>                                 <li class=\"clearfix\" >                                     <i class=\"material-icons\">school</i>                                     <span class=\"cmt-title\">{{'Prequisite'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.prequisite_course_name}}</span>                                 </li>                                 <li class=\"clearfix\" >                                     <i class=\"material-icons\">grade</i>                                     <span class=\"cmt-title\">{{'Acquired competency'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.competency_name}}</span>                                 </li>                                 <li class=\"clearfix\" >                                     <i class=\"material-icons\">grade</i>                                     <span class=\"cmt-title\">{{'Acquired competency level'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.competency_level_name}}</span>                                 </li>                                 <li class=\"clearfix\" >                                     <i class=\"material-icons\">toc</i>                                     <span class=\"cmt-title\">{{'Group'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.group_id__DESC__}}</span>                                 </li>                                                                   <li class=\"clearfix\" style=\"border-bottom: none;\">                                     <i class=\"material-icons\">date_range</i>                                     <span class=\"cmt-title\">{{'Create date'|translate}}</span>                                     <span class=\"cmt-detail\">{{course.create_date | date : \"dd/MM/yyyy\"}}</span>                                 </li>                             </ul>                         </p-card>                     </div>                 </div>             </p-tabPanel>             <p-tabPanel header=\"{{'Course syllabus'|translate}}\" leftIcon=\"ui-icon-dehaze\">                 <div class=\"ui-g-12\">                     <div class=\"ui-g-3 course-study-tree\">                         <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\" styleClass=\"tree-unit-course-study\"></p-tree>                     </div>                     <div class=\"ui-g-9\" *ngIf=\"selectedUnit\">                         <div class=\"card course-study-unit\">                             <div class=\"image-box-content\">                                 <div class=\"fLeft\">                                     <h3 class=\"removeMT mb5\">{{selectedUnit.name}}</h3>                                     <span>{{'Unit type'|translate}} : {{COURSE_UNIT_TYPE[selectedUnit.type] |translate }}</span>                                 </div>                                 <div class=\"image-box-footer fRight\">                                     <button pButton type=\"button\" icon=\"ui-icon-navigate-before\" title=\"{{'Previous'|translate}}\" label=\"{{'Previous'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"prevUnit()\"></button>                                     <button pButton type=\"button\" icon=\"ui-icon-navigate-next\" title=\"{{'Next'|translate}}\" label=\"{{'Next'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"nextUnit()\"></button>                                 </div>                                 <div class=\"clearfix\"></div>                                 <div>                                     <ng-template course-unit-container></ng-template>                                 </div>                             </div>                         </div>                     </div>                 </div>             </p-tabPanel>             <p-tabPanel header=\"{{'Course material'|translate}}\" leftIcon=\"ui-icon-cloud-download\">                 <div class=\"ui-g-12 ui-md-6 ui-lg-4 task-list\">                     <ul class=\"task-list-container\">                         <li *ngFor=\"let material of materials\">                             <a href=\"{{material.url}}\">                   <span class=\"task-name\">{{material.name}}</span>                 </a>                             <i class=\"material-icons\" *ngIf=\"material.type=='video'\">videocam</i>                             <i class=\"material-icons\" *ngIf=\"material.type=='audio'\">mic</i>                             <i class=\"material-icons\" *ngIf=\"material.type=='file'\">attachment</i>                         </li>                     </ul>                 </div>             </p-tabPanel>             <p-tabPanel header=\"{{'Course FAQ'|translate}}\" leftIcon=\"ui-icon-question-answer\">                 <div class=\"ui-g-12\">                     <p-accordion>                         <p-accordionTab header=\"{{faq.question}}\" [selected]=\"true\" *ngFor=\"let faq of faqs\">                             <div [innerHTML]=\"faq.answer\"></div>                         </p-accordionTab>                     </p-accordion>                 </div>             </p-tabPanel>         </p-tabView>     </div> </div>",
            styles: [".image-box-footer{margin-top:10px;margin-bottom:10px}.course-study-unit{height:528px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#283593;float:right}.c-title{font-size:15px}.c-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}.profile-image-wrapper img{width:100%;border:1px solid #dbdbdb}.border{border-bottom:1px solid #dbdbdb}.heading-course{font-weight:600;color:#192fa9;float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 0}.display-none{display:none}h4.summary{margin-bottom:0;font-size:16px;font-weight:600}"],
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, core_1.ComponentFactoryResolver])
    ], CourseViewComponent);
    return CourseViewComponent;
}(base_component_1.BaseComponent));
exports.CourseViewComponent = CourseViewComponent;
