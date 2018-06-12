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
var common_1 = require("@angular/common");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var log_model_1 = require("../../../shared/models/elearning/log.model");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var time_pipe_1 = require("../../../shared/pipes/time.pipe");
var gradebook_dialog_component_1 = require("../gradebook/gradebook.dialog.component");
var GradebookListDialog = (function (_super) {
    __extends(GradebookListDialog, _super);
    function GradebookListDialog(datePipe, timePipe) {
        var _this = _super.call(this) || this;
        _this.datePipe = datePipe;
        _this.timePipe = timePipe;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.reportUtils = new report_utils_1.ReportUtils();
        _this.viewModes = [
            { value: 'outline', title: 'Outline', icon: 'ui-icon-dehaze' },
            { value: 'detail', title: 'Detail', icon: 'ui-icon-apps' },
        ];
        _this.viewModes = _this.viewModes.map(function (viewMode) {
            return {
                label: viewMode.title,
                value: viewMode.value,
            };
        });
        return _this;
    }
    GradebookListDialog.prototype.ngOnInit = function () {
    };
    GradebookListDialog.prototype.hide = function () {
        this.display = false;
    };
    GradebookListDialog.prototype.viewGradebook = function () {
        if (this.selectedRecord)
            this.gradebookDialog.show(this.selectedRecord);
    };
    GradebookListDialog.prototype.loadMemberStats = function () {
        var _this = this;
        course_member_model_1.CourseMember.listByClass(this, this.courseClass.id).subscribe(function (members) {
            _this.records = _.filter(members, function (member) {
                return member.role == 'student';
            });
            course_syllabus_model_1.CourseSyllabus.byCourse(_this, _this.courseClass.course_id).subscribe(function (syllabus) {
                course_unit_model_1.CourseUnit.listBySyllabus(_this, syllabus.id).subscribe(function (courseUnits) {
                    _this.courseUnits = _.filter(courseUnits, function (unit) {
                        return unit.type != 'folder';
                    });
                    var totalUnit = _this.courseUnits.length;
                    _.each(_this.records, (function (record) {
                        course_certificate_model_1.Certificate.byMember(_this, record["id"]).subscribe(function (certificate) {
                            if (certificate)
                                record["certificate"] = certificate["name"];
                            else
                                record["certificate"] = '';
                        });
                        log_model_1.CourseLog.memberStudyActivity(_this, record["id"], _this.courseClass.id).subscribe(function (logs) {
                            var result = _this.reportUtils.analyzeCourseMemberActivity(logs);
                            if (result[0] != Infinity)
                                record["first_attempt"] = _this.datePipe.transform(result[0], constants_1.EXPORT_DATETIME_FORMAT);
                            if (result[1] != Infinity)
                                record["last_attempt"] = _this.datePipe.transform(result[1], constants_1.EXPORT_DATETIME_FORMAT);
                            record["time_spent"] = _this.timePipe.transform(+result[2], 'min');
                            if (totalUnit)
                                record["completion"] = Math.floor(+result[3] * 100 / +totalUnit);
                            else
                                record["completion"] = 0;
                            record["logs"] = logs;
                        });
                    }));
                });
            });
        });
    };
    GradebookListDialog.prototype.checkUnitComplete = function (record, unit) {
        var log = _.find(record["logs"], function (log) {
            return log.res_model == course_unit_model_1.CourseUnit.Model && log.res_id == unit.id && log.code == 'COMPLETE_COURSE_UNIT';
        });
        if (log)
            return 1;
        else
            return 0;
    };
    GradebookListDialog.prototype.show = function (courseClass) {
        this.display = true;
        this.viewMode = "outline";
        this.courseClass = courseClass;
        this.loadMemberStats();
    };
    __decorate([
        core_1.ViewChild(gradebook_dialog_component_1.GradebookDialog),
        __metadata("design:type", gradebook_dialog_component_1.GradebookDialog)
    ], GradebookListDialog.prototype, "gradebookDialog", void 0);
    GradebookListDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gradebook-list-dialog',
            templateUrl: 'gradebook-list.component.html',
        }),
        __metadata("design:paramtypes", [common_1.DatePipe, time_pipe_1.TimeConvertPipe])
    ], GradebookListDialog);
    return GradebookListDialog;
}(base_component_1.BaseComponent));
exports.GradebookListDialog = GradebookListDialog;
//# sourceMappingURL=gradebook-list.component.js.map