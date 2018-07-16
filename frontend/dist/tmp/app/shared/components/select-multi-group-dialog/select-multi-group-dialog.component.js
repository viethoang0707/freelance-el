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
var group_model_1 = require("../../models/elearning/group.model");
var base_component_1 = require("../base/base.component");
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var SelectMultiGroupDialog = (function (_super) {
    __extends(SelectMultiGroupDialog, _super);
    function SelectMultiGroupDialog() {
        var _this = _super.call(this) || this;
        _this.onSelectGroupsReceiver = new Rx_1.Subject();
        _this.onSelectGroups = _this.onSelectGroupsReceiver.asObservable();
        _this.display = false;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectMultiGroupDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectMultiGroupDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedNodes = [];
        var subscription = null;
        if (this.category == "course")
            subscription = group_model_1.Group.listCourseGroup(this);
        if (this.category == "organization")
            subscription = group_model_1.Group.listUserGroup(this);
        if (this.category == "question")
            subscription = group_model_1.Group.listQuestionGroup(this);
        if (subscription)
            subscription.subscribe(function (groups) {
                _this.tree = _this.treeUtils.buildGroupTree(groups);
            });
    };
    SelectMultiGroupDialog.prototype.select = function () {
        var groups = _.map(this.selectedNodes, function (selectedNode) {
            return selectedNode["data"];
        });
        this.onSelectGroupsReceiver.next(groups);
        this.hide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SelectMultiGroupDialog.prototype, "category", void 0);
    SelectMultiGroupDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-multi-group-dialog',
            template: "<p-dialog header=\"{{'Select multi-group'|translate}}\" [positionTop]=\"50\" [(visible)]=\"display\" modal=\"true\" width=\"300\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\"> <div class=\"spinner\" [hidden]=\"!loading\"></div>   <div class=\"ui-g ui-fluid form-group\">     <div class=\"ui-g-12\">       <p-tree [value]=\"tree\" selectionMode=\"checkbox\" [(selection)]=\"selectedNodes\" ></p-tree>     </div>   </div>   <p-footer>     <button type=\"button\" [disabled]=\"!selectedNodes || !selectedNodes.length\" pButton icon=\"fa-check\" label=\"{{'OK'|translate}}\" (click)=\"select()\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
            styles: [".form-group{max-height:450px}"],
        }),
        __metadata("design:paramtypes", [])
    ], SelectMultiGroupDialog);
    return SelectMultiGroupDialog;
}(base_component_1.BaseComponent));
exports.SelectMultiGroupDialog = SelectMultiGroupDialog;
