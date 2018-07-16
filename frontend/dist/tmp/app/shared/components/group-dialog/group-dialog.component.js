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
var base_dialog_1 = require("../../components/base/base.dialog");
var group_model_1 = require("../../models/elearning/group.model");
var tree_utils_1 = require("../../helpers/tree.utils");
var GroupDialog = (function (_super) {
    __extends(GroupDialog, _super);
    function GroupDialog() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    GroupDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.parent_id = this.selectedNode.data.id;
        }
    };
    GroupDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            var subscription = null;
            if (object.category == "course")
                subscription = group_model_1.Group.listCourseGroup(_this);
            if (object.category == "organization")
                subscription = group_model_1.Group.listUserGroup(_this);
            if (object.category == "question")
                subscription = group_model_1.Group.listQuestionGroup(_this);
            if (object.category == "competency")
                subscription = group_model_1.Group.listCompetencyGroup(_this);
            if (subscription) {
                subscription.subscribe(function (groups) {
                    _this.tree = _this.treeUtils.buildGroupTree(groups);
                    if (object.id) {
                        var node = _this.treeUtils.findTreeNode(_this.tree, object.id);
                        node.selectable = false;
                    }
                    if (object.parent_id) {
                        _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.parent_id);
                    }
                });
            }
        });
    };
    GroupDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'group-dialog',
            template: "<form novalidate (ngSubmit)=\"save()\" #f=\"ngForm\" autocomplete=\"off\">   <p-dialog header=\"{{'Group'|translate}}\" [(visible)]=\"display\" modal=\"false\" width=\"300\" [responsive]=\"true\" positionTop=\"50\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <div class=\"ui-g ui-fluid form-group\">       <div class=\"ui-g-12\">         <label>{{'Parent group'|translate}}</label>         <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\">></p-tree>       </div>       <div class=\"ui-g-12\"> <span class=\"md-inputfield\">             <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>             <label>{{'Name'|translate}}</label>             <div *ngIf=\"name.invalid && (name.dirty || name.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">               <div *ngIf=\"name.errors.required\">                 {{'Name is required' | translate}}               </div>             </div>           </span>       </div>       <div class=\"ui-g-12\"> <span class=\"md-inputfield\">             <input type=\"text\" pInputText [(ngModel)]=\"object.code\" #code=\"ngModel\" name=\"code\" required>             <label>{{'Code'|translate}}</label>             <div *ngIf=\"code.invalid && (code.dirty || code.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">               <div *ngIf=\"code.errors.required\">                 {{'Code is required' | translate}}               </div>             </div>           </span>       </div>     </div>     <p-footer>       <button type=\"submit\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\"></button>       <button type=\"button\" pButton icon=\"fa-close\" (click)=\"cancel()\" label=\"{{'Close'|translate}}\"></button>     </p-footer>   </p-dialog> </form>",
            styles: [".form-group{max-height:450px}"],
        }),
        __metadata("design:paramtypes", [])
    ], GroupDialog);
    return GroupDialog;
}(base_dialog_1.BaseDialog));
exports.GroupDialog = GroupDialog;
