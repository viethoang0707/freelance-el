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
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var http_1 = require("@angular/http");
var constants_1 = require("../../../shared/models/constants");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var select_competency_level_dialog_component_1 = require("../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component");
var ExamDialog = (function (_super) {
    __extends(ExamDialog, _super);
    function ExamDialog(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.locale = constants_1.DEFAULT_DATE_LOCALE;
        _this.editor = new exam_member_model_1.ExamMember();
        _this.WINDOW_HEIGHT = $(window).height();
        return _this;
    }
    ExamDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.IsNew) {
                _this.editor = new exam_member_model_1.ExamMember();
                object.supervisor_id = _this.ContextUser.id;
                object.review_state = _this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
            }
            else {
                exam_member_model_1.ExamMember.examEditor(_this, object.id).subscribe(function (member) {
                    if (!member) {
                        _this.editor = new exam_member_model_1.ExamMember();
                        _this.editor.role = 'editor';
                        _this.editor.exam_id = object.id;
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
            ;
        });
        this.onCreateComplete.subscribe(function (object) {
            _this.editor.role = 'editor';
            _this.editor.exam_id = object.id;
            _this.editor.save(_this).subscribe();
        });
        this.onUpdateComplete.subscribe(function (object) {
            _this.editor.save(_this).subscribe();
        });
    };
    ExamDialog.prototype.onDateSelect = function ($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    };
    ExamDialog.prototype.selectCompetencyLevel = function () {
        var _this = this;
        this.competencyLevelDialog.show();
        this.competencyLevelDialog.onSelectCompetencyLevel.first().subscribe(function (level) {
            _this.object.competency_level_id = level.id;
            _this.object.competency_level_name = level.name;
            _this.object.competency_id = level.competency_id;
            _this.object.competency_name = level.competency_name;
        });
    };
    ExamDialog.prototype.selectEditor = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.subscribe(function (users) {
            if (users.length > 1) {
                _this.error('You can select only one editor.');
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
        core_1.ViewChild(select_competency_level_dialog_component_1.SelectCompetencyLevelDialog),
        __metadata("design:type", select_competency_level_dialog_component_1.SelectCompetencyLevelDialog)
    ], ExamDialog.prototype, "competencyLevelDialog", void 0);
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], ExamDialog.prototype, "usersDialog", void 0);
    ExamDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-dialog',
            template: "<p-dialog header=\"{{'Exam'|translate}}\" [(visible)]=\"display\" modal=\"false\" [responsive]=\"true\" appendTo=\"body\" [height]=\"WINDOW_HEIGHT\"     positionLeft=\"0\" positionTop=\"0\" styleClass=\"ui-g-12 exam-dialog\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">         <p-scrollPanel [style]=\"{width: '100%', height: '80vh'}\">             <div class=\"ui-g ui-fluid form-group pt30\">                 <div class=\"ui-g-4\">                     <span class=\"md-inputfield\">                         <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>                         <label>{{'Name'|translate}}</label>                     </span>                     <div *ngIf=\"name.invalid && (name.dirty || name.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                         <div *ngIf=\"name.errors.required\">                             {{'Name is required' | translate}}                         </div>                     </div>                 </div>                 <div class=\"ui-g-2\">                     <span class=\"md-inputfield\">                         <input type=\"text\" pInputText [(ngModel)]=\"object.duration\" #duration=\"ngModel\" name=\"duration\" pKeyFilter=\"pint\" required>                         <label>{{'Duration (in minutes)'|translate}}</label>                     </span>                     <div *ngIf=\"duration.invalid && (duration.dirty || duration.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                         <div *ngIf=\"duration.errors.required\">                             {{'Duration is required' | translate}}                         </div>                     </div>                 </div>                 <div class=\"ui-g-6\">                     <span class=\"md-inputfield\">                         <input type=\"text\" pInputText [(ngModel)]=\"object.summary\" name=\"summary\">                         <label>{{'Summary'|translate}}</label>                     </span>                 </div>                 <div class=\"ui-g-12\">                     <div class=\"ui-g-8\">                         <label>{{'Instruction'|translate}}</label>                         <p-editor [(ngModel)]=\"object.instruction\" [style]=\"{'height':'120px'}\" name=\"instruction\">                         </p-editor>                     </div>                     <div class=\"ui-g-4\">                         <div class=\"ui-g-12\">                             <span (click)=\"selectEditor()\">{{'Editor' |translate}}: {{editor.name}}                                 <i class=\"material-icons\">eject</i>                             </span>                         </div>                         <div class=\"ui-g-12\">                             <span (click)=\"selectCompetencyLevel()\">{{'Competency level' |translate}}: {{object.competency_level_name}}                                 <i class=\"material-icons\">eject</i>                             </span>                         </div>                     </div>                 </div>                 <div class=\"ui-g-6\">                     <label>{{'Start'|translate}}</label>                     <p-calendar [(ngModel)]=\"object.start\" showTime=\"true\" hourFormat=\"24\" #start=\"ngModel\" name=\"start\" required=\"true\" dateFormat=\"dd/mm/yy\"                         [showIcon]=\"true\"></p-calendar>                     <div *ngIf=\"start.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin: 10px 0 20px;\">                         <div *ngIf=\"start.errors.required\">                             {{'Exam start time is required' | translate}}                         </div>                     </div>                 </div>                 <div class=\"ui-g-6\">                     <label>{{'End'|translate}}</label>                     <p-calendar [(ngModel)]=\"object.end\" showTime=\"true\" hourFormat=\"24\" #end=\"ngModel\" name=\"end\" required=\"true\" dateFormat=\"dd/mm/yy\"                         [showIcon]=\"true\"></p-calendar>                     <div *ngIf=\"end.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin: 10px 0 20px;\">                         <div *ngIf=\"end.errors.required\">                             {{'Exam end time is required' | translate}}                         </div>                     </div>                 </div>             </div>         </p-scrollPanel>     </form>     <p-footer>         <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"f.ngSubmit.emit()\" *ngIf=\"(object.supervisor_id == ContextUser.id && object.review_state!='approved') || ContextUser.IsSuperAdmin\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"cancel()\" label=\"{{'Close'|translate}}\"></button>     </p-footer>     <select-user-dialog></select-user-dialog>     <select-competency-level-dialog></select-competency-level-dialog> </p-dialog>",
            styles: [".publish-status{width:50%;margin:0 auto}"],
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], ExamDialog);
    return ExamDialog;
}(base_dialog_1.BaseDialog));
exports.ExamDialog = ExamDialog;
