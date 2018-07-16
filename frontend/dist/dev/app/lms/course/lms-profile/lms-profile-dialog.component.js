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
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var certificate_print_dialog_component_1 = require("../../../lms/course/certificate-print/certificate-print.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var achievement_model_1 = require("../../../shared/models/elearning/achievement.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var exam_grade_model_1 = require("../../../shared/models/elearning/exam-grade.model");
var excel_service_1 = require("../../../shared/services/excel.service");
var LMSProfileDialog = (function (_super) {
    __extends(LMSProfileDialog, _super);
    function LMSProfileDialog(excelService) {
        var _this = _super.call(this) || this;
        _this.excelService = excelService;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.EXAM_MEMBER_ENROLL_STATUS = constants_1.EXAM_MEMBER_ENROLL_STATUS;
        _this.courseMembers = [];
        _this.skills = [];
        _this.examMembers = [];
        return _this;
    }
    LMSProfileDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            _this.courseMembers = [];
            _this.skills = [];
            _this.examMembers = [];
            base_model_1.BaseModel
                .bulk_search(_this, course_member_model_1.CourseMember.__api__listByUser(object.user_id), course_certificate_model_1.Certificate.__api__listByUser(object.user_id), achievement_model_1.Achivement.__api__listByUser(object.user_id), exam_member_model_1.ExamMember.__api__listByUser(object.user_id), submission_model_1.Submission.__api__listByUser(object.user_id))
                .subscribe(function (jsonArr) {
                _this.courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[0]);
                _this.certificates = course_certificate_model_1.Certificate.toArray(jsonArr[1]);
                _this.skills = achievement_model_1.Achivement.toArray(jsonArr[2]);
                _this.examMembers = exam_member_model_1.ExamMember.toArray(jsonArr[3]);
                var submits = submission_model_1.Submission.toArray(jsonArr[4]);
                _this.displayExams(submits);
                _this.displayCourseHistory();
                _this.displaySkills();
            });
        });
    };
    LMSProfileDialog.prototype.displayCourseHistory = function () {
        var _this = this;
        this.courseMembers = _.filter(this.courseMembers, function (member) {
            return member.role == 'student';
        });
        _.each(this.courseMembers, function (member) {
            member["certificate"] = _.find(_this.certificates, function (cert) {
                return cert.member_id == member.id;
            });
        });
    };
    LMSProfileDialog.prototype.displaySkills = function () {
        this.skills.sort(function (s1, s2) {
            return s1.date_acquire.getTime() - s2.date_acquire.getTime();
        });
    };
    LMSProfileDialog.prototype.displayExams = function (submits) {
        var _this = this;
        this.examMembers = _.filter(this.examMembers, function (member) {
            return (member.exam_id && member.status == 'active' && member.role == 'candidate');
        });
        this.examMembers.sort(function (member1, member2) {
            return (member1.exam.create_date < member1.exam.create_date);
        });
        var examIds = _.pluck(this.examMembers, 'exam_id');
        exam_grade_model_1.ExamGrade.listByExams(this, examIds).subscribe(function (grades) {
            _.each(_this.examMembers, function (member) {
                var examGrades = _.filter(grades, function (grade) {
                    return grade.exam_id == member.exam_id;
                });
                member["submit"] = _.find(submits, function (submit) {
                    return submit.member_id == member.id && submit.exam_id == member.exam_id;
                });
                if (member["submit"]) {
                    member["score"] = member["submit"].score;
                    member["grade"] = exam_grade_model_1.ExamGrade.gradeScore(examGrades, member["score"]);
                }
                else
                    member["score"] = '';
            });
        });
    };
    LMSProfileDialog.prototype.printCertificate = function (certificate) {
        this.certPrintDialog.show(certificate);
    };
    LMSProfileDialog.prototype.exportCourse = function () {
        var output = _.map(this.courseMembers, function (courseMember) {
            return {
                'Course': courseMember['course_name'], 'Register date': courseMember['date_register'], 'Enrollment status': courseMember['enroll_status'], 'Certificate': courseMember['certificate'] ? 'Yes' : 'No'
            };
        });
        this.excelService.exportAsExcelFile(output, 'course_history_report');
    };
    LMSProfileDialog.prototype.exportExam = function () {
        var output = _.map(this.examMembers, function (examMember) {
            return { 'Exam': examMember['exam_name'], 'Register date': examMember['date_register'], 'Enrollment status': examMember['enroll_status'], 'Grade': examMember['grade'] ? examMember['grade'].name : '' };
        });
        this.excelService.exportAsExcelFile(output, 'exam_history_report');
    };
    LMSProfileDialog.prototype.exportSkill = function () {
        var output = _.map(this.skills, function (skill) {
            return { 'Competency': skill['competency_name'], 'Level': skill['competency_level_name'], 'Date acquired': skill['date_acquire'] };
        });
        this.excelService.exportAsExcelFile(output, 'skill_report');
    };
    __decorate([
        core_1.ViewChild(certificate_print_dialog_component_1.CertificatePrintDialog),
        __metadata("design:type", certificate_print_dialog_component_1.CertificatePrintDialog)
    ], LMSProfileDialog.prototype, "certPrintDialog", void 0);
    LMSProfileDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-profile-dialog',
            templateUrl: 'lms-profile-dialog.component.html',
            styleUrls: ['lms-profile-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], LMSProfileDialog);
    return LMSProfileDialog;
}(base_dialog_1.BaseDialog));
exports.LMSProfileDialog = LMSProfileDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2xtcy1wcm9maWxlL2xtcy1wcm9maWxlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBTXBFLDRGQUFvRjtBQUNwRixzR0FBd0Y7QUFDeEYsMkVBQXlFO0FBRXpFLDhCQUFnQztBQUdoQyw4REFBOEg7QUFDOUgsK0hBQWtIO0FBQ2xILGdFQUE4RDtBQUM5RCx3RkFBZ0Y7QUFDaEYsd0ZBQWdGO0FBQ2hGLHNGQUErRTtBQUMvRSxzRkFBOEU7QUFDOUUsd0VBQXNFO0FBUXRFO0lBQXNDLG9DQUFnQjtJQVlyRCwwQkFBb0IsWUFBMEI7UUFBOUMsWUFDQyxpQkFBTyxTQUlQO1FBTG1CLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBVjlDLGlDQUEyQixHQUFHLHVDQUEyQixDQUFDO1FBQzFELCtCQUF5QixHQUFHLHFDQUF5QixDQUFDO1FBV3JELEtBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDOztJQUN2QixDQUFDO0lBR0QsbUNBQVEsR0FBUjtRQUFBLGlCQXdCQztRQXZCQSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDM0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDakIsS0FBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFdEIsc0JBQVM7aUJBQ1AsV0FBVyxDQUFDLEtBQUksRUFDaEIsa0NBQVksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQzlDLHNDQUFXLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUM3Qyw4QkFBVSxDQUFDLGlCQUFp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QUFDLEVBQUUsQ0FBQztRQUNwSSxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUF6R2tDO1FBQWxDLGdCQUFTLENBQUMsMkRBQXNCLENBQUM7a0NBQWtCLDJEQUFzQjs2REFBQztJQVYvRCxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7U0FDL0MsQ0FBQzt5Q0FhaUMsNEJBQVk7T0FabEMsZ0JBQWdCLENBcUg1QjtJQUFELHVCQUFDO0NBckhELEFBcUhDLENBckhxQyx3QkFBVSxHQXFIL0M7QUFySFksNENBQWdCIiwiZmlsZSI6ImFwcC9sbXMvY291cnNlL2xtcy1wcm9maWxlL2xtcy1wcm9maWxlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IENlcnRpZmljYXRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNlcnRpZmljYXRlLm1vZGVsJztcbmltcG9ydCB7IEJhc2VEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuZGlhbG9nJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRVhBTV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgQ09VUlNFX01FTUJFUl9ST0xFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZVByaW50RGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vbG1zL2NvdXJzZS9jZXJ0aWZpY2F0ZS1wcmludC9jZXJ0aWZpY2F0ZS1wcmludC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBBY2hpdmVtZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYWNoaWV2ZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuaW1wb3J0IHsgRXhjZWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2V4Y2VsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdsbXMtcHJvZmlsZS1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ2xtcy1wcm9maWxlLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydsbXMtcHJvZmlsZS1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBMTVNQcm9maWxlRGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxVc2VyPiB7XG5cblx0Q09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTID0gQ09VUlNFX01FTUJFUl9FTlJPTExfU1RBVFVTO1xuXHRFWEFNX01FTUJFUl9FTlJPTExfU1RBVFVTID0gRVhBTV9NRU1CRVJfRU5ST0xMX1NUQVRVUztcblxuXHRwcml2YXRlIGNvdXJzZU1lbWJlcnM6IENvdXJzZU1lbWJlcltdO1xuXHRwcml2YXRlIGV4YW1NZW1iZXJzOiBFeGFtTWVtYmVyW107XG5cdHByaXZhdGUgY2VydGlmaWNhdGVzOiBDZXJ0aWZpY2F0ZVtdO1xuXHRwcml2YXRlIHNraWxsczogQWNoaXZlbWVudFtdO1xuXG5cdEBWaWV3Q2hpbGQoQ2VydGlmaWNhdGVQcmludERpYWxvZykgY2VydFByaW50RGlhbG9nOiBDZXJ0aWZpY2F0ZVByaW50RGlhbG9nO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZXhjZWxTZXJ2aWNlOiBFeGNlbFNlcnZpY2UpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuY291cnNlTWVtYmVycyA9IFtdO1xuXHRcdHRoaXMuc2tpbGxzID0gW107XG5cdFx0dGhpcy5leGFtTWVtYmVycyA9IFtdO1xuXHR9XG5cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLm9uU2hvdy5zdWJzY3JpYmUob2JqZWN0ID0+IHtcblx0XHRcdHRoaXMuY291cnNlTWVtYmVycyA9IFtdO1xuXHRcdFx0dGhpcy5za2lsbHMgPSBbXTtcblx0XHRcdHRoaXMuZXhhbU1lbWJlcnMgPSBbXTtcblxuXHRcdFx0QmFzZU1vZGVsXG5cdFx0XHRcdC5idWxrX3NlYXJjaCh0aGlzLFxuXHRcdFx0XHRcdENvdXJzZU1lbWJlci5fX2FwaV9fbGlzdEJ5VXNlcihvYmplY3QudXNlcl9pZCksXG5cdFx0XHRcdFx0Q2VydGlmaWNhdGUuX19hcGlfX2xpc3RCeVVzZXIob2JqZWN0LnVzZXJfaWQpLFxuXHRcdFx0XHRcdEFjaGl2ZW1lbnQuX19hcGlfX2xpc3RCeVVzZXIob2JqZWN0LnVzZXJfaWQpLFxuXHRcdFx0XHRcdEV4YW1NZW1iZXIuX19hcGlfX2xpc3RCeVVzZXIob2JqZWN0LnVzZXJfaWQpLFxuXHRcdFx0XHRcdFN1Ym1pc3Npb24uX19hcGlfX2xpc3RCeVVzZXIob2JqZWN0LnVzZXJfaWQpKVxuXHRcdFx0XHQuc3Vic2NyaWJlKChqc29uQXJyKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5jb3Vyc2VNZW1iZXJzID0gQ291cnNlTWVtYmVyLnRvQXJyYXkoanNvbkFyclswXSk7XG5cdFx0XHRcdFx0dGhpcy5jZXJ0aWZpY2F0ZXMgPSBDZXJ0aWZpY2F0ZS50b0FycmF5KGpzb25BcnJbMV0pO1xuXHRcdFx0XHRcdHRoaXMuc2tpbGxzID0gQWNoaXZlbWVudC50b0FycmF5KGpzb25BcnJbMl0pO1xuXHRcdFx0XHRcdHRoaXMuZXhhbU1lbWJlcnMgPSBFeGFtTWVtYmVyLnRvQXJyYXkoanNvbkFyclszXSk7XG5cdFx0XHRcdFx0dmFyIHN1Ym1pdHMgPSBTdWJtaXNzaW9uLnRvQXJyYXkoanNvbkFycls0XSk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5RXhhbXMoc3VibWl0cyk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5Q291cnNlSGlzdG9yeSgpO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheVNraWxscygpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGRpc3BsYXlDb3Vyc2VIaXN0b3J5KCkge1xuXHRcdHRoaXMuY291cnNlTWVtYmVycyA9IF8uZmlsdGVyKHRoaXMuY291cnNlTWVtYmVycywgKG1lbWJlcjogQ291cnNlTWVtYmVyKSA9PiB7XG5cdFx0XHRyZXR1cm4gbWVtYmVyLnJvbGUgPT0gJ3N0dWRlbnQnO1xuXHRcdH0pO1xuXHRcdF8uZWFjaCh0aGlzLmNvdXJzZU1lbWJlcnMsIChtZW1iZXI6IENvdXJzZU1lbWJlcikgPT4ge1xuXHRcdFx0bWVtYmVyW1wiY2VydGlmaWNhdGVcIl0gPSBfLmZpbmQodGhpcy5jZXJ0aWZpY2F0ZXMsIChjZXJ0OiBDZXJ0aWZpY2F0ZSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gY2VydC5tZW1iZXJfaWQgPT0gbWVtYmVyLmlkO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRkaXNwbGF5U2tpbGxzKCkge1xuXHRcdHRoaXMuc2tpbGxzLnNvcnQoKHMxOiBBY2hpdmVtZW50LCBzMjogQWNoaXZlbWVudCkgPT4ge1xuXHRcdFx0cmV0dXJuIHMxLmRhdGVfYWNxdWlyZS5nZXRUaW1lKCkgLSBzMi5kYXRlX2FjcXVpcmUuZ2V0VGltZSgpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHRkaXNwbGF5RXhhbXMoc3VibWl0czogU3VibWlzc2lvbltdKSB7XG5cdFx0dGhpcy5leGFtTWVtYmVycyA9IF8uZmlsdGVyKHRoaXMuZXhhbU1lbWJlcnMsIChtZW1iZXI6IEV4YW1NZW1iZXIpID0+IHtcblx0XHRcdHJldHVybiAobWVtYmVyLmV4YW1faWQgJiYgbWVtYmVyLnN0YXR1cyA9PSAnYWN0aXZlJyAmJiBtZW1iZXIucm9sZSA9PSAnY2FuZGlkYXRlJyk7XG5cdFx0fSk7XG5cdFx0dGhpcy5leGFtTWVtYmVycy5zb3J0KChtZW1iZXIxLCBtZW1iZXIyKTogYW55ID0+IHtcblx0XHRcdHJldHVybiAobWVtYmVyMS5leGFtLmNyZWF0ZV9kYXRlIDwgbWVtYmVyMS5leGFtLmNyZWF0ZV9kYXRlKVxuXHRcdH0pO1xuXHRcdHZhciBleGFtSWRzID0gXy5wbHVjayh0aGlzLmV4YW1NZW1iZXJzLCAnZXhhbV9pZCcpO1xuXHRcdEV4YW1HcmFkZS5saXN0QnlFeGFtcyh0aGlzLCBleGFtSWRzKS5zdWJzY3JpYmUoZ3JhZGVzID0+IHtcblx0XHRcdF8uZWFjaCh0aGlzLmV4YW1NZW1iZXJzLCAobWVtYmVyOiBFeGFtTWVtYmVyKSA9PiB7XG5cdFx0XHRcdHZhciBleGFtR3JhZGVzID0gXy5maWx0ZXIoZ3JhZGVzLCAoZ3JhZGU6IEV4YW1HcmFkZSkgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBncmFkZS5leGFtX2lkID09IG1lbWJlci5leGFtX2lkO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0bWVtYmVyW1wic3VibWl0XCJdID0gXy5maW5kKHN1Ym1pdHMsIChzdWJtaXQ6IFN1Ym1pc3Npb24pID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gc3VibWl0Lm1lbWJlcl9pZCA9PSBtZW1iZXIuaWQgJiYgc3VibWl0LmV4YW1faWQgPT0gbWVtYmVyLmV4YW1faWQ7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAobWVtYmVyW1wic3VibWl0XCJdKSB7XG5cdFx0XHRcdFx0bWVtYmVyW1wic2NvcmVcIl0gPSBtZW1iZXJbXCJzdWJtaXRcIl0uc2NvcmU7XG5cdFx0XHRcdFx0bWVtYmVyW1wiZ3JhZGVcIl0gPSBFeGFtR3JhZGUuZ3JhZGVTY29yZShleGFtR3JhZGVzLCBtZW1iZXJbXCJzY29yZVwiXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdG1lbWJlcltcInNjb3JlXCJdID0gJyc7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdHByaW50Q2VydGlmaWNhdGUoY2VydGlmaWNhdGUpIHtcblx0XHR0aGlzLmNlcnRQcmludERpYWxvZy5zaG93KGNlcnRpZmljYXRlKTtcblx0fVxuXG5cdGV4cG9ydENvdXJzZSgpIHtcblx0XHRsZXQgb3V0cHV0ID0gXy5tYXAodGhpcy5jb3Vyc2VNZW1iZXJzLCBjb3Vyc2VNZW1iZXIgPT4ge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0J0NvdXJzZSc6IGNvdXJzZU1lbWJlclsnY291cnNlX25hbWUnXSwgJ1JlZ2lzdGVyIGRhdGUnOiBjb3Vyc2VNZW1iZXJbJ2RhdGVfcmVnaXN0ZXInXSwgJ0Vucm9sbG1lbnQgc3RhdHVzJzogY291cnNlTWVtYmVyWydlbnJvbGxfc3RhdHVzJ10sICdDZXJ0aWZpY2F0ZSc6IGNvdXJzZU1lbWJlclsnY2VydGlmaWNhdGUnXSA/ICdZZXMnIDogJ05vJ1xuXHRcdFx0fTtcblx0XHR9KVxuXHRcdHRoaXMuZXhjZWxTZXJ2aWNlLmV4cG9ydEFzRXhjZWxGaWxlKG91dHB1dCwgJ2NvdXJzZV9oaXN0b3J5X3JlcG9ydCcpO1xuXHR9XG5cblx0ZXhwb3J0RXhhbSgpIHtcblx0XHRsZXQgb3V0cHV0ID0gXy5tYXAodGhpcy5leGFtTWVtYmVycywgZXhhbU1lbWJlciA9PiB7XG5cdFx0XHRyZXR1cm4geyAnRXhhbSc6IGV4YW1NZW1iZXJbJ2V4YW1fbmFtZSddLCAnUmVnaXN0ZXIgZGF0ZSc6IGV4YW1NZW1iZXJbJ2RhdGVfcmVnaXN0ZXInXSwgJ0Vucm9sbG1lbnQgc3RhdHVzJzogZXhhbU1lbWJlclsnZW5yb2xsX3N0YXR1cyddLCAnR3JhZGUnOiBleGFtTWVtYmVyWydncmFkZSddID8gZXhhbU1lbWJlclsnZ3JhZGUnXS5uYW1lIDogJycgfTtcblx0XHR9KVxuXHRcdHRoaXMuZXhjZWxTZXJ2aWNlLmV4cG9ydEFzRXhjZWxGaWxlKG91dHB1dCwgJ2V4YW1faGlzdG9yeV9yZXBvcnQnKTtcblx0fVxuXG5cdGV4cG9ydFNraWxsKCkge1xuXHRcdGxldCBvdXRwdXQgPSBfLm1hcCh0aGlzLnNraWxscywgc2tpbGwgPT4ge1xuXHRcdFx0cmV0dXJuIHsgJ0NvbXBldGVuY3knOiBza2lsbFsnY29tcGV0ZW5jeV9uYW1lJ10sICdMZXZlbCc6IHNraWxsWydjb21wZXRlbmN5X2xldmVsX25hbWUnXSwgJ0RhdGUgYWNxdWlyZWQnOiBza2lsbFsnZGF0ZV9hY3F1aXJlJ10gfTtcblx0XHR9KVxuXHRcdHRoaXMuZXhjZWxTZXJ2aWNlLmV4cG9ydEFzRXhjZWxGaWxlKG91dHB1dCwgJ3NraWxsX3JlcG9ydCcpO1xuXHR9XG5cbn1cblxuIl19
