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
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var group_model_1 = require("../../../shared/models/elearning/group.model");
var course_dialog_component_1 = require("../course-dialog/course-dialog.component");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var CourseListComponent = (function (_super) {
    __extends(CourseListComponent, _super);
    function CourseListComponent() {
        var _this = _super.call(this) || this;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.COURSE_STATUS = constants_1.COURSE_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    CourseListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadCourses();
    };
    CourseListComponent.prototype.checkDuplicate = function (course) {
        var duplicates = _.filter(this.courses, function (obj) {
            return course.code == obj.code;
        });
        if (duplicates.length >= 2)
            this.warn(this.translateService.instant('There is another course with same code in database'));
    };
    CourseListComponent.prototype.addCourse = function () {
        var _this = this;
        var course = new course_model_1.Course();
        this.courseDialog.show(course);
        this.courseDialog.onCreateComplete.subscribe(function () {
            _this.checkDuplicate(course);
            _this.loadCourses();
        });
    };
    CourseListComponent.prototype.editCourse = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have edit permission for this course');
            return;
        }
        this.courseDialog.show(this.selectedCourse);
        this.courseDialog.onUpdateComplete.subscribe(function () {
            _this.checkDuplicate(_this.selectedCourse);
        });
    };
    CourseListComponent.prototype.requestReview = function () {
        var _this = this;
        if (this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have submit-review permission for this course');
            return;
        }
        this.workflowService.createCourseReviewTicket(this, this.selectedCourse).subscribe(function () {
            _this.success('Request submitted');
            _this.selectedCourse.refresh(_this).subscribe();
        });
    };
    CourseListComponent.prototype.deleteCourse = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have delete permission for this course');
            return;
        }
        this.confirm('Are you sure to delete ?', function () {
            _this.selectedCourse.delete(_this).subscribe(function () {
                _this.loadCourses();
                _this.selectedCourse = null;
            });
        });
    };
    CourseListComponent.prototype.loadCourses = function () {
        var _this = this;
        course_model_1.Course.all(this).subscribe(function (courses) {
            _this.courses = courses;
            _this.displayCourses = courses;
            _this.displayCourses.sort(function (course1, course2) {
                return (course2.id - course1.id);
            });
        });
    };
    CourseListComponent.prototype.filterCourse = function () {
        var _this = this;
        if (this.selectedGroupNodes.length != 0) {
            this.displayCourses = _.filter(this.courses, function (course) {
                var parentGroupNode = _.find(_this.selectedGroupNodes, function (node) {
                    return node.data.id == course.group_id;
                });
                return parentGroupNode != null;
            });
        }
        else {
            this.displayCourses = this.courses;
        }
    };
    __decorate([
        core_1.ViewChild(course_dialog_component_1.CourseDialog),
        __metadata("design:type", course_dialog_component_1.CourseDialog)
    ], CourseListComponent.prototype, "courseDialog", void 0);
    CourseListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-list',
            template: "<div class=\"card card-w-title\">   <h1>{{'Courses'|translate}}</h1>   <div class=\"ui-g\">     <div class=\"ui-g-12\">       <label>{{'Course group'|translate}}</label>       <p-tree [value]=\"tree\" selectionMode=\"checkbox\" [(selection)]=\"selectedGroupNodes\" (onNodeSelect)=\"filterCourse()\" (onNodeUnselect)=\"filterCourse()\" styleClass=\"width-tree\"></p-tree>     </div>     <div class=\"ui-g-12\">       <p-toolbar>         <div class=\"ui-toolbar-group-left\">           <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addCourse()\" icon=\"ui-icon-add\"></button>           <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editCourse()\" *ngIf=\"selectedCourse\"></button>           <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteCourse()\" *ngIf=\"selectedCourse && selectedCourse.status!='published'\"></button>           <button pButton type=\"button\" label=\"{{'Request review'|translate}}\" class=\"purple-btn\" icon=\"ui-icon-rate-revie\" (click)=\"requestReview()\" *ngIf=\"selectedCourse &&  selectedCourse.review_state !='approved'\"></button>         </div>         <div class=\"ui-toolbar-group-right\">           <span class=\"md-inputfield search\">               <input type=\"text\" pInputText placeholder=\"{{'Search'|translate}}\"                (input)=\"courseTable.filterGlobal($event.target.value, 'contains')\">                  <i class=\"fa fa-search\"></i>                 </span>         </div>       </p-toolbar>       <p-table #totalRecords #courseTable [value]=\"displayCourses\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedCourse\" [responsive]=\"true\" [globalFilterFields]=\"['name', 'code']\">         <ng-template pTemplate=\"header\">           <tr>             <th [pSortableColumn]=\"'name'\">               {{'Name'|translate}}               <p-sortIcon [field]=\"'name'\"></p-sortIcon>             </th>             <th style=\"width: 10%;\" [pSortableColumn]=\"'code'\">               {{'Code'|translate}}               <p-sortIcon [field]=\"'code'\"></p-sortIcon>             </th>             <th style=\"width: 12%;\" [pSortableColumn]=\"'mode'\">               {{'Mode'|translate}}               <p-sortIcon [field]=\"'mode'\"></p-sortIcon>             </th>             <th style=\"width: 10%;\" [pSortableColumn]=\"'status'\">               {{'Status'|translate}}               <p-sortIcon [field]=\"'status'\"></p-sortIcon>             </th>              <th style=\"width: 10%;\" [pSortableColumn]=\"'review_state'\">               {{'Reviewed'|translate}}               <p-sortIcon [field]=\"'review_state'\"></p-sortIcon>             </th>             <th [pSortableColumn]=\"'supervisor_name'\">               {{'Supervisor'|translate}}               <p-sortIcon [field]=\"'supervisor_name'\"></p-sortIcon>             </th>             <th [pSortableColumn]=\"'create_date'\">               {{'Created'|translate}}               <p-sortIcon [field]=\"'create_date'\"></p-sortIcon>             </th>             <th [pSortableColumn]=\"'write_date'\">               {{'Updated'|translate}}               <p-sortIcon [field]=\"'write_date'\"></p-sortIcon>             </th>           </tr>         </ng-template>          <ng-template pTemplate=\"body\" let-course>           <tr [pSelectableRow]=\"course\">             <td style=\"text-align: left;\">{{course.name}}</td>             <td class=\"showformb\">{{course.code}}</td>             <td class=\"showformb\">{{COURSE_MODE[course.mode] | translate}}</td>             <td class=\"showformb\">{{COURSE_STATUS[course.status] | translate}}</td>             <td class=\"showformb\">{{REVIEW_STATE[course.review_state] | translate}}</td>             <td class=\"showformb\">{{course.supervisor_name}}</td>             <td>{{course.create_date | date : \"dd/MM/yyyy \"}}</td>               <td>{{course.write_date | date : \"dd/MM/yyyy \"}}</td>           </tr>         </ng-template>          <ng-template pTemplate=\"summary\">           {{'Total records'|translate}} : {{displayCourses?.length}}         </ng-template>       </p-table>       <course-dialog></course-dialog>     </div>   </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.search input{color:#fff;padding:6px 24px 6px 6px}.search i{position:absolute;right:0;top:0;color:#e8eaf6;font-size:28px}.c-summary{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"],
        }),
        __metadata("design:paramtypes", [])
    ], CourseListComponent);
    return CourseListComponent;
}(base_component_1.BaseComponent));
exports.CourseListComponent = CourseListComponent;
