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
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var constants_1 = require("../../../shared/models/constants");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var class_dialog_component_1 = require("../class-dialog/class-dialog.component");
var ClassListDialog = (function (_super) {
    __extends(ClassListDialog, _super);
    function ClassListDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_MODE = constants_1.COURSE_MODE;
        _this.CLASS_STATUS = constants_1.CLASS_STATUS;
        _this.classes = [];
        _this.teachers = [];
        return _this;
    }
    ClassListDialog.prototype.ngOnInit = function () {
    };
    ClassListDialog.prototype.enroll = function () {
        if (this.selectedClass) {
            this.courseEnrollDialog.enrollClass(this.course, this.selectedClass);
        }
    };
    ClassListDialog.prototype.loadClasses = function () {
        var _this = this;
        course_class_model_1.CourseClass.listByCourse(this, this.course.id).subscribe(function (classes) {
            _this.classes = classes;
        });
    };
    ClassListDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassListDialog.prototype.show = function (course) {
        this.course = course;
        this.display = true;
        this.loadClasses();
    };
    ClassListDialog.prototype.addClass = function () {
        var _this = this;
        var clazz = new course_class_model_1.CourseClass();
        clazz.course_id = this.course.id;
        clazz.course_name = this.course.name;
        this.classDialog.show(clazz);
        this.classDialog.onCreateComplete.subscribe(function () {
            _this.loadClasses();
        });
    };
    ClassListDialog.prototype.editClass = function () {
        this.classDialog.show(this.selectedClass);
    };
    ClassListDialog.prototype.deleteClass = function () {
        var _this = this;
        course_member_model_1.CourseMember.listByClass(this, this.selectedClass.id).subscribe(function (members) {
            if (members.length)
                _this.error(_this.translateService.instant('You cannot delete class with member inside'));
            else
                _this.confirm(_this.translateService.instant('Are you sure to delete?'), function () {
                    _this.selectedClass.delete(_this).subscribe(function () {
                        _this.loadClasses();
                    });
                });
        });
    };
    ClassListDialog.prototype.closeClass = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedClass.supervisor_id) {
            this.error('You do not have close permission for this class.  You will not be able to enroll new members after the class is closed');
            return;
        }
        this.confirm('Are you sure to proceed ?', function () {
            _this.selectedClass.close(_this).subscribe(function () {
                _this.selectedClass.status = 'closed';
                _this.success('Class close');
            });
        });
    };
    ClassListDialog.prototype.openClass = function () {
        var _this = this;
        if (this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedClass.supervisor_id) {
            this.error('You do not have open permission for this class');
            return;
        }
        this.confirm('Are you sure to proceed ?.', function () {
            _this.selectedClass.open(_this).subscribe(function () {
                _this.selectedClass.status = 'open';
                _this.success('Survey open');
            });
        });
    };
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.CourseEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.CourseEnrollDialog)
    ], ClassListDialog.prototype, "courseEnrollDialog", void 0);
    __decorate([
        core_1.ViewChild(class_dialog_component_1.CourseClassDialog),
        __metadata("design:type", class_dialog_component_1.CourseClassDialog)
    ], ClassListDialog.prototype, "classDialog", void 0);
    ClassListDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-list-dialog',
            template: "<p-dialog header=\"{{'Class list'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"1200\" height=\"100%\" [responsive]=\"true\" styleClass=\"class-list-dialog\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">         <div class=\"ui-g-12 \">             <p-toolbar>                 <div class=\"ui-toolbar-group-left \">                     <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addClass()\" icon=\"ui-icon-add\"></button>                     <button pButton type=\"button \" label=\"{{ 'Edit'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-mode-edit \" (click)=\"editClass() \" *ngIf=\"selectedClass\"></button>                     <button pButton type=\"button \" label=\"{{ 'Delete'|translate}} \" class=\"red-btn \" icon=\"ui-icon-delete \" (click)=\"deleteClass() \" *ngIf=\"selectedClass\"></button>                 </div>                 <div class=\"ui-toolbar-group-right \">                     <button pButton type=\"button \" label=\"{{ 'Enroll'|translate}} \" class=\"green-btn \" icon=\"ui-icon-people \" *ngIf=\"selectedClass && selectedClass.IsAvailable\" (click)=\"enroll() \"></button>                     <button pButton type=\"button \" label=\"{{ 'Open'|translate}} \" class=\"green-btn \" icon=\"ui-icon-lock-open\" (click)=\"openClass() \" [disabled]=\" selectedClass && selectedClass.status =='open'\"></button>                     <button pButton type=\"button \" label=\"{{ 'Close'|translate}} \" class=\"orange-btn \" icon=\"ui-icon-lock\" (click)=\"closeClass() \" [disabled]=\" selectedClass && selectedClass.status=='closed'\"></button>                 </div>             </p-toolbar>             <p-table #classTable [value]=\"classes\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedClass\" [responsive]=\"true\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\" 'name' \">                             {{'Name'|translate}}                             <p-sortIcon [field]=\" 'name' \"></p-sortIcon>                         </th>                         <th>                             {{'Course'|translate}}                         </th>                         <th>                             {{'Status'|translate}}                         </th>                         <th [pSortableColumn]=\" 'start' \">                             {{'Start'|translate}}                             <p-sortIcon [field]=\" 'start' \"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\" 'end' \">                             {{'End'|translate}}                             <p-sortIcon [field]=\" 'end' \"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-courseClass>                     <tr [pSelectableRow]=\"courseClass \">                         <td style=\"text-align: left; \">{{courseClass.name}}</td>                         <td style=\"text-align: left; \">{{courseClass.course_name}}</td>                         <td >{{CLASS_STATUS[courseClass.status]}}</td>                         <td>{{courseClass.start | date : \"dd/MM/yyyy \"}}</td>                         <td>{{courseClass.end | date : \"dd/MM/yyyy \"}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{classes?.length}}                 </ng-template>             </p-table>         </div>         <course-enrollment-dialog></course-enrollment-dialog>         <class-dialog></class-dialog>     </p-scrollPanel>     <p-footer>         <button type=\"button \" pButton icon=\"fa-close \" (click)=\"hide() \" label=\"{{ 'Close'|translate}} \"></button>     </p-footer> </p-dialog>",
            styles: [".mrg-bt{margin-bottom:15px}"],
        }),
        __metadata("design:paramtypes", [])
    ], ClassListDialog);
    return ClassListDialog;
}(base_component_1.BaseComponent));
exports.ClassListDialog = ClassListDialog;
