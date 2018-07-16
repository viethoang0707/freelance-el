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
            templateUrl: 'course-edit.component.html',
            styleUrls: ['course-edit.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
    ], CourseEditComponent);
    return CourseEditComponent;
}(base_component_1.BaseComponent));
exports.CourseEditComponent = CourseEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsMENBQWlFO0FBR2pFLGlGQUErRTtBQUMvRSw4RUFBdUU7QUFRdkUsOERBR3lDO0FBR3pDLHNGQUE4RTtBQUM5RSx5RkFBNEU7QUFDNUUsZ0dBQXdGO0FBQ3hGLHdHQUEyRjtBQUUzRix5RUFBdUU7QUFFdkUsNElBQThIO0FBRTlILHlIQUE0RztBQUM1RyxtSEFBc0c7QUFDdEcsc0hBQXlHO0FBT3pHO0lBQXlDLHVDQUFhO0lBeUJyRCw2QkFBb0IsTUFBYyxFQUFVLEtBQXFCO1FBQWpFLFlBQ0MsaUJBQU8sU0FLUDtRQU5tQixZQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsV0FBSyxHQUFMLEtBQUssQ0FBZ0I7UUF2QmpFLHNCQUFnQixHQUFHLDRCQUFnQixDQUFDO1FBeUJuQyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksOEJBQWEsRUFBRSxDQUFDO1FBQ3BDLEtBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHFCQUFNLEVBQUUsQ0FBQzs7SUFDNUIsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJBLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDakMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzFDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMs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bkIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQTBCMkIsZUFBTSxFQUFpQix1QkFBYztPQXpCckQsbUJBQW1CLENBeUkvQjtJQUFELDBCQUFDO0NBeklELEFBeUlDLENBekl3Qyw4QkFBYSxHQXlJckQ7QUF6SVksa0RBQW1CIiwiZmlsZSI6ImFwcC9sbXMvY291cnNlL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VDbGFzcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1jbGFzcy5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1xuXHRHUk9VUF9DQVRFR09SWSwgQ09OVEVOVF9TVEFUVVMsIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX1JPTEUsXG5cdENPVVJTRV9NRU1CRVJfU1RBVFVTLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIENPVVJTRV9VTklUX1RZUEVcbn0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RVc2Vyc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC11c2VyLWRpYWxvZy9zZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IENvdXJzZUZhcSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1mYXEubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlRmFxRGlhbG9nIH0gZnJvbSAnLi4vY291cnNlLWZhcS9jb3Vyc2UtZmFxLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlTWF0ZXJpYWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWF0ZXJpYWwubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWF0ZXJpYWxEaWFsb2cgfSBmcm9tICcuLi9jb3Vyc2UtbWF0ZXJpYWwvY291cnNlLW1hdGVyaWFsLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlU3lsbGFidXMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2Utc3lsbGFidXMubW9kZWwnO1xuaW1wb3J0IHsgU3lsbGFidXNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N5bGxhYnVzLnV0aWxzJztcbmltcG9ydCB7IENvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0UHJldmlld0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Ntcy9jb3Vyc2UvY291cnNlLXVuaXQtcHJldmlldy1kaWFsb2cvY291cnNlLXVuaXQtcHJldmlldy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VTeWxsYWJ1c0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Ntcy9jb3Vyc2UvY291cnNlLXN5bGxhYnVzL2NvdXJzZS1zeWxsYWJ1cy5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZUJhY2t1cERpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Ntcy9jb3Vyc2UvY291cnNlLWJhY2t1cC9jb3Vyc2UtYmFja3VwLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlUmVzdG9yZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Ntcy9jb3Vyc2UvY291cnNlLXJlc3RvcmUvY291cnNlLXJlc3RvcmUuZGlhbG9nLmNvbXBvbmVudCc7XG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdjb3Vyc2UtZWRpdCcsXG5cdHRlbXBsYXRlVXJsOiAnY291cnNlLWVkaXQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnY291cnNlLWVkaXQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZUVkaXRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRDT1VSU0VfVU5JVF9UWVBFID0gQ09VUlNFX1VOSVRfVFlQRTtcblxuXHRwcml2YXRlIGNvdXJzZTogQ291cnNlO1xuXHRwcml2YXRlIHVuaXRzOiBDb3Vyc2VVbml0W107XG5cdHByaXZhdGUgbWVtYmVyOiBDb3Vyc2VNZW1iZXI7XG5cdHByaXZhdGUgc2VsZWN0ZWRGYXE6IENvdXJzZUZhcTtcblx0cHJpdmF0ZSBmYXFzOiBDb3Vyc2VGYXFbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZE1hdGVyaWFsOiBDb3Vyc2VNYXRlcmlhbDtcblx0cHJpdmF0ZSBtYXRlcmlhbHM6IENvdXJzZU1hdGVyaWFsW107XG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzeWw6IENvdXJzZVN5bGxhYnVzO1xuXHRwcml2YXRlIHNlbGVjdGVkTm9kZTogVHJlZU5vZGU7XG5cdHByaXZhdGUgc2VsZWN0ZWRVbml0OiBDb3Vyc2VVbml0O1xuXHRwcml2YXRlIHN5bFV0aWxzOiBTeWxsYWJ1c1V0aWxzO1xuXHRwcml2YXRlIHRyZWVMaXN0OiBUcmVlTm9kZVtdOyB0XG5cblx0QFZpZXdDaGlsZChDb3Vyc2VNYXRlcmlhbERpYWxvZykgbWF0ZXJpYWxEaWFsb2c6IENvdXJzZU1hdGVyaWFsRGlhbG9nO1xuXHRAVmlld0NoaWxkKENvdXJzZUZhcURpYWxvZykgZmFxRGlhbG9nOiBDb3Vyc2VGYXFEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoQ291cnNlVW5pdFByZXZpZXdEaWFsb2cpIHVuaXRQcmV2aWV3RGlhbG9nOiBDb3Vyc2VVbml0UHJldmlld0RpYWxvZztcblx0QFZpZXdDaGlsZChDb3Vyc2VTeWxsYWJ1c0RpYWxvZykgc3lsbGFidXNEaWFsb2c6IENvdXJzZVN5bGxhYnVzRGlhbG9nO1xuXHRAVmlld0NoaWxkKENvdXJzZUJhY2t1cERpYWxvZykgYmFja3VwRGlhbG9nOiBDb3Vyc2VCYWNrdXBEaWFsb2c7XG4gICAgQFZpZXdDaGlsZChDb3Vyc2VSZXN0b3JlRGlhbG9nKSByZXN0b3JlRGlhbG9nOiBDb3Vyc2VSZXN0b3JlRGlhbG9nO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnN5bFV0aWxzID0gbmV3IFN5bGxhYnVzVXRpbHMoKTtcblx0XHR0aGlzLmZhcXMgPSBbXTtcblx0XHR0aGlzLm1hdGVyaWFscyA9IFtdO1xuXHRcdHRoaXMuY291cnNlID0gbmV3IENvdXJzZSgpO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG5cdFx0XHR2YXIgY291cnNlSWQgPSArcGFyYW1zWydjb3Vyc2VJZCddO1xuXHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5pbml0KHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5jb3Vyc2UgPSB0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmNvdXJzZUJ5SWQoY291cnNlSWQpO1xuXHRcdFx0XHRcdHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0Q291cnNlQ29udGVudChjb3Vyc2VJZCkuc3Vic2NyaWJlKGNvbnRlbnQ9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnN5bCA9IGNvbnRlbnRbXCJzeWxsYWJ1c1wiXTtcblx0XHRcdFx0XHRcdHRoaXMuZmFxcyA9ICBjb250ZW50W1wiZmFxc1wiXTtcblx0XHRcdFx0XHRcdHRoaXMubWF0ZXJpYWxzID0gIGNvbnRlbnRbXCJtYXRlcmlhbHNcIl07XG5cdFx0XHRcdFx0XHR0aGlzLnVuaXRzID0gIGNvbnRlbnRbXCJ1bml0c1wiXTtcblx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheUNvdXNlU3lsbGFidXMoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRkaXNwbGF5Q291c2VTeWxsYWJ1cygpIHtcblx0XHR0aGlzLnRyZWUgPSB0aGlzLnN5bFV0aWxzLmJ1aWxkR3JvdXBUcmVlKHRoaXMudW5pdHMpO1xuXHRcdHRoaXMudHJlZUxpc3QgPSB0aGlzLnN5bFV0aWxzLmZsYXR0ZW5UcmVlKHRoaXMudHJlZSk7XG5cdH1cblxuXHRlZGl0U3lsbGFidXMoKSB7XG5cdFx0dGhpcy5zeWxsYWJ1c0RpYWxvZy5zaG93KHRoaXMuY291cnNlKTtcblx0fVxuXG5cblx0YWRkRmFxKCkge1xuXHRcdHZhciBmYXEgPSBuZXcgQ291cnNlRmFxKCk7XG5cdFx0ZmFxLmNvdXJzZV9pZCA9IHRoaXMuY291cnNlLmlkO1xuXHRcdHRoaXMuZmFxRGlhbG9nLnNob3coZmFxKTtcblx0XHR0aGlzLmZhcURpYWxvZy5vbkNyZWF0ZUNvbXBsZXRlLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmFkZENvdXJzZUZhcShmYXEpO1xuXHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDb3Vyc2VDb250ZW50KCB0aGlzLmNvdXJzZS5pZCkuc3Vic2NyaWJlKGNvbnRlbnQ9PiB7XG5cdFx0XHRcdHRoaXMuZmFxcyA9ICBjb250ZW50W1wiZmFxc1wiXTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0ZWRpdEZhcSgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZEZhcSlcblx0XHRcdHRoaXMuZmFxRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZEZhcSk7XG5cdH1cblxuXHRkZWxldGVGYXEoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRGYXEpXG5cdFx0XHR0aGlzLmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB0byBkZWxldGUgPycsICgpID0+IHtcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEZhcS5kZWxldGUodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLnJlbW92ZUNvdXJzZUZhcSh0aGlzLnNlbGVjdGVkRmFxKTtcblx0XHRcdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLmdldENvdXJzZUNvbnRlbnQoIHRoaXMuY291cnNlLmlkKS5zdWJzY3JpYmUoY29udGVudD0+IHtcblx0XHRcdFx0XHRcdHRoaXMuZmFxcyA9ICBjb250ZW50W1wiZmFxc1wiXTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHRcdH0pO1xuXHR9XG5cblx0YWRkTWF0ZXJpYWwoKSB7XG5cdFx0dmFyIG1hdGVyaWFsID0gbmV3IENvdXJzZU1hdGVyaWFsKCk7XG5cdFx0bWF0ZXJpYWwuY291cnNlX2lkID0gdGhpcy5jb3Vyc2UuaWQ7XG5cdFx0dGhpcy5tYXRlcmlhbERpYWxvZy5zaG93KG1hdGVyaWFsKTtcblx0XHR0aGlzLm1hdGVyaWFsRGlhbG9nLm9uQ3JlYXRlQ29tcGxldGUuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuYWRkQ291cnNlTWF0ZXJpYWwobWF0ZXJpYWwpO1xuXHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDb3Vyc2VDb250ZW50KCB0aGlzLmNvdXJzZS5pZCkuc3Vic2NyaWJlKGNvbnRlbnQ9PiB7XG5cdFx0XHRcdHRoaXMubWF0ZXJpYWxzID0gIGNvbnRlbnRbXCJtYXRlcmlhbHNcIl07XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGVkaXRNYXRlcmlhbCgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE1hdGVyaWFsKVxuXHRcdFx0dGhpcy5tYXRlcmlhbERpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRNYXRlcmlhbCk7XG5cdH1cblxuXHRkZWxldGVNYXRlcmlhbCgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE1hdGVyaWFsKVxuXHRcdFx0dGhpcy5jb25maXJtKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdBcmUgeW91IHN1cmUgdG8gZGVsZXRlPycpLCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRNYXRlcmlhbC5kZWxldGUodGhpcykuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxtc1Byb2ZpbGVTZXJ2aWNlLnJlbW92ZUNvdXJzZU1hdGVyaWFsKHRoaXMuc2VsZWN0ZWRNYXRlcmlhbCk7XG5cdFx0XHRcdFx0dGhpcy5sbXNQcm9maWxlU2VydmljZS5nZXRDb3Vyc2VDb250ZW50KCB0aGlzLmNvdXJzZS5pZCkuc3Vic2NyaWJlKGNvbnRlbnQ9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm1hdGVyaWFscyA9ICBjb250ZW50W1wibWF0ZXJpYWxzXCJdO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHR9XG5cblx0bm9kZVNlbGVjdChldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkVW5pdCA9IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGE7XG5cdFx0fVxuXHR9XG5cblx0cHJldmlld1VuaXQoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XG5cdFx0XHR0aGlzLnVuaXRQcmV2aWV3RGlhbG9nLnNob3codGhpcy5zZWxlY3RlZE5vZGUuZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0IGJhY2t1cENvdXJzZSgpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja3VwRGlhbG9nLnNob3codGhpcy5jb3Vyc2UpO1xuICAgIH1cblxuICAgIHJlc3RvcmVDb3Vyc2UoKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVEaWFsb2cuc2hvdyh0aGlzLmNvdXJzZSk7XG4gICAgfVxuXG59XG5cbiJdfQ==
