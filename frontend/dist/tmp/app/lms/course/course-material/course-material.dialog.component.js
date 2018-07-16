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
            template: "<p-dialog header=\"{{'Course material'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"600\" [responsive]=\"true\" appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">         <div class=\"ui-g ui-fluid form-group\">             <div class=\"ui-g-12 \">                 <span class=\"md-inputfield\">             <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>             <label>{{'Name'|translate}}</label>             <div *ngIf=\"name.invalid && (name.dirty || name.touched)\"               class=\"ui-message ui-messages-error ui-corner-all\">                 <div *ngIf=\"name.errors.required\">                     {{'Name is required' | translate}}                 </div>             </div>         </span>             </div>             <div class=\"ui-g-6\">                 <p-progressBar mode=\"indeterminate\" *ngIf=\"loading\"></p-progressBar>                 <p-fileUpload name=\"uploadLocal\" mode=\"basic\" chooseLabel=\"{{'Upload from computer'|translate}}'\" (onSelect)=\"changeFile($event)\" accept=\"*\" maxFileSize=\"1024*512\" showUploadButton=\"false\">                 </p-fileUpload>                 <span>{{object.filename}}</span>             </div>             <div class=\"ui-g-6\">                 <label>{{'Media type'|translate}}</label>                 <div style=\"margin-bottom:10px\">                     <p-radioButton name=\"type\" value=\"video\" label=\"{{'Video'|translate}}\" [(ngModel)]=\"object.type\" inputId=\"opt1\"></p-radioButton>                 </div>                 <div style=\"margin-bottom:10px\">                     <p-radioButton name=\"type\" value=\"audio\" label=\"{{'Audio'|translate}}\" [(ngModel)]=\"object.type\" inputId=\"opt2\"></p-radioButton>                 </div>                 <div style=\"margin-bottom:10px\">                     <p-radioButton name=\"type\" value=\"file\" label=\"{{'File'|translate}}\" [(ngModel)]=\"object.type\" inputId=\"opt3\"></p-radioButton>                 </div>             </div>         </div>     </form>     <p-footer>         <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"f.ngSubmit.emit()\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], CourseMaterialDialog);
    return CourseMaterialDialog;
}(base_dialog_1.BaseDialog));
exports.CourseMaterialDialog = CourseMaterialDialog;
