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
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var constants_1 = require("../../../shared/models/constants");
var course_faq_model_1 = require("../../../shared/models/elearning/course-faq.model");
var course_faq_dialog_component_1 = require("../course-faq/course-faq.dialog.component");
var course_material_model_1 = require("../../../shared/models/elearning/course-material.model");
var course_material_dialog_component_1 = require("../course-material/course-material.dialog.component");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var course_unit_preview_dialog_component_1 = require("../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component");
var course_syllabus_dialog_component_1 = require("../../../cms/course/course-syllabus/course-syllabus.dialog.component");
var course_backup_dialog_component_1 = require("../../../cms/course/course-backup/course-backup.dialog.component");
var course_restore_dialog_component_1 = require("../../../cms/course/course-restore/course-restore.dialog.component");
var CourseEditComponent = (function (_super) {
    __extends(CourseEditComponent, _super);
    function CourseEditComponent(router, route) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.faqs = [];
        _this.materials = [];
        _this.course = new course_model_1.Course();
        return _this;
    }
    CourseEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var courseId = +params['courseId'];
            _this.lmsProfileService.init(_this).subscribe(function () {
                _this.course = _this.lmsProfileService.courseById(courseId);
                _this.lmsProfileService.getCourseContent(courseId).subscribe(function (content) {
                    _this.syl = content["syllabus"];
                    _this.faqs = content["faqs"];
                    _this.materials = content["materials"];
                    _this.units = content["units"];
                    _this.displayCouseSyllabus();
                });
            });
        });
    };
    CourseEditComponent.prototype.displayCouseSyllabus = function () {
        this.tree = this.sylUtils.buildGroupTree(this.units);
        this.treeList = this.sylUtils.flattenTree(this.tree);
    };
    CourseEditComponent.prototype.editSyllabus = function () {
        this.syllabusDialog.show(this.course);
    };
    CourseEditComponent.prototype.addFaq = function () {
        var _this = this;
        var faq = new course_faq_model_1.CourseFaq();
        faq.course_id = this.course.id;
        this.faqDialog.show(faq);
        this.faqDialog.onCreateComplete.subscribe(function () {
            _this.lmsProfileService.addCourseFaq(faq);
            _this.lmsProfileService.getCourseContent(_this.course.id).subscribe(function (content) {
                _this.faqs = content["faqs"];
            });
        });
    };
    CourseEditComponent.prototype.editFaq = function () {
        if (this.selectedFaq)
            this.faqDialog.show(this.selectedFaq);
    };
    CourseEditComponent.prototype.deleteFaq = function () {
        var _this = this;
        if (this.selectedFaq)
            this.confirm('Are you sure to delete ?', function () {
                _this.selectedFaq.delete(_this).subscribe(function () {
                    _this.lmsProfileService.removeCourseFaq(_this.selectedFaq);
                    _this.lmsProfileService.getCourseContent(_this.course.id).subscribe(function (content) {
                        _this.faqs = content["faqs"];
                    });
                });
            });
    };
    CourseEditComponent.prototype.addMaterial = function () {
        var _this = this;
        var material = new course_material_model_1.CourseMaterial();
        material.course_id = this.course.id;
        this.materialDialog.show(material);
        this.materialDialog.onCreateComplete.subscribe(function () {
            _this.lmsProfileService.addCourseMaterial(material);
            _this.lmsProfileService.getCourseContent(_this.course.id).subscribe(function (content) {
                _this.materials = content["materials"];
            });
        });
    };
    CourseEditComponent.prototype.editMaterial = function () {
        if (this.selectedMaterial)
            this.materialDialog.show(this.selectedMaterial);
    };
    CourseEditComponent.prototype.deleteMaterial = function () {
        var _this = this;
        if (this.selectedMaterial)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                _this.selectedMaterial.delete(_this).subscribe(function () {
                    _this.lmsProfileService.removeCourseMaterial(_this.selectedMaterial);
                    _this.lmsProfileService.getCourseContent(_this.course.id).subscribe(function (content) {
                        _this.materials = content["materials"];
                    });
                });
            });
    };
    CourseEditComponent.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.selectedUnit = this.selectedNode.data;
        }
    };
    CourseEditComponent.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.unitPreviewDialog.show(this.selectedNode.data);
        }
    };
    CourseEditComponent.prototype.backupCourse = function () {
        this.backupDialog.show(this.course);
    };
    CourseEditComponent.prototype.restoreCourse = function () {
        this.restoreDialog.show(this.course);
    };
    __decorate([
        core_1.ViewChild(course_material_dialog_component_1.CourseMaterialDialog),
        __metadata("design:type", course_material_dialog_component_1.CourseMaterialDialog)
    ], CourseEditComponent.prototype, "materialDialog", void 0);
    __decorate([
        core_1.ViewChild(course_faq_dialog_component_1.CourseFaqDialog),
        __metadata("design:type", course_faq_dialog_component_1.CourseFaqDialog)
    ], CourseEditComponent.prototype, "faqDialog", void 0);
    __decorate([
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CourseEditComponent.prototype, "unitPreviewDialog", void 0);
    __decorate([
        core_1.ViewChild(course_syllabus_dialog_component_1.CourseSyllabusDialog),
        __metadata("design:type", course_syllabus_dialog_component_1.CourseSyllabusDialog)
    ], CourseEditComponent.prototype, "syllabusDialog", void 0);
    __decorate([
        core_1.ViewChild(course_backup_dialog_component_1.CourseBackupDialog),
        __metadata("design:type", course_backup_dialog_component_1.CourseBackupDialog)
    ], CourseEditComponent.prototype, "backupDialog", void 0);
    __decorate([
        core_1.ViewChild(course_restore_dialog_component_1.CourseRestoreDialog),
        __metadata("design:type", course_restore_dialog_component_1.CourseRestoreDialog)
    ], CourseEditComponent.prototype, "restoreDialog", void 0);
    CourseEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-edit',
            template: "<div class=\"card card-w-title\">     <h1>{{'Course'|translate}}: {{course.name}} </h1>     <p-tabView [style]=\"{width: '100%', height: '600px'}\">         <p-tabPanel header=\"{{'Course syllabus'|translate}}\" leftIcon=\"ui-icon-dehaze\">             <div class=\"ui-g-12\">                  <p-toolbar>                 <button pButton type=\"button\" icon=\"ui-icon-backup\" title=\"{{'Backup'| translate}}\" label=\"{{'Backup'|translate}}\" class=\"green-btn\" style=\"margin-right:4px;\" (click)=\"backupCourse()\"></button>                 <!-- <button pButton type=\"button\" icon=\"ui-icon-restore\" title=\"{{'Restore'| translate}}\" label=\"{{'Restore'|translate}}\" class=\"blue-btn\" style=\"margin-right:4px;\" (click)=\"restoreCourse()\"></button> -->             </p-toolbar>             </div>             <div class=\"ui-g-3\">                 <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>                 <div class=\"ui-g-12\">                     <button pButton type=\"button\" icon=\"ui-icon-edit\" title=\"{{'Edit course'| translate}}\" label=\"{{'Edit'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"editSyllabus(course, member)\"></button>                 </div>             </div>             <div class=\"ui-g-9\" *ngIf=\"selectedUnit\">                 <div class=\"card\">                     <div class=\"image-box-content\">                         <div>                             <h3 class=\"removeMT\">{{selectedUnit.name}}</h3>                             <span>{{'Unit type'|translate}} : {{COURSE_UNIT_TYPE[selectedUnit.type]}}</span>                         </div>                         <div class=\"image-box-footer\">                             <button pButton type=\"button\" icon=\"ui-icon-remove-red-eye\" title=\"{{'Preview'| translate}}\" label=\"{{'Preview'|translate}}\" class=\"orange-btn\" style=\"margin-right:4px;\" (click)=\"previewUnit()\" *ngIf=\"selectedUnit.type!='folder'\"></button>                         </div>                     </div>                 </div>             </div>             <course-backup-dialog></course-backup-dialog>             <course-restore-dialog></course-restore-dialog>             <course-syllabus-dialog></course-syllabus-dialog>             <course-unit-preview-dialog></course-unit-preview-dialog>         </p-tabPanel>         <p-tabPanel header=\"{{'Course material'|translate}}\" leftIcon=\"ui-icon-cloud-download\">             <div class=\"ui-g-12\">                 <p-toolbar>                     <div class=\"ui-toolbar-group-left\">                         <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addMaterial()\" icon=\"ui-icon-add\"></button>                         <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editMaterial()\" *ngIf=\"selectedMaterial\"></button>                         <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteMaterial()\" *ngIf=\"selectedMaterial\"></button>                     </div>                 </p-toolbar>                 <p-table #materialTable [value]=\"materials\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedMaterial\" [responsive]=\"true\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th [pSortableColumn]=\"'name'\">                                 {{'Name'|translate}}                                 <p-sortIcon [field]=\"'name'\"></p-sortIcon>                             </th>                             <th [pSortableColumn]=\"'type'\">                                 {{'Type'|translate}}                                 <p-sortIcon [field]=\"'type'\"></p-sortIcon>                             </th>                             <th>                                 {{'URL'|translate}}                             </th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-material>                         <tr [pSelectableRow]=\"material\">                             <td>{{material.name}}</td>                             <td>{{material.type}}</td>                             <td class=\"url-course-material\">{{material.url}}</td>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"summary\">                         {{'Total records'|translate}} : {{materials?.length}}                     </ng-template>                 </p-table>             </div>             <course-material-dialog></course-material-dialog>         </p-tabPanel>         <p-tabPanel header=\"{{'Course FAQ'|translate}}\" leftIcon=\"ui-icon-question-answer\">             <div class=\"ui-g-12\">                 <p-toolbar>                     <div class=\"ui-toolbar-group-left\">                         <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addFaq()\" icon=\"ui-icon-add\"></button>                         <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editFaq()\" *ngIf=\"selectedFaq\"></button>                         <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteFaq()\" *ngIf=\"selectedFaq\"></button>                     </div>                 </p-toolbar>                 <p-table #faqTable [value]=\"faqs\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedFaq\" [responsive]=\"true\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th>                                 {{'Question'|translate}}                             </th>                             <th>                                 {{'Answer'|translate}}                             </th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-faq>                         <tr [pSelectableRow]=\"faq\">                             <td>{{faq.question}}</td>                             <td>{{faq.answer}}</td>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"summary\">                         {{'Total records'|translate}} : {{faqs?.length}}                     </ng-template>                 </p-table>             </div>             <course-faq-dialog></course-faq-dialog>         </p-tabPanel>     </p-tabView> </div>",
            styles: [".image-box-footer{margin-top:10px}.url-course-material{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
    ], CourseEditComponent);
    return CourseEditComponent;
}(base_component_1.BaseComponent));
exports.CourseEditComponent = CourseEditComponent;
