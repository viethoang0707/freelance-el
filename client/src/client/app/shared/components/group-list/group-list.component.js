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
var router_1 = require("@angular/router");
var group_model_1 = require("../../models/elearning/group.model");
var base_component_1 = require("../base/base.component");
var tree_utils_1 = require("../../helpers/tree.utils");
var group_dialog_component_1 = require("../group-dialog/group-dialog.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var user_model_1 = require("../../../shared/models/elearning/user.model");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var competency_model_1 = require("../../../shared/models/elearning/competency.model");
var GroupListComponent = (function (_super) {
    __extends(GroupListComponent, _super);
    function GroupListComponent(route) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    GroupListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.category = this.route.snapshot.data['category'];
        this.loadGroups();
        this.actionItems = [
            { label: this.translateService.instant('Edit'), icon: 'ui-icon-mode-edit', command: function (event) { return _this.edit(); } },
            { label: this.translateService.instant('Delete'), icon: 'ui-icon-delete', command: function (event) { return _this.delete(); } }
        ];
    };
    GroupListComponent.prototype.add = function () {
        var _this = this;
        var group = new group_model_1.Group();
        group.category = this.category;
        this.groupDialog.show(group);
        this.groupDialog.onCreateComplete.subscribe(function () {
            _this.loadGroups();
        });
    };
    GroupListComponent.prototype.edit = function () {
        if (this.selectedNode)
            this.groupDialog.show(this.selectedNode.data);
    };
    GroupListComponent.prototype.confirmDelete = function () {
        var _this = this;
        this.confirm('Are you sure to delete ?', function () {
            _this.selectedNode.data.delete(_this).subscribe(function () {
                _this.loadGroups();
            }, function () {
                _this.error('Permission denied');
            });
        });
    };
    GroupListComponent.prototype.delete = function () {
        var _this = this;
        var subscription = null;
        if (this.category == "course")
            subscription = course_model_1.Course.listByGroup(this, this.selectedNode.data.id);
        if (this.category == "organization")
            subscription = user_model_1.User.listByGroup(this, this.selectedNode.data.id);
        if (this.category == "question")
            subscription = question_model_1.Question.listByGroup(this, this.selectedNode.data.id);
        if (this.category == "competency")
            subscription = competency_model_1.Competency.listByGroup(this, this.selectedNode.data.id);
        if (subscription) {
            subscription.subscribe(function (items) {
                if (items && items.length > 0) {
                    _this.warn('The group is used by another content.');
                }
                else {
                    _this.confirmDelete();
                }
            });
        }
    };
    GroupListComponent.prototype.loadGroups = function () {
        var _this = this;
        var subscription = null;
        if (this.category == "course")
            subscription = group_model_1.Group.listCourseGroup(this);
        if (this.category == "organization")
            subscription = group_model_1.Group.listUserGroup(this);
        if (this.category == "question")
            subscription = group_model_1.Group.listQuestionGroup(this);
        if (this.category == "competency")
            subscription = group_model_1.Group.listCompetencyGroup(this);
        if (subscription)
            subscription.subscribe(function (groups) {
                _this.groups = groups;
                _this.tree = _this.treeUtils.buildGroupTree(groups);
            });
    };
    __decorate([
        core_1.ViewChild(group_dialog_component_1.GroupDialog),
        __metadata("design:type", group_dialog_component_1.GroupDialog)
    ], GroupListComponent.prototype, "groupDialog", void 0);
    GroupListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'group-list',
            templateUrl: 'group-list.component.html',
            styleUrls: ['group-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], GroupListComponent);
    return GroupListComponent;
}(base_component_1.BaseComponent));
exports.GroupListComponent = GroupListComponent;
//# sourceMappingURL=group-list.component.js.map