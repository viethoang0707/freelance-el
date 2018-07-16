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
var course_class_model_1 = require("../../../shared/models/elearning/course-class.model");
var conference_model_1 = require("../../../shared/models/elearning/conference.model");
var conference_member_model_1 = require("../../../shared/models/elearning/conference-member.model");
var ClassConferenceDialog = (function (_super) {
    __extends(ClassConferenceDialog, _super);
    function ClassConferenceDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        _this.courseClass = new course_class_model_1.CourseClass();
        _this.members = [];
        _this.conference = new conference_model_1.Conference();
        return _this;
    }
    ClassConferenceDialog.prototype.show = function (courseClass) {
        var _this = this;
        this.display = true;
        this.courseClass = courseClass;
        if (courseClass.status == 'open') {
            conference_model_1.Conference.get(this, courseClass.conference_id).subscribe(function (confernece) {
                _this.conference = confernece;
                conference_member_model_1.ConferenceMember.listByConference(_this, _this.conference.id).subscribe(function (members) {
                    _this.members = members;
                });
            });
        }
        else {
            this.members = [];
            this.conference = new conference_model_1.Conference();
        }
    };
    ClassConferenceDialog.prototype.hide = function () {
        this.display = false;
    };
    ClassConferenceDialog.prototype.openConference = function () {
        var _this = this;
        this.conference.open(this).subscribe(function () {
            _this.info(_this.translateService.instant('Conference open'));
            conference_member_model_1.ConferenceMember.listByConference(_this, _this.conference.id).subscribe(function (members) {
                _this.members = members;
            });
        });
    };
    ClassConferenceDialog.prototype.closeConference = function () {
        var _this = this;
        this.conference.close(this).subscribe(function () {
            _this.info(_this.translateService.instant('Conference closed'));
            conference_member_model_1.ConferenceMember.listByConference(_this, _this.conference.id).subscribe(function (members) {
                _this.members = members;
            });
        });
    };
    ClassConferenceDialog.prototype.activateMember = function (member) {
        member.is_active = true;
        member.save(this).subscribe();
    };
    ClassConferenceDialog.prototype.deactivateMember = function (member) {
        member.is_active = false;
        member.save(this).subscribe();
    };
    ClassConferenceDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-conference-dialog',
            template: "<p-dialog header=\"{{'Class conference'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"800\" [responsive]=\"true\" appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel [style]=\"{width: '100%', height: '480px'}\">         <div class=\"ui-g-12 \">             <p-toolbar>                 <div class=\"ui-toolbar-group-left \">                     <button pButton type=\"button \" label=\"{{ 'Open'|translate}} \" class=\"green-btn \" icon=\"ui-icon-lock-open\" (click)=\"openConference() \" [disabled]=\"conference.status=='open'\"></button>                     <button pButton type=\"button \" label=\"{{ 'Close'|translate}} \" class=\"orange-btn \" icon=\"ui-icon-lock\" (click)=\"closeConference() \" [disabled]=\"!conference.id || conference.status=='closed'\"></button>                 </div>             </p-toolbar>             <div class=\" ui-g-12 \">                 <label for=\"password\">{{'Room password' | translate}}</label>                 <input type=\"text\" pInputText name=\"password\" [(ngModel)]=\"conference.room_pass\" [disabled]=\"true\">             </div>             <p-table #memberTable [value]=\"members\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedMember\" [responsive]=\"true\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'group_name'\">                             {{'Group'|translate}}                             <p-sortIcon [field]=\"'group_name'\"></p-sortIcon>                         </th>                         <th>{{'Banned/Allow'|translate}}</th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-member>                     <tr [pSelectableRow]=\"member\">                         <td>{{member.name}}</td>                         <td>{{member.group_name}}</td>                         <td>                             <button pButton type=\"button \" label=\"{{ 'Activate'|translate}} \" class=\"green-btn \" (click)=\"activateMember(member) \" *ngIf=\"!member.is_active\"></button>                             <button pButton type=\"button \" label=\"{{ 'Deactivate'|translate}} \" class=\"orange-btn \" icon=\"ui-icon-lock\" (click)=\"deactivateMember(member) \" *ngIf=\"member.is_active\"></button>                         </td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{members?.length}}                 </ng-template>             </p-table>         </div>     </p-scrollPanel>     <p-footer>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], ClassConferenceDialog);
    return ClassConferenceDialog;
}(base_component_1.BaseComponent));
exports.ClassConferenceDialog = ClassConferenceDialog;
