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
var lecture_slide_model_1 = require("../../../../shared/models/elearning/lecture-slide.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var SlideLectureCourseUnitComponent = (function (_super) {
    __extends(SlideLectureCourseUnitComponent, _super);
    function SlideLectureCourseUnitComponent(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.lecture = new lecture_slide_model_1.SlideLecture();
        return _this;
    }
    SlideLectureCourseUnitComponent.prototype.render = function (unit) {
        var _this = this;
        this.unit = unit;
        lecture_slide_model_1.SlideLecture.byCourseUnit(this, unit.id).subscribe(function (lecture) {
            if (lecture)
                _this.lecture = lecture;
            else {
                var lecture = new lecture_slide_model_1.SlideLecture();
                lecture.unit_id = _this.unit.id;
                _this.lecture = lecture;
            }
        });
    };
    SlideLectureCourseUnitComponent.prototype.saveEditor = function () {
        return Rx_1.Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
    };
    SlideLectureCourseUnitComponent.prototype.uploadFile = function (file) {
        var _this = this;
        this.lecture.filename = file.name;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    if (file.name.endsWith('pdf'))
                        _this.lecture.slide_url = data["url"];
                    else {
                        var serverFile = data["filename"];
                        _this.fileApiService.convert2Pdf(serverFile, _this.authService.LoginToken.cloud_id).subscribe(function (data) {
                            _this.lecture.slide_url = data["url"];
                        });
                    }
                });
            }
        });
    };
    SlideLectureCourseUnitComponent.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlideLectureCourseUnitComponent.prototype, "mode", void 0);
    SlideLectureCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'slide-lecture-course-unit',
            templateUrl: 'slide-lecture-unit.component.html',
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'slide'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], SlideLectureCourseUnitComponent);
    return SlideLectureCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.SlideLectureCourseUnitComponent = SlideLectureCourseUnitComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3NsaWRlL3NsaWRlLWxlY3R1cmUtdW5pdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJGO0FBQzNGLDhCQUE4QztBQUc5QywrRkFBdUY7QUFDdkYsb0ZBQWtGO0FBSWxGLG9EQUF1RDtBQWV2RDtJQUFxRCxtREFBYTtJQU9qRSx5Q0FBb0IsTUFBYztRQUFsQyxZQUNDLGlCQUFPLFNBRVA7UUFIbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUVqQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQVksRUFBRSxDQUFDOztJQUNuQyxDQUFDO0lBR0QsZ0RBQU0sR0FBTixVQUFPLElBQWdCO1FBQXZCLGlCQWFDO1FBWkEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsa0NBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFxQjtZQUN4RSxJQUFJLE9BQU87Z0JBQ1YsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7aUJBQ25CO2dCQUNKLElBQUksT0FBTyxHQUFHLElBQUksa0NBQVksRUFBRSxDQUFDO2dCQUNqQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUMvQixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUN2QjtRQUVGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG9EQUFVLEdBQVY7UUFDQyxPQUFPLGVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsb0RBQVUsR0FBVixVQUFXLElBQUk7UUFBZixpQkFtQkM7UUFqQkEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUNoRixVQUFBLElBQUk7WUFDSCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbkIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7d0JBQzVCLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDakM7d0JBQ0osSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO3dCQUNqQyxLQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTs0QkFDaEcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN0QyxDQUFDLENBQUMsQ0FBQztxQkFDSDtnQkFDRixDQUFDLENBQUMsQ0FBQzthQUNIO1FBQ0YsQ0FBQyxDQUNELENBQUM7SUFDSCxDQUFDO0lBRUQsb0RBQVUsR0FBVixVQUFXLEtBQVU7UUFDcEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUF0RFE7UUFBUixZQUFLLEVBQUU7O2lFQUFNO0lBRkYsK0JBQStCO1FBUjNDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxXQUFXLEVBQUUsbUNBQW1DO1NBQ2hELENBQUM7UUFDRCxtQ0FBa0IsQ0FBQztZQUNuQixJQUFJLEVBQUUsT0FBTztTQUNiLENBQUM7eUNBUTJCLGFBQU07T0FQdEIsK0JBQStCLENBMkQzQztJQUFELHNDQUFDO0NBM0RELEFBMkRDLENBM0RvRCw4QkFBYSxHQTJEakU7QUEzRFksMEVBQStCIiwiZmlsZSI6ImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3NsaWRlL3NsaWRlLWxlY3R1cmUtdW5pdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uT3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvb3B0aW9uLm1vZGVsJztcbmltcG9ydCB7IFNsaWRlTGVjdHVyZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xlY3R1cmUtc2xpZGUubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IERFRkFVTFRfUEFTU1dPUkQsIEdST1VQX0NBVEVHT1JZIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0VGVtcGxhdGUgfSBmcm9tICcuLi91bml0LmRlY29yYXRvcic7XG5pbXBvcnQgeyBJQ291cnNlVW5pdCB9IGZyb20gJy4uL3VuaXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvdXJzZVVuaXQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtdW5pdC5tb2RlbCc7XG5pbXBvcnQgKiBhcyBSZWNvcmRSVEMgZnJvbSAncmVjb3JkcnRjJztcbmltcG9ydCB7IFZpZGVvTGVjdHVyZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xlY3R1cmUtdmlkZW8ubW9kZWwnO1xuXG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3NsaWRlLWxlY3R1cmUtY291cnNlLXVuaXQnLFxuXHR0ZW1wbGF0ZVVybDogJ3NsaWRlLWxlY3R1cmUtdW5pdC5jb21wb25lbnQuaHRtbCcsXG59KVxuQENvdXJzZVVuaXRUZW1wbGF0ZSh7XG5cdHR5cGU6ICdzbGlkZSdcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVMZWN0dXJlQ291cnNlVW5pdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBJQ291cnNlVW5pdCB7XG5cblx0QElucHV0KCkgbW9kZTtcblx0cHJpdmF0ZSB1bml0OiBDb3Vyc2VVbml0O1xuXHRwcml2YXRlIGxlY3R1cmU6IFNsaWRlTGVjdHVyZTtcblxuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubGVjdHVyZSA9IG5ldyBTbGlkZUxlY3R1cmUoKTtcblx0fVxuXG5cblx0cmVuZGVyKHVuaXQ6IENvdXJzZVVuaXQpIHtcblx0XHR0aGlzLnVuaXQgPSB1bml0O1xuXHRcdFxuXHRcdFNsaWRlTGVjdHVyZS5ieUNvdXJzZVVuaXQodGhpcywgdW5pdC5pZCkuc3Vic2NyaWJlKChsZWN0dXJlOiBTbGlkZUxlY3R1cmUpID0+IHtcblx0XHRcdGlmIChsZWN0dXJlKVxuXHRcdFx0XHR0aGlzLmxlY3R1cmUgPSBsZWN0dXJlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHZhciBsZWN0dXJlID0gbmV3IFNsaWRlTGVjdHVyZSgpO1xuXHRcdFx0XHRsZWN0dXJlLnVuaXRfaWQgPSB0aGlzLnVuaXQuaWQ7XG5cdFx0XHRcdHRoaXMubGVjdHVyZSA9IGxlY3R1cmU7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHR9KTtcblx0fVxuXG5cdHNhdmVFZGl0b3IoKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHRyZXR1cm4gT2JzZXJ2YWJsZS5mb3JrSm9pbih0aGlzLnVuaXQuc2F2ZSh0aGlzKSwgdGhpcy5sZWN0dXJlLnNhdmUodGhpcykpO1xuXHR9XG5cblx0dXBsb2FkRmlsZShmaWxlKSB7XG5cdFx0XG5cdFx0dGhpcy5sZWN0dXJlLmZpbGVuYW1lID0gZmlsZS5uYW1lO1xuXHRcdHRoaXMuZmlsZUFwaVNlcnZpY2UudXBsb2FkKGZpbGUsICB0aGlzLmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4uY2xvdWRfaWQpLnN1YnNjcmliZShcblx0XHRcdGRhdGEgPT4ge1xuXHRcdFx0XHRpZiAoZGF0YVtcInJlc3VsdFwiXSkge1xuXHRcdFx0XHRcdHRoaXMubmdab25lLnJ1bigoKT0+IHtcblx0XHRcdFx0XHRcdGlmIChmaWxlLm5hbWUuZW5kc1dpdGgoJ3BkZicpKVxuXHRcdFx0XHRcdFx0XHR0aGlzLmxlY3R1cmUuc2xpZGVfdXJsID0gZGF0YVtcInVybFwiXTtcblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgc2VydmVyRmlsZSA9IGRhdGFbXCJmaWxlbmFtZVwiXVxuXHRcdFx0XHRcdFx0XHR0aGlzLmZpbGVBcGlTZXJ2aWNlLmNvbnZlcnQyUGRmKHNlcnZlckZpbGUsIHRoaXMuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbi5jbG91ZF9pZCkuc3Vic2NyaWJlKChkYXRhKT0+IHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmxlY3R1cmUuc2xpZGVfdXJsID0gZGF0YVtcInVybFwiXTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0Y2hhbmdlRmlsZShldmVudDogYW55KSB7XG5cdFx0bGV0IGZpbGUgPSBldmVudC5maWxlc1swXTtcblx0XHR0aGlzLnVwbG9hZEZpbGUoZmlsZSk7XG5cdH1cblxuXG59XG5cbiJdfQ==
