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
var base_component_1 = require("../../../../shared/components/base/base.component");
var user_model_1 = require("../../../../shared/models/elearning/user.model");
var constants_1 = require("../../../../shared/models/constants");
var report_decorator_1 = require("../../report.decorator");
var select_group_dialog_component_1 = require("../../../../shared/components/select-group-dialog/select-group-dialog.component");
var select_user_dialog_component_1 = require("../../../../shared/components/select-user-dialog/select-user-dialog.component");
var course_by_member_report_component_1 = require("./course-by-member-report.component");
var CourseByMemberReportContainerComponent = (function (_super) {
    __extends(CourseByMemberReportContainerComponent, _super);
    function CourseByMemberReportContainerComponent() {
        var _this = _super.call(this) || this;
        _this.GROUP_CATEGORY = constants_1.GROUP_CATEGORY;
        return _this;
    }
    CourseByMemberReportContainerComponent.prototype.export = function () {
        this.courseReport.export();
    };
    CourseByMemberReportContainerComponent.prototype.selectUserGroup = function () {
        var _this = this;
        this.groupDialog.show();
        this.groupDialog.onSelectGroup.first().subscribe(function (group) {
            user_model_1.User.listByGroup(_this, group.id).subscribe(function (users) {
                _this.courseReport.clear();
                _this.courseReport.render(users);
            });
        });
    };
    CourseByMemberReportContainerComponent.prototype.selectIndividualUsers = function () {
        var _this = this;
        this.userDialog.show();
        this.userDialog.onSelectUsers.first().subscribe(function (users) {
            _this.courseReport.clear();
            _this.courseReport.render(users);
        });
    };
    __decorate([
        core_1.ViewChild(select_group_dialog_component_1.SelectGroupDialog),
        __metadata("design:type", select_group_dialog_component_1.SelectGroupDialog)
    ], CourseByMemberReportContainerComponent.prototype, "groupDialog", void 0);
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], CourseByMemberReportContainerComponent.prototype, "userDialog", void 0);
    __decorate([
        core_1.ViewChild(course_by_member_report_component_1.CourseByMemberReportComponent),
        __metadata("design:type", course_by_member_report_component_1.CourseByMemberReportComponent)
    ], CourseByMemberReportContainerComponent.prototype, "courseReport", void 0);
    CourseByMemberReportContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-by-member-report-container',
            template: "<div class=\"ui-g content\">     <div class=\"ui-g-12\">         <p-toolbar>             <div class=\"ui-toolbar-group-left\">                 <button pButton type=\"button\" label=\"{{'Select user group'|translate}}\" icon=\"ui-icon-open-in-browser\" class=\"green-btn\"                     (click)=\"selectUserGroup()\"></button>                 <button pButton type=\"button\" label=\"{{'Select individual users'|translate}}\" icon=\"ui-icon-open-in-browser\" class=\"green-btn\"                     (click)=\"selectIndividualUsers()\"></button>             </div>             <div class=\"ui-toolbar-group-right\">                 <button pButton type=\"button\" label=\"{{'Export'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-file-download\" (click)=\"export()\"></button>             </div>         </p-toolbar>         <course-by-member-report></course-by-member-report>         <select-user-dialog></select-user-dialog>         <select-group-dialog [category]=\"GROUP_CATEGORY.USER\"></select-group-dialog>     </div> </div>",
        }),
        report_decorator_1.Report({
            title: 'Course by member report',
            category: constants_1.REPORT_CATEGORY.COURSE
        }),
        __metadata("design:paramtypes", [])
    ], CourseByMemberReportContainerComponent);
    return CourseByMemberReportContainerComponent;
}(base_component_1.BaseComponent));
exports.CourseByMemberReportContainerComponent = CourseByMemberReportContainerComponent;
