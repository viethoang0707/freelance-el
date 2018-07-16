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
var exam_member_model_1 = require("../../../shared/models/elearning/exam-member.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var ExamEnrollDialog = (function (_super) {
    __extends(ExamEnrollDialog, _super);
    function ExamEnrollDialog() {
        var _this = _super.call(this) || this;
        _this.EXAM_MEMBER_ROLE = constants_1.EXAM_MEMBER_ROLE;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.EXAM_MEMBER_STATUS = constants_1.EXAM_MEMBER_STATUS;
        return _this;
    }
    ExamEnrollDialog.prototype.enroll = function (exam) {
        this.display = true;
        this.exam = exam;
        this.selectedCandidates = [];
        this.selectedSupervisors = [];
        this.loadMembers();
    };
    ExamEnrollDialog.prototype.hide = function () {
        this.display = false;
    };
    ExamEnrollDialog.prototype.addCandidate = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            _this.exam.enroll(_this, userIds).subscribe(function () {
                _this.loadMembers();
            });
        });
    };
    ExamEnrollDialog.prototype.addSupervisor = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
            var userIds = _.pluck(users, 'id');
            _this.exam.enrollSupervisor(_this, userIds).subscribe(function () {
                _this.loadMembers();
            });
        });
    };
    ExamEnrollDialog.prototype.deleteMember = function (members) {
        var _this = this;
        if (members && members.length)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                exam_member_model_1.ExamMember.deleteArray(_this, members).subscribe(function () {
                    _this.selectedCandidates = [];
                    _this.selectedSupervisors = [];
                    _this.loadMembers();
                });
            });
    };
    ExamEnrollDialog.prototype.loadMembers = function () {
        var _this = this;
        exam_member_model_1.ExamMember.listByExam(this, this.exam.id).subscribe(function (members) {
            _this.candidates = _.filter(members, function (member) {
                return member.role == 'candidate';
            });
            _this.supervisors = _.filter(members, function (member) {
                return member.role == 'supervisor';
            });
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], ExamEnrollDialog.prototype, "usersDialog", void 0);
    ExamEnrollDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-enrollment-dialog',
            template: "<p-dialog header=\"{{'Exam enrollment'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"1200\" height=\"100%\" [responsive]=\"true\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <p-scrollPanel [style]=\"{width: '100%', height: '460px'}\">     <p-tabView [style]=\"{width: '100%', height: '460px'}\">       <p-tabPanel header=\"{{'Candidates'|translate}}\" leftIcon=\"ui-icon-people\">         <div class=\"ui-g-12 \">           <p-toolbar>             <div class=\"ui-toolbar-group-left \">               <button pButton type=\"button \" label=\"{{ 'Add'|translate}} \" class=\"green-btn \" icon=\"ui-icon-add \" (click)=\"addCandidate() \" name=\"addCandidate\"></button>               <button pButton type=\"button \" label=\"{{ 'Delete'|translate}} \" class=\"red-btn \" icon=\"ui-icon-delete \" (click)=\"deleteMember(selectedCandidates) \"                 *ngIf=\"selectedCandidates && selectedCandidates.length \"></button>             </div>           </p-toolbar>           <p-table #candidateTable [value]=\"candidates\" [paginator]=\"true \" [rows]=\"10\" selectionMode=\"multiple\" [(selection)]=\"selectedCandidates \"             [responsive]=\"true \" sortField=\"name\">             <ng-template pTemplate=\"header\">               <tr>                 <th style=\"width: 2.25em\">                 <p-tableHeaderCheckbox></p-tableHeaderCheckbox>             </th>                 <th [pSortableColumn]=\"'name'\">                   {{'Name'|translate}}                   <p-sortIcon [field]=\"'name'\"></p-sortIcon>                 </th>                 <th width=\"250px\" [pSortableColumn]=\"'email'\">                   {{'Email'|translate}}                   <p-sortIcon [field]=\"'email'\"></p-sortIcon>                 </th>                 <th>{{'Phone'|translate}}</th>                 <th [pSortableColumn]=\"'etraining_group_id__DESC__'\">                   {{'Group'|translate}}                   <p-sortIcon [field]=\"'etraining_group_id__DESC__'\"></p-sortIcon>                 </th>                 <th [pSortableColumn]=\"'status'\">                   {{'Status'|translate}}                   <p-sortIcon [field]=\"'status'\"></p-sortIcon>                 </th>               </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-member>               <tr [pSelectableRow]=\"member\">                 <td>                 <p-tableCheckbox [value]=\"member\"></p-tableCheckbox>             </td>                 <td style=\"text-align: left;\">{{member.name}}</td>                 <td style=\"text-align: left;\" width=\"250px\">{{member.email}}</td>                 <td>{{member.phone}}</td>                 <td>{{member.group_id__DESC__}}</td>                 <td>{{EXAM_MEMBER_STATUS[member.status]}}</td>               </tr>             </ng-template>             <ng-template pTemplate=\"summary\">               {{'Total records'|translate}} : {{candidates?.length}}             </ng-template>           </p-table>         </div>       </p-tabPanel>       <p-tabPanel header=\"{{'Supervisors'|translate}}\" leftIcon=\"ui-icon-people\">         <div class=\"ui-g-12 \">           <p-toolbar>             <div class=\"ui-toolbar-group-left \">               <button pButton type=\"button \" label=\"{{ 'Add'|translate}} \" class=\"green-btn \" icon=\"ui-icon-add \" (click)=\"addSupervisor() \" name=\"addSupervisor\"></button>               <button pButton type=\"button \" label=\"{{ 'Delete'|translate}} \" class=\"red-btn \" icon=\"ui-icon-delete \" (click)=\"deleteMember(selectedSupervisors) \"                 *ngIf=\"selectedSupervisors && selectedSupervisors.length\"></button>             </div>           </p-toolbar>           <p-table #candidateTable [value]=\"supervisors\" [paginator]=\"true \" [rows]=\"10\" selectionMode=\"multiple\" [(selection)]=\"selectedSupervisors \"             [responsive]=\"true \" sortField=\"name\">             <ng-template pTemplate=\"header\">               <tr>                 <th style=\"width: 2.25em\">                 <p-tableHeaderCheckbox></p-tableHeaderCheckbox>             </th>                 <th [pSortableColumn]=\"'name'\">                   {{'Name'|translate}}                   <p-sortIcon [field]=\"'name'\"></p-sortIcon>                 </th>                 <th [pSortableColumn]=\"'email'\">                   {{'Email'|translate}}                   <p-sortIcon [field]=\"'email'\"></p-sortIcon>                 </th>                 <th>{{'Phone'|translate}}</th>                 <th [pSortableColumn]=\"'etraining_group_id__DESC__'\">                   {{'Group'|translate}}                   <p-sortIcon [field]=\"'etraining_group_id__DESC__'\"></p-sortIcon>                 </th>                 <th [pSortableColumn]=\"'status'\">                   {{'Status'|translate}}                   <p-sortIcon [field]=\"'status'\"></p-sortIcon>                 </th>               </tr>             </ng-template>             <ng-template pTemplate=\"body\" let-member>               <tr [pSelectableRow]=\"member \">                 <td>                 <p-tableCheckbox [value]=\"member\"></p-tableCheckbox>             </td>                 <td>{{member.name}}</td>                 <td>{{member.email}}</td>                 <td>{{member.phone}}</td>                 <td>{{member.group_id__DESC__}}</td>                 <td>{{EXAM_MEMBER_STATUS[member.status]}}</td>               </tr>             </ng-template>             <ng-template pTemplate=\"summary\">               {{'Total records'|translate}} : {{supervisors?.length}}             </ng-template>           </p-table>         </div>       </p-tabPanel>     </p-tabView>   </p-scrollPanel>   <select-user-dialog></select-user-dialog>   <p-footer>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], ExamEnrollDialog);
    return ExamEnrollDialog;
}(base_component_1.BaseComponent));
exports.ExamEnrollDialog = ExamEnrollDialog;
