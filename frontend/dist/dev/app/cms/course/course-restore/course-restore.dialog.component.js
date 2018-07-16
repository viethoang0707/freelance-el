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
var platform_browser_1 = require("@angular/platform-browser");
var excel_service_1 = require("../../../shared/services/excel.service");
var CourseRestoreDialog = (function (_super) {
    __extends(CourseRestoreDialog, _super);
    function CourseRestoreDialog(sanitizer, excelService) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.excelService = excelService;
        _this.uploadedFiles = [];
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
    CourseRestoreDialog.prototype.show = function (course) {
        this.onShowReceiver.next();
        this.display = true;
        this.course = course;
        this.buildCourseTree();
    };
    CourseRestoreDialog.prototype.buildCourseTree = function () {
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
    CourseRestoreDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    CourseRestoreDialog.prototype.onUpload = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    };
    CourseRestoreDialog.prototype.changeListner = function (event) {
        var _this = this;
        var file = event.files[0];
        this.fileName = file.name;
        this.excelService.importFromJsonFile(file).subscribe(function (data) {
            _this.data = data;
        });
    };
    CourseRestoreDialog.prototype.restoreCourse = function () {
        var subscriptions = [];
        console.log(this.data);
        var output = JSON.parse(this.data);
        var course_faq = output.course_faq;
        var course_material = output.course_material;
        var course_syllabus = output.course_syllabus;
        var course_unit = output.course_unit;
        console.log('course_faq: ', course_faq);
        console.log('course_material: ', course_material);
        console.log('course_syllabus: ', course_syllabus);
        console.log('course_unit: ', course_unit);
    };
    CourseRestoreDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-restore-dialog',
            templateUrl: 'course-restore.dialog.component.html',
            styleUrls: ['course-restore.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, excel_service_1.ExcelService])
    ], CourseRestoreDialog);
    return CourseRestoreDialog;
}(base_component_1.BaseComponent));
exports.CourseRestoreDialog = CourseRestoreDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS1yZXN0b3JlL2NvdXJzZS1yZXN0b3JlLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDhCQUE4QztBQUM5Qyx5RUFBdUU7QUFHdkUsaUZBQStFO0FBRS9FLDhFQUF1RTtBQUN2RSx3RkFBZ0Y7QUFDaEYsZ0dBQXdGO0FBRXhGLDhEQUFtRjtBQUNuRiw4QkFBZ0M7QUFLaEMsOERBQXlEO0FBQ3pELHdFQUFzRTtBQVF0RTtJQUF5Qyx1Q0FBYTtJQThCckQsNkJBQW9CLFNBQXVCLEVBQVUsWUFBMEI7UUFBL0UsWUFDQyxpQkFBTyxTQWFQO1FBZG1CLGVBQVMsR0FBVCxTQUFTLENBQWM7UUFBVSxrQkFBWSxHQUFaLFlBQVksQ0FBYztRQVZ2RSxtQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUdsQyxzQkFBZ0IsR0FBRyw0QkFBZ0IsQ0FBQztRQUU1QixvQkFBYyxHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQzdDLG9CQUFjLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDckQsWUFBTSxHQUFvQixLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELFlBQU0sR0FBb0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUk1RCxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksOEJBQWEsRUFBRSxDQUFDO1FBQ3BDLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxzQ0FBYyxFQUFFLENBQUM7UUFDaEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHFCQUFNLEVBQUUsQ0FBQztRQUMzQixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMseUJBQWEsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO1lBQ2pELE9BQU87Z0JBQ04sS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0Is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QyxJQUFJLGVBQWUsR0FBSSxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzlDLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDN0MsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQWxHVyxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSxzQ0FBc0M7WUFDbkQsU0FBUyxFQUFFLENBQUMscUNBQXFDLENBQUM7U0FDbEQsQ0FBQzt5Q0ErQjhCLCtCQUFZLEVBQXdCLDRCQUFZO09BOUJuRSxtQkFBbUIsQ0FtRy9CO0lBQUQsMEJBQUM7Q0FuR0QsQUFtR0MsQ0FuR3dDLDhCQUFhLEdBbUdyRDtBQW5HWSxrREFBbUIiLCJmaWxlIjoiYXBwL2Ntcy9jb3Vyc2UvY291cnNlLXJlc3RvcmUvY291cnNlLXJlc3RvcmUuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBTeWxsYWJ1c1V0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvc3lsbGFidXMudXRpbHMnO1xuaW1wb3J0IHsgV2ViU29ja2V0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9zb2NrZXQuc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlU3lsbGFidXMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2Utc3lsbGFidXMubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU5vZGUsIE1lbnVJdGVtLCBTZWxlY3RJdGVtLCBNZXNzYWdlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ09VUlNFX1VOSVRfVFlQRSwgQ09VUlNFX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBXb3JrZmxvd1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvd29ya2Zsb3cuc2VydmljZSc7XG5pbXBvcnQgeyBKc29ucCwgUmVxdWVzdE9wdGlvbnMsIEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IENvdXJzZUZhcSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1mYXEubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlTWF0ZXJpYWwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWF0ZXJpYWwubW9kZWwnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBFeGNlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvZXhjZWwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ2NvdXJzZS1yZXN0b3JlLWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnY291cnNlLXJlc3RvcmUuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ2NvdXJzZS1yZXN0b3JlLmRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZVJlc3RvcmVEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzeWw6IENvdXJzZVN5bGxhYnVzO1xuXHRwcml2YXRlIHNlbGVjdGVkTm9kZTogVHJlZU5vZGU7XG5cdHByaXZhdGUgaXRlbXM6IE1lbnVJdGVtW107XG5cdHByaXZhdGUgdW5pdHM6IENvdXJzZVVuaXRbXTtcblx0cHJpdmF0ZSBlbGVjdGVkVW5pdDogQ291cnNlVW5pdDtcblx0cHJpdmF0ZSBzeWxVdGlsczogU3lsbGFidXNVdGlscztcblx0cHJpdmF0ZSBmaWxlTmFtZTogc3RyaW5nO1xuXHRwcml2YXRlIGRhdGE6IHN0cmluZztcblx0cHJpdmF0ZSBjb3Vyc2U6IENvdXJzZTtcblx0cHJpdmF0ZSB1c2VyOiBVc2VyO1xuXHRwcml2YXRlIGZhcXM6IENvdXJzZUZhcVtdO1xuXHRwcml2YXRlIGRvd25sb2FkSnNvbkhyZWY7XG5cdHByaXZhdGUgbWF0ZXJpYWxzOiBDb3Vyc2VNYXRlcmlhbFtdO1xuXHRwcml2YXRlIG91dHB1dDogU3RyaW5nO1xuXHRwcml2YXRlIGNvdXJzZVN0YXR1czogU2VsZWN0SXRlbVtdO1xuXHRwcml2YXRlIG1zZ3M6IE1lc3NhZ2VbXTtcblx0cHJpdmF0ZSB1cGxvYWRlZEZpbGVzOiBhbnlbXSA9IFtdO1xuXHRwcml2YXRlIHRvdGFsOiBudW1iZXI7XG5cdHByaXZhdGUgaHR0cDogSHR0cDtcblx0Q09VUlNFX1VOSVRfVFlQRSA9IENPVVJTRV9VTklUX1RZUEU7XG5cblx0cHJpdmF0ZSBvblNob3dSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblx0cHJpdmF0ZSBvbkhpZGVSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblx0b25TaG93OiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uU2hvd1JlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuXHRvbkhpZGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25IaWRlUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHJpdmF0ZSBleGNlbFNlcnZpY2U6IEV4Y2VsU2VydmljZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zeWxVdGlscyA9IG5ldyBTeWxsYWJ1c1V0aWxzKCk7XG5cdFx0dGhpcy5zeWwgPSBuZXcgQ291cnNlU3lsbGFidXMoKTtcblx0XHR0aGlzLmNvdXJzZSA9IG5ldyBDb3Vyc2UoKTtcblx0XHR0aGlzLmNvdXJzZVN0YXR1cyA9IF8ubWFwKENPVVJTRV9TVEFUVVMsICh2YWwsIGtleSkgPT4ge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0bGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KHZhbCksXG5cdFx0XHRcdHZhbHVlOiBrZXlcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLnVzZXIgPSB0aGlzLmF1dGhTZXJ2aWNlLlVzZXJQcm9maWxlO1xuXHRcdHRoaXMuZmFxcyA9IFtdO1xuXHRcdHRoaXMubWF0ZXJpYWxzID0gW107XG5cdH1cblxuXHRzaG93KGNvdXJzZTogQ291cnNlKSB7XG5cdFx0dGhpcy5vblNob3dSZWNlaXZlci5uZXh0KCk7XG5cdFx0dGhpcy5kaXNwbGF5ID0gdHJ1ZTtcblx0XHR0aGlzLmNvdXJzZSA9IGNvdXJzZTtcblx0XHR0aGlzLmJ1aWxkQ291cnNlVHJlZSgpO1xuXHR9XG5cblx0YnVpbGRDb3Vyc2VUcmVlKCkge1xuXHRcdENvdXJzZVN5bGxhYnVzLmdldCh0aGlzLCB0aGlzLmNvdXJzZS5zeWxsYWJ1c19pZCkuc3Vic2NyaWJlKHN5bD0+IHtcblx0XHRcdHRoaXMuc3lsID0gc3lsO1xuXHRcdFx0Q291cnNlVW5pdC5saXN0QnlDb3Vyc2UodGhpcywgdGhpcy5zeWwuaWQpLnN1YnNjcmliZSh1bml0cyA9PiB7XG5cdFx0XHRcdHRoaXMudW5pdHMgPSB1bml0cztcblx0XHRcdFx0dGhpcy50cmVlID0gdGhpcy5zeWxVdGlscy5idWlsZEdyb3VwVHJlZSh1bml0cyk7XG5cdFx0XHRcdHRoaXMub3V0cHV0ID0gJ1wiY291cnNlLXN5bGxhYnVzXCInLCB0aGlzLnN5bFV0aWxzLmJ1aWxkR3JvdXBUcmVlKHVuaXRzKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0XHR0aGlzLm9uSGlkZVJlY2VpdmVyLm5leHQoKTtcblx0fVxuXG5cdG9uVXBsb2FkKGV2ZW50KSB7XG5cdFx0Zm9yIChsZXQgZmlsZSBvZiBldmVudC5maWxlcykge1xuXHRcdFx0dGhpcy51cGxvYWRlZEZpbGVzLnB1c2goZmlsZSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5tc2dzID0gW107XG5cdFx0dGhpcy5tc2dzLnB1c2goeyBzZXZlcml0eTogJ2luZm8nLCBzdW1tYXJ5OiAnRmlsZSBVcGxvYWRlZCcsIGRldGFpbDogJycgfSk7XG5cdH1cblxuXHRjaGFuZ2VMaXN0bmVyKGV2ZW50OiBhbnkpIHtcblx0XHR2YXIgZmlsZSA9IGV2ZW50LmZpbGVzWzBdO1xuXHRcdHRoaXMuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG5cdFx0dGhpcy5leGNlbFNlcnZpY2UuaW1wb3J0RnJvbUpzb25GaWxlKGZpbGUpLnN1YnNjcmliZShkYXRhID0+IHtcblx0XHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cdFx0fSk7XG5cdH1cblxuXHRyZXN0b3JlQ291cnNlKCkge1xuXHRcdHZhciBzdWJzY3JpcHRpb25zID0gW107XG5cdFx0Y29uc29sZS5sb2codGhpcy5kYXRhKTtcblx0XHR2YXIgb3V0cHV0ID0gSlNPTi5wYXJzZSh0aGlzLmRhdGEpO1xuXHRcdHZhciBjb3Vyc2VfZmFxID0gb3V0cHV0LmNvdXJzZV9mYXE7XG5cdFx0dmFyIGNvdXJzZV9tYXRlcmlhbCA9ICBvdXRwdXQuY291cnNlX21hdGVyaWFsO1xuXHRcdHZhciBjb3Vyc2Vfc3lsbGFidXMgPSBvdXRwdXQuY291cnNlX3N5bGxhYnVzO1xuXHRcdHZhciBjb3Vyc2VfdW5pdCA9IG91dHB1dC5jb3Vyc2VfdW5pdDtcblx0XHRjb25zb2xlLmxvZygnY291cnNlX2ZhcTogJywgY291cnNlX2ZhcSk7XG5cdFx0Y29uc29sZS5sb2coJ2NvdXJzZV9tYXRlcmlhbDogJywgY291cnNlX21hdGVyaWFsKTtcblx0XHRjb25zb2xlLmxvZygnY291cnNlX3N5bGxhYnVzOiAnLCBjb3Vyc2Vfc3lsbGFidXMpO1xuXHRcdGNvbnNvbGUubG9nKCdjb3Vyc2VfdW5pdDogJywgY291cnNlX3VuaXQpO1xuXHR9XG59XG5cbiJdfQ==
