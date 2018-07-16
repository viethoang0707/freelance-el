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
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var project_model_1 = require("../../../shared/models/elearning/project.model");
var project_submission_model_1 = require("../../../shared/models/elearning/project-submission.model");
var project_marking_dialog_component_1 = require("../project-marking/project-marking.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var ProjectManageDialog = (function (_super) {
    __extends(ProjectManageDialog, _super);
    function ProjectManageDialog() {
        var _this = _super.call(this) || this;
        _this.PROJECT_STATUS = constants_1.PROJECT_STATUS;
        _this.project = new project_model_1.Project();
        return _this;
    }
    ProjectManageDialog.prototype.show = function (project) {
        var _this = this;
        this.project = project;
        this.display = true;
        base_model_1.BaseModel.bulk_search(this, project_submission_model_1.ProjectSubmission.__api__listByProject(this.project.id), course_member_model_1.CourseMember.__api__listByClass(this.project.class_id))
            .subscribe(function (jsonArr) {
            _this.submits = project_submission_model_1.ProjectSubmission.toArray(jsonArr[0]);
            _this.members = course_member_model_1.CourseMember.toArray(jsonArr[1]);
        });
    };
    ProjectManageDialog.prototype.mark = function () {
        var submit = this.getProjectSubmit(this.selectedMember);
        if (!submit.IsNew)
            this.projectMarkDialog.show(submit);
    };
    ProjectManageDialog.prototype.getProjectSubmit = function (member) {
        return _.find(this.submits, function (submit) {
            return submit.member_id == member.id;
        }) || new project_submission_model_1.ProjectSubmission();
    };
    ProjectManageDialog.prototype.hide = function () {
        this.display = false;
    };
    __decorate([
        core_1.ViewChild(project_marking_dialog_component_1.ProjectMarkingDialog),
        __metadata("design:type", project_marking_dialog_component_1.ProjectMarkingDialog)
    ], ProjectManageDialog.prototype, "projectMarkDialog", void 0);
    ProjectManageDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-manage-dialog',
            template: "<p-dialog header=\"{{project.name}}\" [(visible)]=\"display\" modal=\"true\" width=\"960\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-g-12 \">     <p-toolbar>       <div class=\"ui-toolbar-group-left \">         <button pButton type=\"button \" label=\"{{ 'Mark'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-local-offer\" (click)=\"mark()\" [disabled]=\"!selectedMember || getProjectSubmit(selectedMember).IsNew\"></button>       </div>     </p-toolbar>     <div>       <div class=\"ui-g-12\">         <span> {{ 'Status'|translate}} : {{PROJECT_STATUS[project.status]}}</span>       </div>       <div class=\"ui-g-6\">         <span> {{ 'Name'|translate}} : {{project.name}}</span>       </div>       <div class=\"ui-g-12\">         <div>           <label>{{'Content'|translate}}</label>           <p [innerHTML]=\"project.content\"></p>         </div>       </div>       <div class=\"ui-g-6\">         <label>{{'Start'|translate}}</label>         {{project.start | date : \"dd/MM/yyyy\"}}       </div>       <div class=\"ui-g-6\">         <label>{{'End'|translate}}</label>         {{project.end | date : \"dd/MM/yyyy\"}}       </div>       <div class=\"ui-g-6\">         <a href=\"{{project.file_url}}\" target=\"_blank\" *ngIf=\"project.file_url\">{{project.filename}}</a>       </div>     </div>     <p-table #scoreTable [value]=\"members\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedMember\" [responsive]=\"true\">       <!--  sortField=\"role\" -->       <ng-template pTemplate=\"header\">         <tr>           <th [pSortableColumn]=\"'name'\">             {{'Name'|translate}}             <p-sortIcon [field]=\"'name'\"></p-sortIcon>           </th>           <th [pSortableColumn]=\"'group_id__DESC__'\">             {{'Group'|translate}}             <p-sortIcon [field]=\"'group_id__DESC__'\"></p-sortIcon>           </th>           <th [pSortableColumn]=\"'date_submit'\">             {{'Date of submission'|translate}}             <p-sortIcon [field]=\"'date_submit'\"></p-sortIcon>           </th>           <th [pSortableColumn]=\"'score'\">             {{'Score'|translate}}             <p-sortIcon [field]=\"'score'\"></p-sortIcon>           </th>         </tr>       </ng-template>       <ng-template pTemplate=\"body\" let-member>         <tr [pSelectableRow]=\"member\" *ngVar=\"getProjectSubmit(member) as projectSubmit\">           <td>{{member.name}}</td>           <td>{{member.group_id__DESC__}}</td>            <td class=\"showformb\">{{projectSubmit.date_submit | date : \"dd/MM/yyyy, h:mm a\"}}</td>           <td>{{projectSubmit.score}}</td>         </tr>       </ng-template>       <ng-template pTemplate=\"summary\">         {{'Total records'|translate}} : {{members?.length}}       </ng-template>     </p-table>   </div>   <project-marking-dialog></project-marking-dialog>   <p-footer>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
            styles: [".exam-manage{min-height:480px}"],
        }),
        __metadata("design:paramtypes", [])
    ], ProjectManageDialog);
    return ProjectManageDialog;
}(base_component_1.BaseComponent));
exports.ProjectManageDialog = ProjectManageDialog;
