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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var exam_setting_model_1 = require("../../../shared/models/elearning/exam-setting.model");
var ProjectMarkingDialog = (function (_super) {
    __extends(ProjectMarkingDialog, _super);
    function ProjectMarkingDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        _this.member = new course_member_model_1.CourseMember();
        _this.setting = new exam_setting_model_1.ExamSetting();
        return _this;
    }
    ProjectMarkingDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            console.log(object);
            course_member_model_1.CourseMember.get(_this, object.member_id).subscribe(function (member) {
                _this.member = member;
                exam_setting_model_1.ExamSetting.appSetting(_this).subscribe(function (setting) {
                    if (setting)
                        _this.setting = setting;
                });
            });
        });
    };
    ProjectMarkingDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-marking-dialog',
            templateUrl: 'project-marking.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ProjectMarkingDialog);
    return ProjectMarkingDialog;
}(base_dialog_1.BaseDialog));
exports.ProjectMarkingDialog = ProjectMarkingDialog;
//# sourceMappingURL=project-marking.dialog.component.js.map