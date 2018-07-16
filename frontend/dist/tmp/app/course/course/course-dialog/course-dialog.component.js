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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var select_competency_level_dialog_component_1 = require("../../../shared/components/select-competency-level-dialog/select-competency-level-dialog.component");
var CourseDialog = (function (_super) {
    __extends(CourseDialog, _super);
    function CourseDialog() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.editor = new course_member_model_1.CourseMember();
        _this.WINDOW_HEIGHT = $(window).height();
        return _this;
    }
    CourseDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
            this.object.group_id__DESC__ = this.selectedNode.data.name;
        }
    };
    CourseDialog.prototype.selectEditor = function () {
        var _this = this;
        this.usersDialog.show();
        this.usersDialog.onSelectUsers.first().subscribe(function (users) {
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
    CourseDialog.prototype.selectCompetencyLevel = function () {
        var _this = this;
        this.competencyLevelDialog.show();
        this.competencyLevelDialog.onSelectCompetencyLevel.subscribe(function (level) {
            _this.object.competency_level_id = level.id;
            _this.object.competency_level_name = level.name;
            _this.object.competency_id = level.competency_id;
            _this.object.competency_name = level.competency_name;
            _this.object.competency_group_id = level.competency_group_id;
            _this.object.competency_group_name = level.competency_group_name;
        });
    };
    CourseDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.IsNew) {
                _this.editor = new course_member_model_1.CourseMember();
                object.supervisor_id = _this.ContextUser.id;
                object.review_state = _this.ContextUser.IsSuperAdmin ? 'approved' : 'initial';
            }
            else {
                course_member_model_1.CourseMember.courseEditor(_this, object.id).subscribe(function (member) {
                    if (!member) {
                        _this.editor = new course_member_model_1.CourseMember();
                        _this.editor.role = 'editor';
                        _this.editor.course_id = object.id;
                    }
                    else
                        _this.editor = member;
                });
            }
            _this.buildCourseTree(object);
        });
        this.onCreateComplete.subscribe(function (object) {
            _this.editor.role = 'editor';
            _this.editor.course_id = object.id;
            _this.editor.save(_this).subscribe();
        });
        this.onUpdateComplete.subscribe(function (object) {
            _this.editor.save(_this).subscribe();
        });
    };
    CourseDialog.prototype.buildCourseTree = function (object) {
        var _this = this;
        group_model_1.Group.listCourseGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
            if (object.group_id) {
                _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.group_id);
            }
        });
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], CourseDialog.prototype, "usersDialog", void 0);
    __decorate([
        core_1.ViewChild(select_competency_level_dialog_component_1.SelectCompetencyLevelDialog),
        __metadata("design:type", select_competency_level_dialog_component_1.SelectCompetencyLevelDialog)
    ], CourseDialog.prototype, "competencyLevelDialog", void 0);
    CourseDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-dialog',
            template: "<p-dialog header=\"{{'Course'|translate}}\" [(visible)]=\"display\" modal=\"false\" [height]=\"WINDOW_HEIGHT\" positionLeft=\"0\" positionTop=\"0\" styleClass=\"ui-g-12 course-dialog\" [responsive]=\"true\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <p-scrollPanel>         <form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">             <div class=\"ui-g ui-fluid form-group\">                 <div class=\"ui-g-3 logo-course\">                     <label>{{'Logo'|translate}}</label>                     <image-base64 [(src64)]=\"object.logo\"></image-base64>                 </div>                 <div class=\"ui-g-9\">                     <label>{{'Parent group'|translate}}</label>                     <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>                     <div *ngIf=\"selectedNode==null\" class=\"ui-message ui-messages-error ui-corner-all\">                         {{'Selected group is required' | translate}}</div>                 </div>                 <div class=\"ui-g-3\">                     <span class=\"md-inputfield mt20\">                         <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>                         <label>{{'Name'|translate}}</label>                         <div *ngIf=\"name.invalid && (name.dirty || name.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                             <div *ngIf=\"name.errors.required\">                                 {{'Name is required' | translate}}                             </div>                         </div>                     </span>                     <span class=\"md-inputfield mt30\">                         <input type=\"text\" pInputText [(ngModel)]=\"object.code\" #code=\"ngModel\" name=\"code\" required>                         <label>{{'Code'|translate}}</label>                         <div *ngIf=\"code.invalid && (code.dirty || code.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                             <div *ngIf=\"code.errors.required\">                                 {{'Code is required' | translate}}                             </div>                         </div>                     </span>                     <div class=\"mt20\">                         <label>{{'Mode'|translate}}</label>                         <div style=\"margin:10px 0\">                             <p-radioButton name=\"mode\" value=\"self-study\" [disabled]=\"object.id\" label=\"{{'Self-study'|translate}}\" [(ngModel)]=\"object.mode\" inputId=\"opt1\" #mode=\"ngModel\" required></p-radioButton>                         </div>                         <div style=\"margin-bottom:10px\">                             <p-radioButton name=\"mode\" value=\"group\" [disabled]=\"object.id\" label=\"{{'Group study'|translate}}\" [(ngModel)]=\"object.mode\" inputId=\"opt2\" required></p-radioButton>                         </div>                         <div *ngIf=\"mode.invalid\" class=\"ui-message ui-messages-error ui-corner-all\" style=\"margin: 10px 0 20px;\">                             <div *ngIf=\"mode.errors.required\">                                 {{'Mode is required' | translate}}                             </div>                         </div>                     </div>                     <div class=\"ui-g-12\">                         <span (click)=\"selectEditor()\">{{'Editor' |translate}}: {{editor.name}}                                 <i class=\"material-icons\">eject</i>                             </span>                     </div>                     <div class=\"ui-g-12\">                         <span (click)=\"selectCompetencyLevel()\">{{'Competency' |translate}}: {{object.competency_name +' - '+ object.competency_level_name}}                                 <i class=\"material-icons\">eject</i>                             </span>                     </div>                 </div>                 <div class=\"ui-g-9\">                     <div class=\"ui-g-12\">                         <label>{{'Summary'|translate}}</label>                         <textarea pInputTextarea [(ngModel)]=\"object.summary\" name=\"summary\"></textarea>                     </div>                     <div class=\"ui-g-12\">                         <label>{{'Description'|translate}}</label>                         <p-editor [(ngModel)]=\"object.description\" name=\"description\" [style]=\"{'height':'120px'}\"></p-editor>                     </div>                 </div>             </div>         </form>         <select-user-dialog></select-user-dialog>         <select-competency-level-dialog></select-competency-level-dialog>     </p-scrollPanel>     <p-footer>         <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"f.ngSubmit.emit()\" *ngIf=\"(object.supervisor_id == ContextUser.id && object.review_state!='approved') || ContextUser.IsSuperAdmin\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"cancel()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
            styles: [".publish-status{width:50%;margin:0 auto}"],
        }),
        __metadata("design:paramtypes", [])
    ], CourseDialog);
    return CourseDialog;
}(base_dialog_1.BaseDialog));
exports.CourseDialog = CourseDialog;
