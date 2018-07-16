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
var http_1 = require("@angular/http");
var constants_1 = require("../../../shared/models/constants");
var ProjectContentDialog = (function (_super) {
    __extends(ProjectContentDialog, _super);
    function ProjectContentDialog(http, ngZone) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.ngZone = ngZone;
        _this.locale = constants_1.DEFAULT_DATE_LOCALE;
        return _this;
    }
    ProjectContentDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.start && object.end) {
                _this.rangeDates = [object.start, object.end];
            }
            var lang = _this.translateService.currentLang;
            _this.http.get("/assets/i18n/calendar." + lang + ".json")
                .subscribe(function (res) {
                _this.locale = res.json();
            });
        });
    };
    ProjectContentDialog.prototype.onDateSelect = function ($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    };
    ProjectContentDialog.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    ProjectContentDialog.prototype.uploadFile = function (file) {
        var _this = this;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.object.file_url = data["url"];
                    _this.object.filename = data["filename"];
                });
            }
        }, function () {
        });
    };
    ProjectContentDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-content-dialog',
            template: "<p-dialog header=\"{{'Project'|translate}}\" [(visible)]=\"display\" modal=\"false\" width=\"960\" [responsive]=\"true\" appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">         <p-scrollPanel [style]=\"{width: '100%', height: '450px'}\">             <div class=\"ui-g ui-fluid form-group\">                 <div class=\"ui-g-6\">                     <div class=\"ui-g-12\">                         <span class=\"md-inputfield\">               <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>               <label>{{'Name'|translate}}</label>               <div *ngIf=\"name.invalid && (name.dirty || name.touched)\"                  class=\"ui-message ui-messages-error ui-corner-all\">                 <div *ngIf=\"name.errors.required\">                     {{'Name is required' | translate}}                 </div>               </div>           </span>                     </div>                     <div class=\"ui-g-12\">                         <label>{{'Start'|translate}}</label>                         <p-calendar [(ngModel)]=\"object.start\" showTime=\"true\" hourFormat=\"24\" #start=\"ngModel\" name=\"start\" required=\"true\" dateFormat=\"dd/mm/yy\" [showIcon]=\"true\"></p-calendar>                         <div *ngIf=\"start.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin: 10px 0 20px;\">                             <div *ngIf=\"start.errors.required\">                                 {{'Project start time is required' | translate}}                             </div>                         </div>                     </div>                     <div class=\"ui-g-12\">                         <label>{{'End'|translate}}</label>                         <p-calendar [(ngModel)]=\"object.end\" showTime=\"true\" hourFormat=\"24\" #end=\"ngModel\" name=\"end\" required=\"true\" [showIcon]=\"true\" dateFormat=\"dd/mm/yy\"></p-calendar>                         <div *ngIf=\"end.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin: 10px 0 20px;\">                             <div *ngIf=\"end.errors.required\">                                 {{'Project end time is required' | translate}}                             </div>                         </div>                     </div>                     <div class=\"ui-g-12\">                         <p-progressBar mode=\"indeterminate\" *ngIf=\"loading\"></p-progressBar>                         <p-fileUpload name=\"uploadLocal\" mode=\"basic\" chooseLabel=\"{{'Upload from computer'|translate}}'\" (onSelect)=\"changeFile($event)\" accept=\"*\" maxFileSize=\"1024*512\" showUploadButton=\"false\">                         </p-fileUpload>                         <a href=\"{{object.file_url}}\" target=\"_blank\" *ngIf=\"object.file_url\">{{object.filename}}</a>                     </div>                 </div>                 <div class=\"ui-g-6\">                     <div>                         <label>{{'Content'|translate}}</label>                         <p-editor [(ngModel)]=\"object.content\" [style]=\"{'height':'120px'}\" name=\"content\">                         </p-editor>                     </div>                 </div>             </div>         </p-scrollPanel>     </form>     <p-footer>         <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"f.ngSubmit.emit()\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [http_1.Http, core_1.NgZone])
    ], ProjectContentDialog);
    return ProjectContentDialog;
}(base_dialog_1.BaseDialog));
exports.ProjectContentDialog = ProjectContentDialog;
