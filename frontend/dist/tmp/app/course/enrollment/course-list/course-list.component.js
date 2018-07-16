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
var class_list_dialog_component_1 = require("../class-list/class-list-dialog.component");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var CourseEnrollmentListComponent = (function (_super) {
    __extends(CourseEnrollmentListComponent, _super);
    function CourseEnrollmentListComponent() {
        var _this = _super.call(this) || this;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.COURSE_STATUS = constants_1.COURSE_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    CourseEnrollmentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadCourses();
    };
    CourseEnrollmentListComponent.prototype.enrollCourse = function () {
        if (this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error(this.translateService.instant('You do not have enroll permission for this course'));
            return;
        }
        if (this.selectedCourse.mode == 'self-study')
            this.courseEnrollDialog.enrollCourse(this.selectedCourse);
        else if (this.selectedCourse.mode == 'group')
            this.classListDialog.show(this.selectedCourse);
    };
    CourseEnrollmentListComponent.prototype.loadCourses = function () {
        var _this = this;
        course_model_1.Course.allForEnroll(this).subscribe(function (courses) {
            _this.courses = courses;
            _this.displayCourses = courses;
            _this.displayCourses.sort(function (course1, course2) {
                return (course2.id - course1.id);
            });
        });
    };
    CourseEnrollmentListComponent.prototype.filterCourse = function () {
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
    CourseEnrollmentListComponent.prototype.closeCourse = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have close permission for this class');
            return;
        }
        this.confirm('Are you sure to proceed ? You will not be able to add new class after the course is closed', function () {
            _this.selectedCourse.close(_this).subscribe(function () {
                _this.selectedCourse.status = 'closed';
                _this.success('Class close');
            });
        });
    };
    CourseEnrollmentListComponent.prototype.openCourse = function () {
        var _this = this;
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedCourse.supervisor_id) {
            this.error('You do not have open permission for this class');
            return;
        }
        this.confirm('Are you sure to proceed ?.', function () {
            _this.selectedCourse.open(_this).subscribe(function () {
                _this.selectedCourse.status = 'open';
                _this.success('Class close');
            });
        });
    };
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.CourseEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.CourseEnrollDialog)
    ], CourseEnrollmentListComponent.prototype, "courseEnrollDialog", void 0);
    __decorate([
        core_1.ViewChild(class_list_dialog_component_1.ClassListDialog),
        __metadata("design:type", class_list_dialog_component_1.ClassListDialog)
    ], CourseEnrollmentListComponent.prototype, "classListDialog", void 0);
    CourseEnrollmentListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-enrollment-list',
            template: "<div class=\"card card-w-title\">     <h1>{{'Enrollment'|translate}}</h1>     <div class=\"ui-g\">         <div class=\"ui-g-12\">             <label>{{'Course group'|translate}}</label>             <p-tree [value]=\"tree\" selectionMode=\"checkbox\" [(selection)]=\"selectedGroupNodes\" (onNodeSelect)=\"filterCourse()\" (onNodeUnselect)=\"filterCourse()\" styleClass=\"width-tree\"></p-tree>         </div>         <div class=\"ui-g-12\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{'Enroll'|translate}}\" class=\"green-btn\" icon=\"ui-icon-people\" (click)=\"enrollCourse()\" *ngIf=\"selectedCourse && selectedCourse.IsAvailable\"></button>                     <button pButton type=\"button \" label=\"{{ 'Open'|translate}} \" class=\"green-btn \" icon=\"ui-icon-lock-open\" (click)=\"openCourse() \" [disabled]=\" selectedCourse && selectedCourse.status=='open'\"></button>                     <button pButton type=\"button \" label=\"{{ 'Close'|translate}} \" class=\"orange-btn \" icon=\"ui-icon-lock\" (click)=\"closeCourse() \" [disabled]=\" selectedCourse && selectedCourse.status=='closed'\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                     <span class=\"md-inputfield search\">               <input type=\"text\" pInputText placeholder=\"{{'Search'|translate}}\"                (input)=\"courseTable.filterGlobal($event.target.value, 'contains')\">                  <i class=\"fa fa-search\"></i>                 </span>                 </div>             </p-toolbar>             <p-table #totalRecords #courseTable [value]=\"displayCourses\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedCourse\" [responsive]=\"true\" [globalFilterFields]=\"['name', 'code']\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th style=\"width: 10%;\" [pSortableColumn]=\"'code'\">                             {{'Code'|translate}}                             <p-sortIcon [field]=\"'code'\"></p-sortIcon>                         </th>                         <th style=\"width: 12%;\" [pSortableColumn]=\"'mode'\">                             {{'Mode'|translate}}                             <p-sortIcon [field]=\"'mode'\"></p-sortIcon>                         </th>                         <th style=\"width: 10%;\" [pSortableColumn]=\"'status'\">                             {{'Status'|translate}}                             <p-sortIcon [field]=\"'status'\"></p-sortIcon>                         </th>                         <th style=\"width: 10%;\" [pSortableColumn]=\"'review_state'\">                             {{'Reviewed'|translate}}                             <p-sortIcon [field]=\"'review_state'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'supervisor_name'\">                             {{'Supervisor'|translate}}                             <p-sortIcon [field]=\"'supervisor_name'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'create_date'\">                             {{'Created'|translate}}                             <p-sortIcon [field]=\"'create_date'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'write_date'\">                             {{'Updated'|translate}}                             <p-sortIcon [field]=\"'write_date'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-course>                     <tr [pSelectableRow]=\"course\">                         <td style=\"text-align: left;\">{{course.name}}</td>                         <td class=\"showformb\">{{course.code}}</td>                         <td class=\"showformb\">{{COURSE_MODE[course.mode] | translate}}</td>                         <td class=\"showformb\">{{COURSE_STATUS[course.status] | translate}}</td>                         <td class=\"showformb\">{{REVIEW_STATE[course.review_state] | translate}}</td>                         <td class=\"showformb\">{{course.supervisor_name}}</td>                         <td>{{course.create_date | date : \"dd/MM/yyyy \"}}</td>                         <td>{{course.write_date | date : \"dd/MM/yyyy \"}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{displayCourses?.length}}                 </ng-template>             </p-table>             <class-list-dialog></class-list-dialog>             <course-enrollment-dialog></course-enrollment-dialog>         </div>     </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.search input{color:#fff;padding:6px 24px 6px 6px}.search i{position:absolute;right:0;top:0;color:#e8eaf6;font-size:28px}.c-summary{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"],
        }),
        __metadata("design:paramtypes", [])
    ], CourseEnrollmentListComponent);
    return CourseEnrollmentListComponent;
}(base_component_1.BaseComponent));
exports.CourseEnrollmentListComponent = CourseEnrollmentListComponent;
