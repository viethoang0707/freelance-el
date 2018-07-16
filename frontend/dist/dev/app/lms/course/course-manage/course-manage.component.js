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
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var class_conference_dialog_component_1 = require("../../class/class-conference/class-conference.dialog.component");
var course_faq_dialog_component_1 = require("../course-faq/course-faq.dialog.component");
var course_material_dialog_component_1 = require("../course-material/course-material.dialog.component");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var course_unit_preview_dialog_component_1 = require("../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component");
var mail_message_dialog_component_1 = require("../../../shared/components/mail-message/mail-message.dialog.component");
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
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        return _this;
    }
    CourseManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var courseId = +params['courseId'];
            _this.memberId = +params['memberId'];
            _this.course = _this.lmsProfileService.courseById(courseId);
            _this.classes = _this.lmsProfileService.classByCourseId(courseId);
            _this.lmsProfileService.getCourseContent(courseId).subscribe(function (content) {
                _this.syl = content["syllabus"];
                _this.faqs = content["faqs"];
                _this.materials = content["materials"];
                _this.units = content["units"];
                _this.displayCouseSyllabus();
            });
        });
    };
    CourseManageComponent.prototype.displayCouseSyllabus = function () {
        this.units = _.filter(this.units, function (unit) {
            return unit.status == 'published';
        });
        this.tree = this.sylUtils.buildGroupTree(this.units);
        if (this.syl.status != 'published')
            this.warn('Cours syllabus is not published');
    };
    CourseManageComponent.prototype.manageConference = function () {
        this.conferenceDialog.show(this.selectedClass);
    };
    CourseManageComponent.prototype.manageClass = function () {
        this.router.navigate(['/lms/courses/manage/class', this.course.id, this.selectedClass.id, this.memberId]);
    };
    CourseManageComponent.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.selectedUnit = this.selectedNode.data;
        }
    };
    CourseManageComponent.prototype.broadcastMessage = function () {
        var _this = this;
        course_member_model_1.CourseMember.listByClass(this, this.selectedClass.id).subscribe(function (members) {
            if (members.length) {
                var emails = _.pluck(members, "email");
                _this.mailDialog.show(emails);
            }
        });
    };
    CourseManageComponent.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.unitPreviewDialog.show(this.selectedNode.data);
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
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CourseManageComponent.prototype, "unitPreviewDialog", void 0);
    __decorate([
        core_1.ViewChild(mail_message_dialog_component_1.MailMessageDialog),
        __metadata("design:type", mail_message_dialog_component_1.MailMessageDialog)
    ], CourseManageComponent.prototype, "mailDialog", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS1tYW5hZ2UvY291cnNlLW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDBDQUFpRTtBQUdqRSxpRkFBK0U7QUFDL0UsOEVBQXVFO0FBR3ZFLDRGQUFvRjtBQUNwRiw4QkFBZ0M7QUFJaEMsOERBR3lDO0FBR3pDLG9IQUF1RztBQUV2Ryx5RkFBNEU7QUFFNUUsd0dBQTJGO0FBQzNGLGdHQUF3RjtBQUN4Rix5RUFBdUU7QUFFdkUsNElBQThIO0FBRTlILHVIQUEwRztBQVExRztJQUEyQyx5Q0FBYTtJQXdCdkQsK0JBQW9CLE1BQWMsRUFBVSxLQUFxQjtRQUFqRSxZQUNDLGlCQUFPLFNBT1A7UUFSbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFdBQUssR0FBTCxLQUFLLENBQWdCO1FBdEJqRSxzQkFBZ0IsR0FBRyw0QkFBZ0IsQ0FBQztRQXdCbkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDhCQUFhLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7UUFDM0IsS0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLHNDQUFjLEVBQUUsQ0FBQzs7SUFDakMsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJBLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDakMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFV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QUNyQjtRQUFqQyxnQkFBUyxDQUFDLHlEQUFxQixDQUFDO2tDQUFtQix5REFBcUI7bUVBQUM7SUFDdEM7UUFBbkMsZ0JBQVMsQ0FBQyw4REFBdUIsQ0FBQztrQ0FBb0IsOERBQXVCO29FQUFDO0lBQ2pEO1FBQTdCLGdCQUFTLENBQUMsaURBQWlCLENBQUM7a0NBQWEsaURBQWlCOzZEQUFDO0lBdEJoRCxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzFDLENBQUM7eUNBeUIyQixlQUFNLEVBQWlCLHVCQUFjO09BeEJyRCxxQkFBcUIsQ0F3RmpDO0lBQUQsNEJBQUM7Q0F4RkQsQUF3RkMsQ0F4RjBDLDhCQUFhLEdBd0Z2RDtBQXhGWSxzREFBcUIiLCJmaWxlIjoiYXBwL2xtcy9jb3Vyc2UvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VDbGFzcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1jbGFzcy5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1xuXHRHUk9VUF9DQVRFR09SWSwgQ09OVEVOVF9TVEFUVVMsIENPVVJTRV9NT0RFLCBDT1VSU0VfTUVNQkVSX1JPTEUsXG5cdENPVVJTRV9NRU1CRVJfU1RBVFVTLCBDT1VSU0VfTUVNQkVSX0VOUk9MTF9TVEFUVVMsIENPVVJTRV9VTklUX1RZUEVcbn0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RVc2Vyc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC11c2VyLWRpYWxvZy9zZWxlY3QtdXNlci1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IENsYXNzQ29uZmVyZW5jZURpYWxvZyB9IGZyb20gJy4uLy4uL2NsYXNzL2NsYXNzLWNvbmZlcmVuY2UvY2xhc3MtY29uZmVyZW5jZS5kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvdXJzZUZhcSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1mYXEubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlRmFxRGlhbG9nIH0gZnJvbSAnLi4vY291cnNlLWZhcS9jb3Vyc2UtZmFxLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlTWF0ZXJpYWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWF0ZXJpYWwubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWF0ZXJpYWxEaWFsb2cgfSBmcm9tICcuLi9jb3Vyc2UtbWF0ZXJpYWwvY291cnNlLW1hdGVyaWFsLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlU3lsbGFidXMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2Utc3lsbGFidXMubW9kZWwnO1xuaW1wb3J0IHsgU3lsbGFidXNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3N5bGxhYnVzLnV0aWxzJztcbmltcG9ydCB7IENvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0UHJldmlld0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL2Ntcy9jb3Vyc2UvY291cnNlLXVuaXQtcHJldmlldy1kaWFsb2cvY291cnNlLXVuaXQtcHJldmlldy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBNYWlsTWVzc2FnZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL21haWwtbWVzc2FnZS9tYWlsLW1lc3NhZ2UuZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2NvdXJzZS1tYW5hZ2UnLFxuXHR0ZW1wbGF0ZVVybDogJ2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnY291cnNlLW1hbmFnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlTWFuYWdlQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0Q09VUlNFX1VOSVRfVFlQRSA9IENPVVJTRV9VTklUX1RZUEU7XG5cblx0cHJpdmF0ZSBjb3Vyc2U6IENvdXJzZTtcblx0cHJpdmF0ZSBtZW1iZXJzOiBDb3Vyc2VNZW1iZXJbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZENsYXNzOiBDb3Vyc2VDbGFzcztcblx0cHJpdmF0ZSBjbGFzc2VzOiBDb3Vyc2VDbGFzc1tdO1xuXHRwcml2YXRlIGZhcXM6IENvdXJzZUZhcVtdO1xuXHRwcml2YXRlIG1hdGVyaWFsczogQ291cnNlTWF0ZXJpYWxbXTtcblx0cHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuXHRwcml2YXRlIHN5bDogQ291cnNlU3lsbGFidXM7XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSB1bml0czogQ291cnNlVW5pdFtdO1xuXHRwcml2YXRlIHNlbGVjdGVkVW5pdDogQ291cnNlVW5pdDtcblx0cHJpdmF0ZSBzeWxVdGlsczogU3lsbGFidXNVdGlscztcblx0cHJpdmF0ZSBtZW1iZXJJZDogbnVtYmVyO1xuXG5cdEBWaWV3Q2hpbGQoQ291cnNlTWF0ZXJpYWxEaWFsb2cpIG1hdGVyaWFsRGlhbG9nOiBDb3Vyc2VNYXRlcmlhbERpYWxvZztcblx0QFZpZXdDaGlsZChDb3Vyc2VGYXFEaWFsb2cpIGZhcURpYWxvZzogQ291cnNlRmFxRGlhbG9nO1xuXHRAVmlld0NoaWxkKENsYXNzQ29uZmVyZW5jZURpYWxvZykgY29uZmVyZW5jZURpYWxvZzogQ2xhc3NDb25mZXJlbmNlRGlhbG9nO1xuXHRAVmlld0NoaWxkKENvdXJzZVVuaXRQcmV2aWV3RGlhbG9nKSB1bml0UHJldmlld0RpYWxvZzogQ291cnNlVW5pdFByZXZpZXdEaWFsb2c7XG5cdEBWaWV3Q2hpbGQoTWFpbE1lc3NhZ2VEaWFsb2cpIG1haWxEaWFsb2c6IE1haWxNZXNzYWdlRGlhbG9nO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnN5bFV0aWxzID0gbmV3IFN5bGxhYnVzVXRpbHMoKTtcblx0XHR0aGlzLmNsYXNzZXMgPSBbXTtcblx0XHR0aGlzLmZhcXMgPSBbXTtcblx0XHR0aGlzLm1hdGVyaWFscyA9IFtdO1xuXHRcdHRoaXMuY291cnNlID0gbmV3IENvdXJzZSgpO1xuXHRcdHRoaXMuc3lsID0gbmV3IENvdXJzZVN5bGxhYnVzKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcblx0XHRcdHZhciBjb3Vyc2VJZCA9ICtwYXJhbXNbJ2NvdXJzZUlkJ107XG5cdFx0XHR0aGlzLm1lbWJlcklkID0gK3BhcmFtc1snbWVtYmVySWQnXTtcblx0XHRcdHRoaXMuY291cnNlID0gdGhpcy5sbXNQcm9maWxlU2VydmljZS5jb3Vyc2VCeUlkKGNvdXJzZUlkKTtcblx0XHRcdHRoaXMuY2xhc3NlcyA9IHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuY2xhc3NCeUNvdXJzZUlkKGNvdXJzZUlkKTtcblx0XHRcdHRoaXMubG1zUHJvZmlsZVNlcnZpY2UuZ2V0Q291cnNlQ29udGVudCggY291cnNlSWQpLnN1YnNjcmliZShjb250ZW50ID0+IHtcblx0XHRcdFx0dGhpcy5zeWwgPSBjb250ZW50W1wic3lsbGFidXNcIl07XG5cdFx0XHRcdHRoaXMuZmFxcyA9IGNvbnRlbnRbXCJmYXFzXCJdO1xuXHRcdFx0XHR0aGlzLm1hdGVyaWFscyA9IGNvbnRlbnRbXCJtYXRlcmlhbHNcIl07XG5cdFx0XHRcdHRoaXMudW5pdHMgPSBjb250ZW50W1widW5pdHNcIl07XG5cdFx0XHRcdHRoaXMuZGlzcGxheUNvdXNlU3lsbGFidXMoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGlzcGxheUNvdXNlU3lsbGFidXMoKSB7XG5cdFx0dGhpcy51bml0cyA9IF8uZmlsdGVyKHRoaXMudW5pdHMsICh1bml0OiBDb3Vyc2VVbml0KSA9PiB7XG5cdFx0XHRyZXR1cm4gdW5pdC5zdGF0dXMgPT0gJ3B1Ymxpc2hlZCc7XG5cdFx0fSk7XG5cdFx0dGhpcy50cmVlID0gdGhpcy5zeWxVdGlscy5idWlsZEdyb3VwVHJlZSh0aGlzLnVuaXRzKTtcblx0XHRpZiAodGhpcy5zeWwuc3RhdHVzICE9ICdwdWJsaXNoZWQnKVxuXHRcdFx0dGhpcy53YXJuKCdDb3VycyBzeWxsYWJ1cyBpcyBub3QgcHVibGlzaGVkJyk7XG5cdH1cblxuXHRtYW5hZ2VDb25mZXJlbmNlKCkge1xuXHRcdHRoaXMuY29uZmVyZW5jZURpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRDbGFzcyk7XG5cdH1cblxuXHRtYW5hZ2VDbGFzcygpIHtcblx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sbXMvY291cnNlcy9tYW5hZ2UvY2xhc3MnLCB0aGlzLmNvdXJzZS5pZCwgdGhpcy5zZWxlY3RlZENsYXNzLmlkLCB0aGlzLm1lbWJlcklkXSk7XG5cdH1cblxuXHRub2RlU2VsZWN0KGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRVbml0ID0gdGhpcy5zZWxlY3RlZE5vZGUuZGF0YTtcblx0XHR9XG5cdH1cblxuXHRicm9hZGNhc3RNZXNzYWdlKCkge1xuXHRcdENvdXJzZU1lbWJlci5saXN0QnlDbGFzcyh0aGlzLCB0aGlzLnNlbGVjdGVkQ2xhc3MuaWQpLnN1YnNjcmliZShtZW1iZXJzID0+IHtcblx0XHRcdGlmIChtZW1iZXJzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgZW1haWxzID0gXy5wbHVjayhtZW1iZXJzLCBcImVtYWlsXCIpO1xuXHRcdFx0XHR0aGlzLm1haWxEaWFsb2cuc2hvdyhlbWFpbHMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJldmlld1VuaXQoKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XG5cdFx0XHR0aGlzLnVuaXRQcmV2aWV3RGlhbG9nLnNob3codGhpcy5zZWxlY3RlZE5vZGUuZGF0YSk7XG5cdFx0fVxuXHR9XG5cbn1cblxuIl19
