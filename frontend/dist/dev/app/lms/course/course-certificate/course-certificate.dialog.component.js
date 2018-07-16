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
var CourseCertificateDialog = (function (_super) {
    __extends(CourseCertificateDialog, _super);
    function CourseCertificateDialog() {
        return _super.call(this) || this;
    }
    CourseCertificateDialog.prototype.ngOnInit = function () {
    };
    CourseCertificateDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-certificate-dialog',
            templateUrl: 'course-certificate.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], CourseCertificateDialog);
    return CourseCertificateDialog;
}(base_dialog_1.BaseDialog));
exports.CourseCertificateDialog = CourseCertificateDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NvdXJzZS1jZXJ0aWZpY2F0ZS9jb3Vyc2UtY2VydGlmaWNhdGUuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0U7QUFLaEUsMkVBQXlFO0FBV3pFO0lBQTZDLDJDQUF1QjtJQUVuRTtlQUNDLGlCQUFPO0lBQ1IsQ0FBQztJQUVELDBDQUFRLEdBQVI7SUFDQSxDQUFDO0lBUFcsdUJBQXVCO1FBTG5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxXQUFXLEVBQUUsMENBQTBDO1NBQzFELENBQUM7O09BQ1csdUJBQXVCLENBU25DO0lBQUQsOEJBQUM7Q0FURCxBQVNDLENBVDRDLHdCQUFVLEdBU3REO0FBVFksMERBQXVCIiwiZmlsZSI6ImFwcC9sbXMvY291cnNlL2NvdXJzZS1jZXJ0aWZpY2F0ZS9jb3Vyc2UtY2VydGlmaWNhdGUuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGV9ICAgICBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmRpYWxvZyc7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1jZXJ0aWZpY2F0ZS5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvdXJzZS1jZXJ0aWZpY2F0ZS1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnY291cnNlLWNlcnRpZmljYXRlLmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIENvdXJzZUNlcnRpZmljYXRlRGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxDZXJ0aWZpY2F0ZT4ge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0fVxuXG59XG5cbiJdfQ==
