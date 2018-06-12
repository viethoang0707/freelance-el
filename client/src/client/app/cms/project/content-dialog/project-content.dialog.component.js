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
var _ = require("underscore");
var ProjectContentDialog = (function (_super) {
    __extends(ProjectContentDialog, _super);
    function ProjectContentDialog(http, ngZone) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.ngZone = ngZone;
        _this.locale = constants_1.DEFAULT_DATE_LOCALE;
        _this.projectStatus = _.map(constants_1.PROJECT_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
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
    ProjectContentDialog.prototype.uploadFile = function (file) {
        var _this = this;
        this.cloudApiService.upload(file, this.authService.CloudAcc.id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.object.file_url = data["url"];
                    _this.object.filename = file.filename;
                });
            }
        }, function () {
        });
    };
    ProjectContentDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-content-dialog',
            templateUrl: 'project-content.dialog.component.html',
        }),
        __metadata("design:paramtypes", [http_1.Http, core_1.NgZone])
    ], ProjectContentDialog);
    return ProjectContentDialog;
}(base_dialog_1.BaseDialog));
exports.ProjectContentDialog = ProjectContentDialog;
//# sourceMappingURL=project-content.dialog.component.js.map