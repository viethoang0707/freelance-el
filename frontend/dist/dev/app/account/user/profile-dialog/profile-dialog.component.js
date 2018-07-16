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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var constants_1 = require("../../../shared/models/constants");
var certificate_print_dialog_component_1 = require("../../../lms/course/certificate-print/certificate-print.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var achievement_model_1 = require("../../../shared/models/elearning/achievement.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var submission_model_1 = require("../../../shared/models/elearning/submission.model");
var exam_grade_model_1 = require("../../../shared/models/elearning/exam-grade.model");
var UserProfileDialog = (function (_super) {
    __extends(UserProfileDialog, _super);
    function UserProfileDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.EXAM_MEMBER_ENROLL_STATUS = constants_1.EXAM_MEMBER_ENROLL_STATUS;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.courseMembers = [];
        _this.skills = [];
        _this.examMembers = [];
        return _this;
    }
    UserProfileDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
            this.object.group_id__DESC__ = this.selectedNode.data.name;
        }
    };
    UserProfileDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            _this.courseMembers = [];
            _this.skills = [];
            _this.examMembers = [];
            base_model_1.BaseModel
                .bulk_search(_this, group_model_1.Group.__api__listUserGroup(), course_member_model_1.CourseMember.__api__listByUser(object.id), course_certificate_model_1.Certificate.__api__listByUser(object.id), achievement_model_1.Achivement.__api__listByUser(object.id), exam_member_model_1.ExamMember.__api__listByUser(_this.ContextUser.id), submission_model_1.Submission.__api__listByUser(_this.ContextUser.id))
                .subscribe(function (jsonArr) {
                _this.groups = group_model_1.Group.toArray(jsonArr[0]);
                _this.courseMembers = course_member_model_1.CourseMember.toArray(jsonArr[1]);
                _this.certificates = course_certificate_model_1.Certificate.toArray(jsonArr[2]);
                _this.skills = achievement_model_1.Achivement.toArray(jsonArr[3]);
                _this.examMembers = exam_member_model_1.ExamMember.toArray(jsonArr[4]);
                var submits = submission_model_1.Submission.toArray(jsonArr[5]);
                _this.displayExams(submits);
                _this.displayGroupTree();
                _this.displayCourseHistory();
                _this.displaySkills();
            });
        });
    };
    UserProfileDialog.prototype.displayGroupTree = function () {
        this.tree = this.treeUtils.buildGroupTree(this.groups);
        if (this.object.group_id) {
            this.selectedNode = this.treeUtils.findTreeNode(this.tree, this.object.group_id);
        }
    };
    UserProfileDialog.prototype.displayCourseHistory = function () {
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
    UserProfileDialog.prototype.displaySkills = function () {
        this.skills.sort(function (s1, s2) {
            return s1.date_acquire.getTime() - s2.date_acquire.getTime();
        });
    };
    UserProfileDialog.prototype.displayExams = function (submits) {
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
    UserProfileDialog.prototype.printCertificate = function (certificate) {
        this.certPrintDialog.show(certificate);
    };
    __decorate([
        core_1.ViewChild(certificate_print_dialog_component_1.CertificatePrintDialog),
        __metadata("design:type", certificate_print_dialog_component_1.CertificatePrintDialog)
    ], UserProfileDialog.prototype, "certPrintDialog", void 0);
    UserProfileDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-profile-dialog',
            templateUrl: 'profile-dialog.component.html',
            styleUrls: ['profile-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], UserProfileDialog);
    return UserProfileDialog;
}(base_dialog_1.BaseDialog));
exports.UserProfileDialog = UserProfileDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L3VzZXIvcHJvZmlsZS1kaWFsb2cvcHJvZmlsZS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUlwRSw0RUFBcUU7QUFFckUsNEZBQW9GO0FBQ3BGLHNHQUF3RjtBQUN4RiwyRUFBeUU7QUFFekUsOEJBQWdDO0FBQ2hDLGlFQUErRDtBQUUvRCw4REFBOEg7QUFDOUgsK0hBQWtIO0FBQ2xILGdFQUE4RDtBQUM5RCx3RkFBZ0Y7QUFDaEYsd0ZBQWdGO0FBQ2hGLHNGQUErRTtBQUMvRSxzRkFBOEU7QUFTOUU7SUFBdUMscUNBQWdCO0lBZ0J0RDtRQUFBLFlBQ0MsaUJBQU8sU0FLUDtRQXBCRCxpQ0FBMkIsR0FBRyx1Q0FBMkIsQ0FBQztRQUMxRCwrQkFBeUIsR0FBRyxxQ0FBeUIsQ0FBQztRQWVyRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDOztJQUN2QixDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLEtBQVU7UUFDcEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUMzRDtJQUNGLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQUEsaUJBMEJDO1FBekJBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUMzQixLQUFJLENB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cm9maWxlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IENlcnRpZmljYXRlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLWNlcnRpZmljYXRlLm1vZGVsJztcbmltcG9ydCB7IEJhc2VEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuZGlhbG9nJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRVhBTV9NRU1CRVJfRU5ST0xMX1NUQVRVUywgQ09VUlNFX01FTUJFUl9ST0xFLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZVByaW50RGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vbG1zL2NvdXJzZS9jZXJ0aWZpY2F0ZS1wcmludC9jZXJ0aWZpY2F0ZS1wcmludC5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBBY2hpdmVtZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvYWNoaWV2ZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9zdWJtaXNzaW9uLm1vZGVsJztcbmltcG9ydCB7IEV4YW1HcmFkZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tZ3JhZGUubW9kZWwnO1xuXG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3VzZXItcHJvZmlsZS1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ3Byb2ZpbGUtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ3Byb2ZpbGUtZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlclByb2ZpbGVEaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPFVzZXI+IHtcblxuXHRDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMgPSBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVM7XG5cdEVYQU1fTUVNQkVSX0VOUk9MTF9TVEFUVVMgPSBFWEFNX01FTUJFUl9FTlJPTExfU1RBVFVTO1xuXG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuXHRwcml2YXRlIGNvdXJzZU1lbWJlcnM6IENvdXJzZU1lbWJlcltdO1xuXHRwcml2YXRlIGV4YW1NZW1iZXJzOiBFeGFtTWVtYmVyW107XG5cdHByaXZhdGUgY2VydGlmaWNhdGVzOiBDZXJ0aWZpY2F0ZVtdO1xuXHRwcml2YXRlIHNraWxsczogQWNoaXZlbWVudFtdO1xuXHRwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuXHRwcml2YXRlIGdyb3VwczogR3JvdXBbXTtcblxuXHRAVmlld0NoaWxkKENlcnRpZmljYXRlUHJpbnREaWFsb2cpIGNlcnRQcmludERpYWxvZzogQ2VydGlmaWNhdGVQcmludERpYWxvZztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuXHRcdHRoaXMuY291cnNlTWVtYmVycyA9IFtdO1xuXHRcdHRoaXMuc2tpbGxzID0gW107XG5cdFx0dGhpcy5leGFtTWVtYmVycyA9IFtdO1xuXHR9XG5cblx0bm9kZVNlbGVjdChldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XG5cdFx0XHR0aGlzLm9iamVjdC5ncm91cF9pZCA9IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQ7XG5cdFx0XHR0aGlzLm9iamVjdC5ncm91cF9pZF9fREVTQ19fID0gdGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5uYW1lO1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMub25TaG93LnN1YnNjcmliZShvYmplY3QgPT4ge1xuXHRcdFx0dGhpcy5jb3Vyc2VNZW1iZXJzID0gW107XG5cdFx0XHR0aGlzLnNraWxscyA9IFtdO1xuXHRcdFx0dGhpcy5leGFtTWVtYmVycyA9IFtdO1xuXHRcdFx0QmFzZU1vZGVsXG5cdFx0XHQuYnVsa19zZWFyY2godGhpcyxcblx0XHRcdFx0R3JvdXAuX19hcGlfX2xpc3RVc2VyR3JvdXAoKSxcblx0XHRcdFx0Q291cnNlTWVtYmVyLl9fYXBpX19saXN0QnlVc2VyKG9iamVjdC5pZCksXG5cdFx0XHRcdENlcnRpZmljYXRlLl9fYXBpX19saXN0QnlVc2VyKG9iamVjdC5pZCksXG5cdFx0XHRcdEFjaGl2ZW1lbnQuX19hcGlfX2xpc3RCeVVzZXIob2JqZWN0LmlkKSxcblx0XHRcdFx0RXhhbU1lbWJlci5fX2FwaV9fbGlzdEJ5VXNlcih0aGlzLkNvbnRleHRVc2VyLmlkKSxcblx0ICAgICAgICAgICAgU3VibWlzc2lvbi5fX2FwaV9fbGlzdEJ5VXNlcih0aGlzLkNvbnRleHRVc2VyLmlkKSlcblx0XHRcdC5zdWJzY3JpYmUoKGpzb25BcnIpPT4ge1xuXHRcdFx0XHR0aGlzLmdyb3VwcyA9IEdyb3VwLnRvQXJyYXkoanNvbkFyclswXSk7XG5cdFx0XHRcdHRoaXMuY291cnNlTWVtYmVycyA9ICBDb3Vyc2VNZW1iZXIudG9BcnJheShqc29uQXJyWzFdKTtcblx0XHRcdFx0dGhpcy5jZXJ0aWZpY2F0ZXMgPSAgQ2VydGlmaWNhdGUudG9BcnJheShqc29uQXJyWzJdKTtcblx0XHRcdFx0dGhpcy5za2lsbHMgPSAgQWNoaXZlbWVudC50b0FycmF5KGpzb25BcnJbM10pO1xuXHRcdFx0XHR0aGlzLmV4YW1NZW1iZXJzID0gRXhhbU1lbWJlci50b0FycmF5KGpzb25BcnJbNF0pO1xuICAgICAgICAgICAgICAgIHZhciBzdWJtaXRzID0gU3VibWlzc2lvbi50b0FycmF5KGpzb25BcnJbNV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUV4YW1zKHN1Ym1pdHMpO1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlHcm91cFRyZWUoKTtcblx0XHRcdFx0dGhpcy5kaXNwbGF5Q291cnNlSGlzdG9yeSgpO1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlTa2lsbHMoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGlzcGxheUdyb3VwVHJlZSgpIHtcblx0XHR0aGlzLnRyZWUgPSB0aGlzLnRyZWVVdGlscy5idWlsZEdyb3VwVHJlZSh0aGlzLmdyb3Vwcyk7XG5cdFx0aWYgKHRoaXMub2JqZWN0Lmdyb3VwX2lkKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkTm9kZSA9IHRoaXMudHJlZVV0aWxzLmZpbmRUcmVlTm9kZSh0aGlzLnRyZWUsIHRoaXMub2JqZWN0Lmdyb3VwX2lkKTtcblx0XHR9XG5cdH1cblxuXHRkaXNwbGF5Q291cnNlSGlzdG9yeSgpIHtcblx0XHR0aGlzLmNvdXJzZU1lbWJlcnMgPSAgXy5maWx0ZXIodGhpcy5jb3Vyc2VNZW1iZXJzLCAobWVtYmVyOiBDb3Vyc2VNZW1iZXIpID0+IHtcblx0XHRcdHJldHVybiBtZW1iZXIucm9sZSA9PSAnc3R1ZGVudCc7XG5cdFx0fSk7XG5cdFx0Xy5lYWNoKHRoaXMuY291cnNlTWVtYmVycywgKG1lbWJlcjogQ291cnNlTWVtYmVyKSA9PiB7XG5cdFx0XHRtZW1iZXJbXCJjZXJ0aWZpY2F0ZVwiXSA9IF8uZmluZCh0aGlzLmNlcnRpZmljYXRlcywgKGNlcnQ6Q2VydGlmaWNhdGUpID0+IHtcblx0XHRcdFx0cmV0dXJuIGNlcnQubWVtYmVyX2lkID09IG1lbWJlci5pZDtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGlzcGxheVNraWxscygpIHtcblx0XHR0aGlzLnNraWxscy5zb3J0KChzMTpBY2hpdmVtZW50LHMyOkFjaGl2ZW1lbnQpPT4ge1xuXHRcdFx0cmV0dXJuIHMxLmRhdGVfYWNxdWlyZS5nZXRUaW1lKCkgLSBzMi5kYXRlX2FjcXVpcmUuZ2V0VGltZSgpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHRkaXNwbGF5RXhhbXMoc3VibWl0czogU3VibWlzc2lvbltdKSB7XG4gICAgICAgIHRoaXMuZXhhbU1lbWJlcnMgPSBfLmZpbHRlcih0aGlzLmV4YW1NZW1iZXJzICwgKG1lbWJlcjogRXhhbU1lbWJlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChtZW1iZXIuZXhhbV9pZCAmJiBtZW1iZXIuc3RhdHVzID09ICdhY3RpdmUnICYmIG1lbWJlci5yb2xlID09ICdjYW5kaWRhdGUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXhhbU1lbWJlcnMuc29ydCgobWVtYmVyMSwgbWVtYmVyMik6IGFueSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKG1lbWJlcjEuZXhhbS5jcmVhdGVfZGF0ZSA8IG1lbWJlcjEuZXhhbS5jcmVhdGVfZGF0ZSlcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBleGFtSWRzID0gXy5wbHVjayh0aGlzLmV4YW1NZW1iZXJzLCAnZXhhbV9pZCcpO1xuICAgICAgICBFeGFtR3JhZGUubGlzdEJ5RXhhbXModGhpcywgZXhhbUlkcykuc3Vic2NyaWJlKGdyYWRlcyA9PiB7XG5cdCAgICAgICAgXy5lYWNoKHRoaXMuZXhhbU1lbWJlcnMsIChtZW1iZXI6IEV4YW1NZW1iZXIpID0+IHtcblx0ICAgICAgICBcdHZhciBleGFtR3JhZGVzID0gXy5maWx0ZXIoZ3JhZGVzLCAoZ3JhZGU6RXhhbUdyYWRlKT0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBncmFkZS5leGFtX2lkID09IG1lbWJlci5leGFtX2lkO1xuXHRcdFx0XHR9KTtcblx0ICAgICAgICAgICAgbWVtYmVyW1wic3VibWl0XCJdID0gXy5maW5kKHN1Ym1pdHMsIChzdWJtaXQ6IFN1Ym1pc3Npb24pID0+IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBzdWJtaXQubWVtYmVyX2lkID09IG1lbWJlci5pZCAmJiBzdWJtaXQuZXhhbV9pZCA9PSBtZW1iZXIuZXhhbV9pZDtcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIGlmIChtZW1iZXJbXCJzdWJtaXRcIl0pIHtcblx0ICAgICAgICAgICAgICAgIG1lbWJlcltcInNjb3JlXCJdID0gbWVtYmVyW1wic3VibWl0XCJdLnNjb3JlO1xuXHQgICAgICAgICAgICAgICAgbWVtYmVyW1wiZ3JhZGVcIl0gPSBFeGFtR3JhZGUuZ3JhZGVTY29yZShleGFtR3JhZGVzLCBtZW1iZXJbXCJzY29yZVwiXSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZWxzZVxuXHQgICAgICAgICAgICAgICAgbWVtYmVyW1wic2NvcmVcIl0gPSAnJztcblx0ICAgICAgICB9KTtcblx0ICAgIH0pO1xuICAgIH1cblxuXHRwcmludENlcnRpZmljYXRlKGNlcnRpZmljYXRlKSB7XG5cdFx0dGhpcy5jZXJ0UHJpbnREaWFsb2cuc2hvdyhjZXJ0aWZpY2F0ZSk7XG5cdH1cblxufVxuXG4iXX0=
