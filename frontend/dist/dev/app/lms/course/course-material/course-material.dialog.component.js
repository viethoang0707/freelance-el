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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var CourseMaterialDialog = (function (_super) {
    __extends(CourseMaterialDialog, _super);
    function CourseMaterialDialog(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        return _this;
    }
    CourseMaterialDialog.prototype.ngOnInit = function () {
    };
    CourseMaterialDialog.prototype.uploadFile = function (file) {
        var _this = this;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.object.url = data["url"];
                    _this.object.filename = file.name;
                });
            }
        }, function () {
        });
    };
    CourseMaterialDialog.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    CourseMaterialDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-material-dialog',
            templateUrl: 'course-material.dialog.component.html',
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], CourseMaterialDialog);
    return CourseMaterialDialog;
}(base_dialog_1.BaseDialog));
exports.CourseMaterialDialog = CourseMaterialDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS1tYXRlcmlhbC9jb3Vyc2UtbWF0ZXJpYWwuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0U7QUFLaEUsMkVBQXlFO0FBV3pFO0lBQTBDLHdDQUEwQjtJQUluRSw4QkFBb0IsTUFBYztRQUFsQyxZQUNDLGlCQUFPLFNBQ1A7UUFGbUIsWUFBTSxHQUFOLE1BQU0sQ0FBUTs7SUFFbEMsQ0FBQztJQUdELHVDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLElBQUk7UUFBZixpQkFhQztRQVpBLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQy9FLFVBQUEsSUFBSTtZQUNILElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNuQixLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDZixLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDO2FBQ0g7UUFDRixDQUFDLEVBQ0Q7UUFDQSxDQUFDLENBQ0QsQ0FBQztJQUNILENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsS0FBVTtRQUNwQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQTlCVyxvQkFBb0I7UUFMaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFdBQVcsRUFBRSx1Q0FBdUM7U0FDdkQsQ0FBQzt5Q0FLMkIsYUFBTTtPQUp0QixvQkFBb0IsQ0FvQ2hDO0lBQUQsMkJBQUM7Q0FwQ0QsQUFvQ0MsQ0FwQ3lDLHdCQUFVLEdBb0NuRDtBQXBDWSxvREFBb0IiLCJmaWxlIjoiYXBwL2xtcy9jb3Vyc2UvY291cnNlLW1hdGVyaWFsL2NvdXJzZS1tYXRlcmlhbC5kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZX0gICAgIGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuZGlhbG9nJztcbmltcG9ydCB7IENvdXJzZU1hdGVyaWFsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLW1hdGVyaWFsLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY291cnNlLW1hdGVyaWFsLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICdjb3Vyc2UtbWF0ZXJpYWwuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlTWF0ZXJpYWxEaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPENvdXJzZU1hdGVyaWFsPiB7XG5cblx0cHJpdmF0ZSB1cGxvYWRJbnByb2dyZXNzOiBib29sZWFuO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcblx0XHRzdXBlcigpO1xuXHR9XG5cblxuXHRuZ09uSW5pdCgpIHtcblx0fVxuXG5cdHVwbG9hZEZpbGUoZmlsZSkge1xuXHRcdHRoaXMuZmlsZUFwaVNlcnZpY2UudXBsb2FkKGZpbGUsIHRoaXMuYXV0aFNlcnZpY2UuTG9naW5Ub2tlbi5jbG91ZF9pZCkuc3Vic2NyaWJlKFxuXHRcdFx0ZGF0YSA9PiB7XG5cdFx0XHRcdGlmIChkYXRhW1wicmVzdWx0XCJdKSB7XG5cdFx0XHRcdFx0dGhpcy5uZ1pvbmUucnVuKCgpPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vYmplY3QudXJsID0gZGF0YVtcInVybFwiXTtcblx0XHRcdFx0XHRcdHRoaXMub2JqZWN0LmZpbGVuYW1lID0gZmlsZS5uYW1lO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0KCkgPT4ge1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRjaGFuZ2VGaWxlKGV2ZW50OiBhbnkpIHtcblx0XHRsZXQgZmlsZSA9IGV2ZW50LmZpbGVzWzBdO1xuXHRcdHRoaXMudXBsb2FkRmlsZShmaWxlKTtcblx0fVxuXG5cblxuXG5cbn1cblxuIl19
