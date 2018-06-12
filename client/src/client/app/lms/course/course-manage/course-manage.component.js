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
var Observable_1 = require("rxjs/Observable");
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var class_conference_dialog_component_1 = require("../class-conference/class-conference.dialog.component");
var class_exam_list_dialog_component_1 = require("../class-exam-list/class-exam-list.dialog.component");
var gradebook_list_component_1 = require("../gradebook-list/gradebook-list.component");
var course_faq_model_1 = require("../../../shared/models/elearning/course-faq.model");
var course_faq_dialog_component_1 = require("../course-faq/course-faq.dialog.component");
var course_material_model_1 = require("../../../shared/models/elearning/course-material.model");
var course_material_dialog_component_1 = require("../course-material/course-material.dialog.component");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_unit_preview_dialog_component_1 = require("../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component");
var project_list_dialog_component_1 = require("../project-list/project-list.dialog.component");
var CourseManageComponent = (function (_super) {
    __extends(CourseManageComponent, _super);
    function CourseManageComponent(router, route) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.classes = [];
        _this.faqs = [];
        _this.materials = [];
        _this.course = new course_model_1.Course();
        return _this;
    }
    CourseManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var courseId = +params['courseId'];
            course_model_1.Course.get(_this, courseId).subscribe(function (course) {
                course_member_model_1.CourseMember.byCourseAndUser(_this, _this.authService.UserProfile.id, courseId).subscribe(function (members) {
                    _this.course = course;
                    _this.members = _.filter(members, function (member) {
                        return member.role == 'teacher';
                    });
                    _this.loadCourseClass();
                    _this.loadFaqs();
                    _this.loadMaterials();
                    _this.loadCourseSyllabus();
                });
            });
        });
    };
    CourseManageComponent.prototype.loadCourseClass = function () {
        var _this = this;
        course_class_model_1.CourseClass.listByCourse(this, this.course.id)
            .map(function (classList) {
            return _.filter(classList, function (obj) {
                var member = _.find(_this.members, function (member) {
                    return member.class_id == obj.id;
                });
                return member != null;
            });
        })
            .subscribe(function (classList) {
            _this.classes = classList;
        });
    };
    CourseManageComponent.prototype.loadCourseSyllabus = function () {
        var _this = this;
        course_syllabus_model_1.CourseSyllabus.byCourse(this, this.course.id).subscribe(function (syl) {
            course_unit_model_1.CourseUnit.listBySyllabus(_this, syl.id).subscribe(function (units) {
                _this.units = _.filter(units, function (unit) {
                    return unit.status == 'published';
                });
                _this.tree = _this.sylUtils.buildGroupTree(units);
            });
        });
    };
    CourseManageComponent.prototype.manageConference = function () {
        if (this.selectedClass) {
            this.conferenceDialog.show(this.selectedClass);
        }
    };
    CourseManageComponent.prototype.manageStudent = function () {
        if (this.selectedClass) {
            this.gradebookListDialog.show(this.selectedClass);
        }
    };
    CourseManageComponent.prototype.manageExam = function () {
        if (this.selectedClass) {
            this.examListDialog.show(this.selectedClass);
        }
    };
    CourseManageComponent.prototype.manageProject = function () {
        if (this.selectedClass) {
            this.projectListDialog.show(this.selectedClass);
        }
    };
    CourseManageComponent.prototype.loadFaqs = function () {
        var _this = this;
        course_faq_model_1.CourseFaq.listByCourse(this, this.course.id)
            .subscribe(function (faqs) {
            _this.faqs = faqs;
        });
    };
    CourseManageComponent.prototype.addFaq = function () {
        var _this = this;
        var faq = new course_faq_model_1.CourseFaq();
        faq.course_id = this.course.id;
        this.faqDialog.show(faq);
        this.faqDialog.onCreateComplete.subscribe(function () {
            _this.loadFaqs();
        });
    };
    CourseManageComponent.prototype.editFaq = function () {
        if (this.selectedFaq)
            this.faqDialog.show(this.selectedFaq);
    };
    CourseManageComponent.prototype.deleteFaq = function () {
        var _this = this;
        if (this.selectedFaq)
            this.confirm('Are you sure to delete ?', function () {
                _this.selectedFaq.delete(_this).subscribe(function () {
                    _this.loadFaqs();
                    _this.selectedFaq = null;
                });
            });
    };
    CourseManageComponent.prototype.loadMaterials = function () {
        var _this = this;
        course_material_model_1.CourseMaterial.listByCourse(this, this.course.id)
            .subscribe(function (materials) {
            _this.materials = materials;
        });
    };
    CourseManageComponent.prototype.addMaterial = function () {
        var _this = this;
        var material = new course_material_model_1.CourseMaterial();
        material.course_id = this.course.id;
        this.materialDialog.show(material);
        this.materialDialog.onCreateComplete.subscribe(function () {
            _this.loadMaterials();
        });
    };
    CourseManageComponent.prototype.editMaterial = function () {
        if (this.selectedMaterial)
            this.materialDialog.show(this.selectedMaterial);
    };
    CourseManageComponent.prototype.deleteMaterial = function () {
        var _this = this;
        if (this.selectedMaterial)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                _this.selectedMaterial.delete(_this).subscribe(function () {
                    _this.loadMaterials();
                    _this.selectedMaterial = null;
                });
            });
    };
    CourseManageComponent.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.selectedUnit = this.selectedNode.data;
        }
    };
    CourseManageComponent.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.unitPreviewDialog.show(this.selectedNode.data);
        }
    };
    CourseManageComponent.prototype.closeClass = function () {
        var _this = this;
        if (this.selectedClass) {
            this.selectedClass.status = 'closed';
            course_member_model_1.CourseMember.listByClass(this, this.selectedClass.id).subscribe(function (members) {
                var subscriptions = _.map(members, function (member) {
                    member.enroll_status = 'completed';
                    return member.save(_this);
                });
                subscriptions.push(_this.selectedClass.save(_this));
                Observable_1.Observable.forkJoin.apply(Observable_1.Observable, subscriptions).subscribe(function () {
                    _this.success('Class close');
                });
            });
        }
    };
    __decorate([
        core_1.ViewChild(course_material_dialog_component_1.CourseMaterialDialog),
        __metadata("design:type", course_material_dialog_component_1.CourseMaterialDialog)
    ], CourseManageComponent.prototype, "materialDialog", void 0);
    __decorate([
        core_1.ViewChild(course_faq_dialog_component_1.CourseFaqDialog),
        __metadata("design:type", course_faq_dialog_component_1.CourseFaqDialog)
    ], CourseManageComponent.prototype, "faqDialog", void 0);
    __decorate([
        core_1.ViewChild(class_conference_dialog_component_1.ClassConferenceDialog),
        __metadata("design:type", class_conference_dialog_component_1.ClassConferenceDialog)
    ], CourseManageComponent.prototype, "conferenceDialog", void 0);
    __decorate([
        core_1.ViewChild(class_exam_list_dialog_component_1.ClassExamListDialog),
        __metadata("design:type", class_exam_list_dialog_component_1.ClassExamListDialog)
    ], CourseManageComponent.prototype, "examListDialog", void 0);
    __decorate([
        core_1.ViewChild(gradebook_list_component_1.GradebookListDialog),
        __metadata("design:type", gradebook_list_component_1.GradebookListDialog)
    ], CourseManageComponent.prototype, "gradebookListDialog", void 0);
    __decorate([
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CourseManageComponent.prototype, "unitPreviewDialog", void 0);
    __decorate([
        core_1.ViewChild(project_list_dialog_component_1.ProjectListDialog),
        __metadata("design:type", project_list_dialog_component_1.ProjectListDialog)
    ], CourseManageComponent.prototype, "projectListDialog", void 0);
    CourseManageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-manage',
            templateUrl: 'course-manage.component.html',
            styleUrls: ['course-manage.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
    ], CourseManageComponent);
    return CourseManageComponent;
}(base_component_1.BaseComponent));
exports.CourseManageComponent = CourseManageComponent;
//# sourceMappingURL=course-manage.component.js.map