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
        this.uploadInprogress = false;
    };
    CourseMaterialDialog.prototype.uploadFile = function (file) {
        var _this = this;
        this.uploadInprogress = true;
        this.cloudApiService.upload(file, this.authService.CloudAcc.id).subscribe(function (data) {
            _this.uploadInprogress = false;
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.object.url = data["url"];
                    _this.object.filename = file.name;
                });
            }
        }, function () {
            _this.uploadInprogress = false;
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
//# sourceMappingURL=course-material.dialog.component.js.map