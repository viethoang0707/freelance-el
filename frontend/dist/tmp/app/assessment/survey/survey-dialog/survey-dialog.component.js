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
var survey_member_model_1 = require("../../../shared/models/elearning/survey-member.model");
var http_1 = require("@angular/http");
var constants_1 = require("../../../shared/models/constants");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var SurveyDialog = (function (_super) {
    __extends(SurveyDialog, _super);
    function SurveyDialog(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.locale = constants_1.DEFAULT_DATE_LOCALE;
        _this.editor = new survey_member_model_1.SurveyMember();
        return _this;
    }
    SurveyDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.IsNew) {
                _this.editor = new survey_member_model_1.SurveyMember();
                object.supervisor_id = _this.ContextUser.id;
                object.review_state = _this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
            }
            else {
                survey_member_model_1.SurveyMember.surveyEditor(_this, object.id).subscribe(function (member) {
                    if (!member) {
                        _this.editor = new survey_member_model_1.SurveyMember();
                        _this.editor.role = 'editor';
                        _this.editor.survey_id = object.id;
                    }
                    else
                        _this.editor = member;
                });
            }
            if (object.start && object.end) {
                _this.rangeDates = [object.start, object.end];
            }
            var lang = _this.translateService.currentLang;
            _this.http.get("/assets/i18n/calendar." + lang + ".json")
                .subscribe(function (res) {
                _this.locale = res.json();
            });
        });
        this.onCreateComplete.subscribe(function (object) {
            _this.editor.role = 'editor';
            _this.editor.survey_id = object.id;
            _this.editor.save(_this).subscribe();
        });
        this.onUpdateComplete.subscribe(function (object) {
            _this.editor.save(_this).subscribe();
        });
    };
    SurveyDialog.prototype.onDateSelect = function ($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    };
    SurveyDialog.prototype.selectEditor = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            if (users.length > 1) {
                _this.error(_this.translateService.instant('You can select only one editor.'));
                return;
            }
            else if (users.length == 1) {
                var user = users[0];
                _this.editor.user_id = user.id;
                _this.editor.name = user.name;
            }
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], SurveyDialog.prototype, "usersDialog", void 0);
    SurveyDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-dialog',
            template: "<p-dialog header=\"{{'Survey'|translate}}\" [(visible)]=\"display\" modal=\"false\" [styleClass]=\"large-dialog\" [responsive]=\"true\"     appendTo=\"body\">     <form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">         <div class=\"spinner\" [hidden]=\"!loading\"></div>         <p-scrollPanel [styleClass]=\"large-dialog-panel\">             <div class=\"ui-g ui-fluid form-group pt30\">                 <div class=\"ui-g-4\">                     <span class=\"md-inputfield\">                         <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>                         <label>{{'Name'|translate}}</label>                         <div *ngIf=\"name.invalid && (name.dirty || name.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                             <div *ngIf=\"name.errors.required\">                                 {{'Name is required' | translate}}                             </div>                         </div>                     </span>                 </div>                 <div class=\"ui-g-8\">                     <span class=\"md-inputfield\">                         <input type=\"text\" pInputText [(ngModel)]=\"object.summary\" name=\"summary\">                         <label>{{'Summary'|translate}}</label>                     </span>                 </div>                 <div class=\"ui-g-12\">                     <div class=\"ui-g-8\">                         <label>{{'Instruction'|translate}}</label>                         <p-editor [(ngModel)]=\"object.instruction\" [style]=\"{'height':'120px'}\" name=\"instruction\">                         </p-editor>                     </div>                     <div class=\"ui-g-4\">                         <span (click)=\"selectEditor()\">{{'Editor' |translate}}: {{editor.name}}                             <i class=\"material-icons\">eject</i>                         </span>                     </div>                 </div>                 <div class=\"ui-g-6\">                     <label>{{'Start'|translate}}</label>                     <p-calendar [(ngModel)]=\"object.start\" showTime=\"true\" hourFormat=\"24\" #start=\"ngModel\" name=\"start\" required=\"true\" dateFormat=\"dd/mm/yy\"                         [showIcon]=\"true\"></p-calendar>                     <div *ngIf=\"start.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin: 10px 0 20px;\">                         <div *ngIf=\"start.errors.required\">                             {{'Exam start time is required' | translate}}                         </div>                     </div>                 </div>                 <div class=\"ui-g-6\">                     <label>{{'End'|translate}}</label>                     <p-calendar [(ngModel)]=\"object.end\" showTime=\"true\" hourFormat=\"24\" #end=\"ngModel\" name=\"end\" required=\"true\" [showIcon]=\"true\"                         dateFormat=\"dd/mm/yy\"></p-calendar>                     <div *ngIf=\"end.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin: 10px 0 20px;\">                         <div *ngIf=\"end.errors.required\">                             {{'Exam end time is required' | translate}}                         </div>                     </div>                 </div>             </div>         </p-scrollPanel>     </form>     <p-footer>         <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"f.ngSubmit.emit()\" *ngIf=\"(object.supervisor_id == ContextUser.id && object.review_state!='approved') || ContextUser.IsSuperAdmin\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer>     <select-user-dialog></select-user-dialog> </p-dialog>",
            styles: [".publish-status{width:50%;margin:0 auto}"],
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], SurveyDialog);
    return SurveyDialog;
}(base_dialog_1.BaseDialog));
exports.SurveyDialog = SurveyDialog;
