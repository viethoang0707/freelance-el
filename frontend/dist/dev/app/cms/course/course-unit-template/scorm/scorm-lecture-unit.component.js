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
var lecture_scorm_model_1 = require("../../../../shared/models/elearning/lecture-scorm.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var SCORMLectureCourseUnitComponent = (function (_super) {
    __extends(SCORMLectureCourseUnitComponent, _super);
    function SCORMLectureCourseUnitComponent(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.lecture = new lecture_scorm_model_1.SCORMLecture();
        _this.blockedUpload = false;
        return _this;
    }
    SCORMLectureCourseUnitComponent.prototype.render = function (unit) {
        var _this = this;
        this.unit = unit;
        lecture_scorm_model_1.SCORMLecture.byCourseUnit(this, unit.id).subscribe(function (lecture) {
            if (lecture)
                _this.lecture = lecture;
            else {
                var lecture = new lecture_scorm_model_1.SCORMLecture();
                lecture.unit_id = _this.unit.id;
                _this.lecture = lecture;
            }
        });
    };
    SCORMLectureCourseUnitComponent.prototype.saveEditor = function () {
        return Rx_1.Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
    };
    SCORMLectureCourseUnitComponent.prototype.uploadFile = function (file) {
        var _this = this;
        this.blockedUpload = true;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.lecture.package_url = data["url"];
                    var serverFile = data["filename"];
                    _this.fileApiService.unzip(serverFile, _this.authService.LoginToken.cloud_id)
                        .subscribe(function (data) {
                        _this.lecture.base_url = data["url"];
                        _this.blockedUpload = false;
                    }, function () {
                        _this.blockedUpload = false;
                    });
                });
            }
        }, function () {
            _this.blockedUpload = false;
        });
    };
    SCORMLectureCourseUnitComponent.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SCORMLectureCourseUnitComponent.prototype, "mode", void 0);
    SCORMLectureCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'scorm-lecture-course-unit',
            templateUrl: 'scorm-lecture-unit.component.html',
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'scorm'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], SCORMLectureCourseUnitComponent);
    return SCORMLectureCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.SCORMLectureCourseUnitComponent = SCORMLectureCourseUnitComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3Njb3JtL3Njb3JtLWxlY3R1cmUtdW5pdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJGO0FBQzNGLDhCQUE4QztBQUc5QywrRkFBdUY7QUFDdkYsb0ZBQWtGO0FBSWxGLG9EQUF1RDtBQWV2RDtJQUFxRCxtREFBYTtJQU9qRSx5Q0FBb0IsTUFBYztRQUFsQyxZQUNDLGlCQUFPLFNBR1A7UUFKbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUVqQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQVksRUFBRSxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxhQUFhLEdBQUksS0FBSyxDQUFDOztJQUM3QixDQUFDO0lBR0QsZ0RBQU0sR0FBTixVQUFPLElBQWdCO1FBQXZCLGlCQVlDO1FBWEEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsa0NBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxPQUFxQjtZQUN4RSxJQUFJLE9BQU87Z0JBQ1YsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7aUJBQ25CO2dCQUNKLElBQUksT0FBTyxHQUFHLElBQUksa0NBQVksRUFBRSxDQUFDO2dCQUNqQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUMvQixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUN2QjtRQUVGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG9EQUFVLEdBQVY7UUFDQyxPQUFPLGVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsb0RBQVUsR0FBVixVQUFXLElBQUk7UUFBZixpQkFxQkM7UUFwQkEsSUFBSSxDQUFDLGFBQWEsR0FBSSxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDL0UsVUFBQSxJQUFJO1lBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUNmLEtBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO29CQUNqQyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO3lCQUMzRSxTQUFTLENBQUMsVUFBQyxJQUFJO3dCQUNmLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDcEMsS0FBSSxDQUFDLGFBQWEsR0FBSSxLQUFLLENBQUM7b0JBQzdCLENBQUMsRUFBRTt3QkFDRixLQUFJLENBQUMsYUFBYSxHQUFJLEtBQUssQ0FBQztvQkFDN0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7YUFDSDtRQUNGLENBQUMsRUFBRTtZQUNGLEtBQUksQ0FBQyxhQUFhLEdBQUksS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FDRCxDQUFDO0lBQ0gsQ0FBQztJQUVELG9EQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ3BCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBeERRO1FBQVIsWUFBSyxFQUFFOztpRUFBTTtJQUZGLCtCQUErQjtRQVIzQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsV0FBVyxFQUFFLG1DQUFtQztTQUNoRCxDQUFDO1FBQ0QsbUNBQWtCLENBQUM7WUFDbkIsSUFBSSxFQUFFLE9BQU87U0FDYixDQUFDO3lDQVEyQixhQUFNO09BUHRCLCtCQUErQixDQTZEM0M7SUFBRCxzQ0FBQztDQTdERCxBQTZEQyxDQTdEb0QsOEJBQWEsR0E2RGpFO0FBN0RZLDBFQUErQiIsImZpbGUiOiJhcHAvY21zL2NvdXJzZS9jb3Vyc2UtdW5pdC10ZW1wbGF0ZS9zY29ybS9zY29ybS1sZWN0dXJlLXVuaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbk9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL29wdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBTQ09STUxlY3R1cmUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sZWN0dXJlLXNjb3JtLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBERUZBVUxUX1BBU1NXT1JELCBHUk9VUF9DQVRFR09SWSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ291cnNlVW5pdFRlbXBsYXRlIH0gZnJvbSAnLi4vdW5pdC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgSUNvdXJzZVVuaXQgfSBmcm9tICcuLi91bml0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0ICogYXMgUmVjb3JkUlRDIGZyb20gJ3JlY29yZHJ0Yyc7XG5pbXBvcnQgeyBWaWRlb0xlY3R1cmUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sZWN0dXJlLXZpZGVvLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdzY29ybS1sZWN0dXJlLWNvdXJzZS11bml0Jyxcblx0dGVtcGxhdGVVcmw6ICdzY29ybS1sZWN0dXJlLXVuaXQuY29tcG9uZW50Lmh0bWwnLFxufSlcbkBDb3Vyc2VVbml0VGVtcGxhdGUoe1xuXHR0eXBlOiAnc2Nvcm0nXG59KVxuZXhwb3J0IGNsYXNzIFNDT1JNTGVjdHVyZUNvdXJzZVVuaXRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgSUNvdXJzZVVuaXQge1xuXG5cdEBJbnB1dCgpIG1vZGU7XG5cdHByaXZhdGUgdW5pdDogQ291cnNlVW5pdDtcblx0cHJpdmF0ZSBsZWN0dXJlOiBTQ09STUxlY3R1cmU7XG5cdHByaXZhdGUgYmxvY2tlZFVwbG9hZDogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmxlY3R1cmUgPSBuZXcgU0NPUk1MZWN0dXJlKCk7XG5cdFx0dGhpcy5ibG9ja2VkVXBsb2FkID0gIGZhbHNlO1xuXHR9XG5cblxuXHRyZW5kZXIodW5pdDogQ291cnNlVW5pdCkge1xuXHRcdHRoaXMudW5pdCA9IHVuaXQ7XG5cdFx0U0NPUk1MZWN0dXJlLmJ5Q291cnNlVW5pdCh0aGlzLCB1bml0LmlkKS5zdWJzY3JpYmUoKGxlY3R1cmU6IFNDT1JNTGVjdHVyZSkgPT4ge1xuXHRcdFx0aWYgKGxlY3R1cmUpXG5cdFx0XHRcdHRoaXMubGVjdHVyZSA9IGxlY3R1cmU7XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dmFyIGxlY3R1cmUgPSBuZXcgU0NPUk1MZWN0dXJlKCk7XG5cdFx0XHRcdGxlY3R1cmUudW5pdF9pZCA9IHRoaXMudW5pdC5pZDtcblx0XHRcdFx0dGhpcy5sZWN0dXJlID0gbGVjdHVyZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdH0pO1xuXHR9XG5cblx0c2F2ZUVkaXRvcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuXHRcdHJldHVybiBPYnNlcnZhYmxlLmZvcmtKb2luKHRoaXMudW5pdC5zYXZlKHRoaXMpLCB0aGlzLmxlY3R1cmUuc2F2ZSh0aGlzKSk7XG5cdH1cblxuXHR1cGxvYWRGaWxlKGZpbGUpIHtcblx0XHR0aGlzLmJsb2NrZWRVcGxvYWQgPSAgdHJ1ZTtcblx0XHR0aGlzLmZpbGVBcGlTZXJ2aWNlLnVwbG9hZChmaWxlLCB0aGlzLmF1dGhTZXJ2aWNlLkxvZ2luVG9rZW4uY2xvdWRfaWQpLnN1YnNjcmliZShcblx0XHRcdGRhdGEgPT4ge1xuXHRcdFx0XHRpZiAoZGF0YVtcInJlc3VsdFwiXSkge1xuXHRcdFx0XHRcdHRoaXMubmdab25lLnJ1bigoKT0+IHtcblx0XHRcdFx0XHRcdHRoaXMubGVjdHVyZS5wYWNrYWdlX3VybCA9IGRhdGFbXCJ1cmxcIl07XG5cdFx0XHRcdFx0XHR2YXIgc2VydmVyRmlsZSA9IGRhdGFbXCJmaWxlbmFtZVwiXVxuXHRcdFx0XHRcdFx0dGhpcy5maWxlQXBpU2VydmljZS51bnppcChzZXJ2ZXJGaWxlLCAgdGhpcy5hdXRoU2VydmljZS5Mb2dpblRva2VuLmNsb3VkX2lkKVxuXHRcdFx0XHRcdFx0LnN1YnNjcmliZSgoZGF0YSk9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMubGVjdHVyZS5iYXNlX3VybCA9IGRhdGFbXCJ1cmxcIl07XG5cdFx0XHRcdFx0XHRcdHRoaXMuYmxvY2tlZFVwbG9hZCA9ICBmYWxzZTtcblx0XHRcdFx0XHRcdH0sICgpPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmJsb2NrZWRVcGxvYWQgPSAgZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgKCk9PiB7XG5cdFx0XHRcdHRoaXMuYmxvY2tlZFVwbG9hZCA9ICBmYWxzZTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0Y2hhbmdlRmlsZShldmVudDogYW55KSB7XG5cdFx0bGV0IGZpbGUgPSBldmVudC5maWxlc1swXTtcblx0XHR0aGlzLnVwbG9hZEZpbGUoZmlsZSk7XG5cdH1cblxuXG59XG5cbiJdfQ==
