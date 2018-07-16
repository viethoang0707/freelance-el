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
var Rx_1 = require("rxjs/Rx");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var course_faq_model_1 = require("../../../shared/models/elearning/course-faq.model");
var course_material_model_1 = require("../../../shared/models/elearning/course-material.model");
var platform_browser_1 = require("@angular/platform-browser");
var CourseBackupDialog = (function (_super) {
    __extends(CourseBackupDialog, _super);
    function CourseBackupDialog(sanitizer) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.onShowReceiver = new Rx_1.Subject();
        _this.onHideReceiver = new Rx_1.Subject();
        _this.onShow = _this.onShowReceiver.asObservable();
        _this.onHide = _this.onHideReceiver.asObservable();
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        _this.course = new course_model_1.Course();
        _this.courseStatus = _.map(constants_1.COURSE_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
        _this.user = _this.authService.UserProfile;
        _this.faqs = [];
        _this.materials = [];
        return _this;
    }
    CourseBackupDialog.prototype.show = function (course) {
        this.onShowReceiver.next();
        this.display = true;
        this.course = course;
        this.buildCourseTree();
    };
    CourseBackupDialog.prototype.buildCourseTree = function () {
        var _this = this;
        course_syllabus_model_1.CourseSyllabus.get(this, this.course.syllabus_id).subscribe(function (syl) {
            _this.syl = syl;
            course_unit_model_1.CourseUnit.listByCourse(_this, _this.syl.id).subscribe(function (units) {
                _this.units = units;
                _this.tree = _this.sylUtils.buildGroupTree(units);
                _this.output = '"course-syllabus"', _this.sylUtils.buildGroupTree(units);
            });
        });
    };
    CourseBackupDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    CourseBackupDialog.prototype.getCourseMaterial = function () {
        var _this = this;
        course_material_model_1.CourseMaterial.listByCourse(this, this.course.id)
            .subscribe(function (materials) {
            _this.materials = materials;
        });
    };
    CourseBackupDialog.prototype.getCourseFaq = function () {
        var _this = this;
        course_faq_model_1.CourseFaq.listByCourse(this, this.course.id)
            .subscribe(function (faqs) {
            _this.faqs = faqs;
        });
    };
    CourseBackupDialog.prototype.backupCourse = function () {
        this.getCourseFaq();
        this.getCourseMaterial();
        this.output = { "course_faq": this.faqs, "course_material": this.materials, "course_syllabus": this.syl, "course_unit": this.units };
        var dataStr = JSON.stringify(this.output);
        var data = "text/json;charset=utf-8," + encodeURIComponent(dataStr);
        var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(dataStr));
        this.downloadJsonHref = uri;
    };
    CourseBackupDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-backup-dialog',
            templateUrl: 'course-backup.dialog.component.html',
            styleUrls: ['course-backup.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], CourseBackupDialog);
    return CourseBackupDialog;
}(base_component_1.BaseComponent));
exports.CourseBackupDialog = CourseBackupDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS1iYWNrdXAvY291cnNlLWJhY2t1cC5kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUNwRSw4QkFBOEM7QUFDOUMseUVBQXVFO0FBRXZFLGlGQUErRTtBQUUvRSw4RUFBdUU7QUFDdkUsd0ZBQWdGO0FBQ2hGLGdHQUF3RjtBQUV4Riw4REFBcUc7QUFHckcsOEJBQWdDO0FBSWhDLHNGQUE4RTtBQUM5RSxnR0FBd0Y7QUFDeEYsOERBQXlEO0FBUXpEO0lBQXdDLHNDQUFhO0lBd0JwRCw0QkFBb0IsU0FBdUI7UUFBM0MsWUFDQyxpQkFBTyxTQWFQO1FBZG1CLGVBQVMsR0FBVCxTQUFTLENBQWM7UUFQM0Msc0JBQWdCLEdBQUcsNEJBQWdCLENBQUM7UUFFNUIsb0JBQWMsR0FBaUIsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUM3QyxvQkFBYyxHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3JELFlBQU0sR0FBb0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3RCxZQUFNLEdBQW9CLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJNUQsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDhCQUFhLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksc0NBQWMsRUFBRSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7UUFDM0IsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLHlCQUFhLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUNqRCxPQUFPO2dCQUNOLEtBQUssRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDekMsS0FBSyxFQUFFLEdBQUc7YUFDVixD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QUcsQ0FBQztJQUM3QixDQUFDO0lBckZXLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztTQUNqRCxDQUFDO3lDQXlCOEIsK0JBQVk7T0F4Qi9CLGtCQUFrQixDQXNGOUI7SUFBRCx5QkFBQztDQXRGRCxBQXNGQyxDQXRGdUMsOEJBQWEsR0FzRnBEO0FBdEZZLGdEQUFrQiIsImZpbGUiOiJhcHAvY21zL2NvdXJzZS9jb3Vyc2UtYmFja3VwL2NvdXJzZS1iYWNrdXAuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBTeWxsYWJ1c1V0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvc3lsbGFidXMudXRpbHMnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlVW5pdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS11bml0Lm1vZGVsJztcbmltcG9ydCB7IENvdXJzZVN5bGxhYnVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXN5bGxhYnVzLm1vZGVsJztcbmltcG9ydCB7IFRyZWVOb2RlLCBNZW51SXRlbSwgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENPVVJTRV9VTklUX1RZUEUsIENPVVJTRV9VTklUX0lDT04sIENPVVJTRV9TVEFUVVMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0RGlhbG9nIH0gZnJvbSAnLi4vY291cnNlLXVuaXQtZGlhbG9nL2NvdXJzZS11bml0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlVW5pdFByZXZpZXdEaWFsb2cgfSBmcm9tICcuLi9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy9jb3Vyc2UtdW5pdC1wcmV2aWV3LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFdvcmtmbG93U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy93b3JrZmxvdy5zZXJ2aWNlJztcbmltcG9ydCB7IENvdXJzZUNlcnRpZmljYXRlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vbG1zL2NvdXJzZS9jb3Vyc2UtY2VydGlmaWNhdGUvY291cnNlLWNlcnRpZmljYXRlLmRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSnNvbnAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IENvdXJzZUZhcSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1mYXEubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWF0ZXJpYWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWF0ZXJpYWwubW9kZWwnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2NvdXJzZS1iYWNrdXAtZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdjb3Vyc2UtYmFja3VwLmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydjb3Vyc2UtYmFja3VwLmRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZUJhY2t1cERpYWxvZyBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0cHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuXHRwcml2YXRlIHN5bDogQ291cnNlU3lsbGFidXM7XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSBpdGVtczogTWVudUl0ZW1bXTtcblx0cHJpdmF0ZSB1bml0czogQ291cnNlVW5pdFtdO1xuXHRwcml2YXRlIGVsZWN0ZWRVbml0OiBDb3Vyc2VVbml0O1xuXHRwcml2YXRlIHN5bFV0aWxzOiBTeWxsYWJ1c1V0aWxzO1xuXHRwcml2YXRlIGNvdXJzZTogQ291cnNlO1xuXHRwcml2YXRlIHVzZXI6IFVzZXI7XG5cdHByaXZhdGUgZmFxczogQ291cnNlRmFxW107XG5cdHByaXZhdGUgZG93bmxvYWRKc29uSHJlZjtcblx0cHJpdmF0ZSBtYXRlcmlhbHM6IENvdXJzZU1hdGVyaWFsW107XG5cdHByaXZhdGUgb3V0cHV0OiBhbnk7XG5cdHByaXZhdGUgY291cnNlU3RhdHVzOiBTZWxlY3RJdGVtW107XG5cdENPVVJTRV9VTklUX1RZUEUgPSBDT1VSU0VfVU5JVF9UWVBFO1xuXG5cdHByaXZhdGUgb25TaG93UmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cdHByaXZhdGUgb25IaWRlUmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG5cdG9uU2hvdzogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vblNob3dSZWNlaXZlci5hc09ic2VydmFibGUoKTtcblx0b25IaWRlOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uSGlkZVJlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc3lsVXRpbHMgPSBuZXcgU3lsbGFidXNVdGlscygpO1xuXHRcdHRoaXMuc3lsID0gbmV3IENvdXJzZVN5bGxhYnVzKCk7XG5cdFx0dGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XG5cdFx0dGhpcy5jb3Vyc2VTdGF0dXMgPSBfLm1hcChDT1VSU0VfU1RBVFVTLCAodmFsLCBrZXkpID0+IHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGxhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCh2YWwpLFxuXHRcdFx0XHR2YWx1ZToga2V5XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy51c2VyID0gdGhpcy5hdXRoU2VydmljZS5Vc2VyUHJvZmlsZTtcblx0XHR0aGlzLmZhcXMgPSBbXTtcblx0XHR0aGlzLm1hdGVyaWFscyA9IFtdO1xuXHR9XG5cblx0c2hvdyhjb3Vyc2U6IENvdXJzZSkge1xuXHRcdHRoaXMub25TaG93UmVjZWl2ZXIubmV4dCgpO1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5jb3Vyc2UgPSBjb3Vyc2U7XG5cdFx0dGhpcy5idWlsZENvdXJzZVRyZWUoKTtcblx0fVxuXG5cdGJ1aWxkQ291cnNlVHJlZSgpIHtcblx0XHRDb3Vyc2VTeWxsYWJ1cy5nZXQodGhpcywgdGhpcy5jb3Vyc2Uuc3lsbGFidXNfaWQpLnN1YnNjcmliZShzeWw9PiB7XG5cdFx0XHR0aGlzLnN5bCA9IHN5bDtcblx0XHRcdENvdXJzZVVuaXQubGlzdEJ5Q291cnNlKHRoaXMsIHRoaXMuc3lsLmlkKS5zdWJzY3JpYmUodW5pdHMgPT4ge1xuXHRcdFx0XHR0aGlzLnVuaXRzID0gdW5pdHM7XG5cdFx0XHRcdHRoaXMudHJlZSA9IHRoaXMuc3lsVXRpbHMuYnVpbGRHcm91cFRyZWUodW5pdHMpO1xuXHRcdFx0XHR0aGlzLm91dHB1dCA9ICdcImNvdXJzZS1zeWxsYWJ1c1wiJywgdGhpcy5zeWxVdGlscy5idWlsZEdyb3VwVHJlZSh1bml0cyk7XG5cdFx0XHR9KTtcblx0XHR9KVxuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0XHR0aGlzLm9uSGlkZVJlY2VpdmVyLm5leHQoKTtcblx0fVxuXG5cdGdldENvdXJzZU1hdGVyaWFsKCkge1xuXHRcdENvdXJzZU1hdGVyaWFsLmxpc3RCeUNvdXJzZSh0aGlzLCB0aGlzLmNvdXJzZS5pZClcblx0XHRcdC5zdWJzY3JpYmUobWF0ZXJpYWxzID0+IHtcblx0XHRcdFx0dGhpcy5tYXRlcmlhbHMgPSBtYXRlcmlhbHM7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGdldENvdXJzZUZhcSgpIHtcblx0XHRDb3Vyc2VGYXEubGlzdEJ5Q291cnNlKHRoaXMsIHRoaXMuY291cnNlLmlkKVxuXHRcdFx0LnN1YnNjcmliZShmYXFzID0+IHtcblx0XHRcdFx0dGhpcy5mYXFzID0gZmFxcztcblx0XHRcdH0pO1xuXHR9XG5cblx0YmFja3VwQ291cnNlKCkge1xuXHRcdHRoaXMuZ2V0Q291cnNlRmFxKCk7XG5cdFx0dGhpcy5nZXRDb3Vyc2VNYXRlcmlhbCgpO1xuXHRcdHRoaXMub3V0cHV0ID0geyBcImNvdXJzZV9mYXFcIjogdGhpcy5mYXFzLCBcImNvdXJzZV9tYXRlcmlhbFwiOiB0aGlzLm1hdGVyaWFscywgXCJjb3Vyc2Vfc3lsbGFidXNcIjogdGhpcy5zeWwsIFwiY291cnNlX3VuaXRcIjogdGhpcy51bml0cyB9O1xuXHRcdGxldCBkYXRhU3RyID0gSlNPTi5zdHJpbmdpZnkodGhpcy5vdXRwdXQpO1xuXHRcdGxldCBkYXRhID0gXCJ0ZXh0L2pzb247Y2hhcnNldD11dGYtOCxcIiArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhU3RyKTtcblx0XHRsZXQgdXJpID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybChcImRhdGE6dGV4dC9qc29uO2NoYXJzZXQ9VVRGLTgsXCIgKyBlbmNvZGVVUklDb21wb25lbnQoZGF0YVN0cikpO1xuXHRcdHRoaXMuZG93bmxvYWRKc29uSHJlZiA9IHVyaTtcblx0fVxufVxuXG4iXX0=
