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
var base_component_1 = require("../../../shared/components/base/base.component");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
require("rxjs/add/observable/timer");
var ProjectSubmissionDialog = (function (_super) {
    __extends(ProjectSubmissionDialog, _super);
    function ProjectSubmissionDialog(ngZone) {
        var _this = _super.call(this) || this;
        _this.ngZone = ngZone;
        _this.onConfirmReceiver = new Rx_1.Subject();
        _this.onConfirm = _this.onConfirmReceiver.asObservable();
        _this.display = false;
        _this.submit = new project_submission_model_1.ProjectSubmission();
        return _this;
    }
    ProjectSubmissionDialog.prototype.show = function (project, member) {
        this.display = true;
        this.submit = new project_submission_model_1.ProjectSubmission();
        this.submit.member_id = member.id;
        this.submit.project_id = project.id;
    };
    ProjectSubmissionDialog.prototype.hide = function () {
        this.display = false;
    };
    ProjectSubmissionDialog.prototype.confirm = function () {
        var _this = this;
        if (!this.submit.file_url)
            this.error('You have not submiited any attachment');
        else {
            this.submit.date_submit = new Date();
            this.submit.save(this).subscribe(function () {
                _this.onConfirmReceiver.next();
                _this.hide();
            });
        }
    };
    ProjectSubmissionDialog.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    ProjectSubmissionDialog.prototype.uploadFile = function (file) {
        var _this = this;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.submit.file_url = data["url"];
                    _this.submit.filename = file.name;
                });
            }
        });
    };
    ProjectSubmissionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-submission-dialog',
            template: "<p-dialog header=\"{{'Project submission'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"320\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\"> \t<div class=\"spinner\" [hidden]=\"!loading\"></div>   \t<div class=\"ui-g-6\">       <p-progressBar mode=\"indeterminate\" *ngIf=\"loading\"></p-progressBar>           <p-fileUpload name=\"uploadLocal\" mode=\"basic\" chooseLabel=\"{{'Upload from computer'|translate}}\" (onSelect)=\"changeFile($event)\" accept=\"*\" maxFileSize=\"1024*8\" showUploadButton=\"false\">           </p-fileUpload>           <a href=\"{{submit.file_url}}\" target=\"_blank\" *ngIf=\"submit.file_url\">{{submit.filename}}</a>         </div>   <p-footer>     <button type=\"button\" pButton icon=\"ui-icon-check\" (click)=\"confirm()\" label=\"{{'Confirm'|translate}}\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Cancel'|translate}}\"></button>   </p-footer> </p-dialog>",
            styles: [".name-c,.name-e{text-align:center;text-transform:uppercase;font-weight:700}.bold,.label{font-weight:700}.title{text-transform:uppercase}.ins{text-indent:50px}.ans-print{margin-bottom:20px}"],
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], ProjectSubmissionDialog);
    return ProjectSubmissionDialog;
}(base_component_1.BaseComponent));
exports.ProjectSubmissionDialog = ProjectSubmissionDialog;
