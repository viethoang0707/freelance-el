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
var Observable_1 = require("rxjs/Observable");
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var ClassExamEnrollDialog = (function (_super) {
    __extends(ClassExamEnrollDialog, _super);
    function ClassExamEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        _this.courseClass = new course_class_model_1.CourseClass();
        _this.members = [];
        return _this;
    }
    ClassExamEnrollDialog.prototype.show = function (exam, clazz) {
        var _this = this;
        this.display = true;
        this.courseClass = clazz;
        this.exam = exam;
        course_member_model_1.CourseMember.listByClass(this, clazz.id).subscribe(function (members) {
            _this.members = _.filter(members, function (member) {
                return member.role == 'student';
            });
            _.each(members, function (member) {
                exam_member_model_1.ExamMember.byExamAndUser(_this, member.user_id, exam.id).subscribe(function (examMember) {
                    if (examMember) {
                        member["examMember"] = examMember;
                        member["allowed"] = examMember.status == 'active';
                    }
                    else
                        member["allowed"] = false;
                });
            });
        });
    };
    ClassExamEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassExamEnrollDialog.prototype.registerAll = function () {
        var _this = this;
        _.each(this.members, function (member) {
            if (!member["examMember"]) {
                member["examMember"] = _this.createExamMember(member);
            }
            else {
                var examMember = member["examMember"];
                examMember.status = "active";
            }
        });
        var subscriptions = _.map(this.members, function (member) {
            return member.save(_this);
        });
        Observable_1.Observable.forkJoin(subscriptions).subscribe(function () {
            _this.info('Register all successfully');
        });
    };
    ClassExamEnrollDialog.prototype.unregisterAll = function () {
        var _this = this;
        var subscriptions = _.map(this.members, function (member) {
            if (member["examMember"]) {
                var examMember = member["examMember"];
                examMember.status = "suspend";
                return examMember.save(_this);
            }
            else {
                return Observable_1.Observable.of(true);
            }
        });
        Observable_1.Observable.forkJoin(subscriptions).subscribe(function () {
            _this.info('Unregister all successfully');
        });
    };
    ClassExamEnrollDialog.prototype.registerUnregister = function (event, member) {
        var examMember = member["examMember"];
        if (event.checked) {
            if (examMember) {
                examMember.status = "active";
                examMember.save(this).subscribe();
                member["allowed"] = true;
            }
            else {
                examMember = this.createExamMember(member);
                examMember.save(this).subscribe(function () {
                    member["examMember"] = examMember;
                    member["allowed"] = true;
                });
            }
        }
        else {
            examMember.status = "suspend";
            examMember.save(this).subscribe();
            member["allowed"] = false;
        }
    };
    ClassExamEnrollDialog.prototype.createExamMember = function (member) {
        var examMember = new exam_member_model_1.ExamMember();
        examMember.role = "candidate";
        examMember.exam_id = this.exam.id;
        examMember.user_id = member.user_id;
        examMember.date_register = new Date();
        examMember.status = 'active';
        return examMember;
    };
    ClassExamEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-exam-enroll-dialog',
            templateUrl: 'class-exam-enroll.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], ClassExamEnrollDialog);
    return ClassExamEnrollDialog;
}(base_component_1.BaseComponent));
exports.ClassExamEnrollDialog = ClassExamEnrollDialog;
//# sourceMappingURL=class-exam-enroll.dialog.component.js.map