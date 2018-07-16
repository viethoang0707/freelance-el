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
var base_component_1 = require("../../../shared/components/base/base.component");
var survey_member_model_1 = require("../../../shared/models/elearning/survey-member.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var SurveyEnrollDialog = (function (_super) {
    __extends(SurveyEnrollDialog, _super);
    function SurveyEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.SURVEY_STATUS = constants_1.SURVEY_STATUS;
        _this.SURVEY_MEMBER_ENROLL_STATUS = constants_1.SURVEY_MEMBER_ENROLL_STATUS;
        return _this;
    }
    SurveyEnrollDialog.prototype.enroll = function (survey) {
        this.display = true;
        this.survey = survey;
        this.selectedMembers = [];
        this.loadMembers();
    };
    SurveyEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    SurveyEnrollDialog.prototype.addMember = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            _this.survey.enroll(_this, userIds).subscribe(function () {
                _this.loadMembers();
            });
        });
    };
    SurveyEnrollDialog.prototype.deleteMember = function (members) {
        var _this = this;
        if (members && members.length)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                survey_member_model_1.SurveyMember.deleteArray(_this, members).subscribe(function () {
                    _this.selectedMembers = [];
                    _this.loadMembers();
                });
            });
    };
    SurveyEnrollDialog.prototype.loadMembers = function () {
        var _this = this;
        survey_member_model_1.SurveyMember.listBySurvey(this, this.survey.id).subscribe(function (members) {
            _this.members = members;
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], SurveyEnrollDialog.prototype, "usersDialog", void 0);
    SurveyEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'survey-enrollment-dialog',
            template: "<p-dialog header=\"{{'Survey enrollment'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"1200\" height=\"100%\" [responsive]=\"true\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">         <div class=\"ui-g-12 \">             <p-toolbar>                 <div class=\"ui-toolbar-group-left \">                     <button pButton type=\"button \" label=\"{{ 'Add'|translate}} \" class=\"green-btn \" icon=\"ui-icon-add \" (click)=\"addMember() \"></button>                     <button pButton type=\"button \" label=\"{{ 'Delete'|translate}} \" class=\"red-btn \" icon=\"ui-icon-delete \" (click)=\"deleteMember(selectedMembers) \" *ngIf=\"selectedMembers && selectedMembers.length \"></button>                 </div>             </p-toolbar>             <p-table #memberTable [value]=\"members\" [paginator]=\"true \" [rows]=\"10\" selectionMode=\"multiple\" [(selection)]=\"selectedMembers \" [responsive]=\"true \" sortField=\"name\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th style=\"width: 2.25em\">                             <p-tableHeaderCheckbox></p-tableHeaderCheckbox>                         </th>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th width=\"250px\" [pSortableColumn]=\"'email'\">                             {{'Email'|translate}}                             <p-sortIcon [field]=\"'email'\"></p-sortIcon>                         </th>                         <th>{{'Phone'|translate}}</th>                         <th [pSortableColumn]=\"'etraining_group_id__DESC__'\">                             {{'Group'|translate}}                             <p-sortIcon [field]=\"'etraining_group_id__DESC__'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'status'\">                           {{'Status'|translate}}                           <p-sortIcon [field]=\"'status'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-member>                     <tr [pSelectableRow]=\"member\">                         <td>                             <p-tableCheckbox [value]=\"member\"></p-tableCheckbox>                         </td>                         <td style=\"text-align: left;\">{{member.name}}</td>                         <td style=\"text-align: left;\" width=\"250px\">{{member.email}}</td>                         <td>{{member.phone}}</td>                         <td>{{member.group_id__DESC__}}</td>                         <td>{{SURVEY_MEMBER_ENROLL_STATUS[member.enroll_status]}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{members?.length}}                 </ng-template>                 <ng-template pTemplate=\"emptymessage\">                     <tr>                         <td [attr.colspan]=\"6 \">                             {{'No records found'|translate}}                         </td>                     </tr>                 </ng-template>             </p-table>         </div>     </p-scrollPanel>     <select-user-dialog></select-user-dialog>     <p-footer>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], SurveyEnrollDialog);
    return SurveyEnrollDialog;
}(base_component_1.BaseComponent));
exports.SurveyEnrollDialog = SurveyEnrollDialog;
