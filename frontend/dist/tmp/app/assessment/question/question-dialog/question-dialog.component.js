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
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var question_container_directive_1 = require("../question-template/question-container.directive");
var question_decorator_1 = require("../question-template/question.decorator");
var QuestionDialog = (function (_super) {
    __extends(QuestionDialog, _super);
    function QuestionDialog(componentFactoryResolver, changeDetectionRef) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.changeDetectionRef = changeDetectionRef;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.WINDOW_HEIGHT = $(window).height();
        return _this;
    }
    QuestionDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
            this.object.group_id__DESC__ = this.selectedNode.data.group_id__DESC__;
        }
    };
    QuestionDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            group_model_1.Group.listQuestionGroup(_this).subscribe(function (groups) {
                _this.tree = _this.treeUtils.buildGroupTree(groups);
                if (object.group_id) {
                    _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.group_id);
                }
            });
            object.populateOption(_this).subscribe(function () {
                var detailComponent = question_decorator_1.QuestionRegister.Instance.lookup(object.type);
                var viewContainerRef = _this.questionHost.viewContainerRef;
                var componentFactory = _this.componentFactoryResolver.resolveComponentFactory(detailComponent);
                viewContainerRef.clear();
                _this.componentRef = viewContainerRef.createComponent(componentFactory);
                _this.componentRef.instance.mode = 'edit';
                _this.componentRef.instance.render(object);
            });
        });
        this.onUpdateComplete.subscribe(function (object) {
            if (_this.componentRef)
                _this.componentRef.instance.saveEditor().subscribe(function () {
                    _this.success(_this.translateService.instant('Question saved.'));
                });
        });
        this.onCreateComplete.subscribe(function (object) {
            if (_this.componentRef)
                _this.componentRef.instance.saveEditor().subscribe(function () {
                    _this.success(_this.translateService.instant('Question saved.'));
                });
        });
    };
    QuestionDialog.prototype.save = function () {
        var _this = this;
        this.componentRef.instance.saveEditor().subscribe(function () {
            _this.hide();
        });
    };
    __decorate([
        core_1.ViewChild(question_container_directive_1.QuestionContainerDirective),
        __metadata("design:type", question_container_directive_1.QuestionContainerDirective)
    ], QuestionDialog.prototype, "questionHost", void 0);
    QuestionDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-dialog',
            template: "<p-dialog header=\"{{'Question'|translate}}\" [(visible)]=\"display\" modal=\"true\"  [height]=\"WINDOW_HEIGHT\" positionLeft=\"0\" positionTop=\"0\" styleClass=\"ui-g-12 question-dialog\" [responsive]=\"true\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">         <p-scrollPanel [style]=\"{width: '100%', height: '80vh'}\">             <p-tabView [style]=\"{width: '100%', height: '100vh'}\">                 <p-tabPanel header=\"{{'General'|translate}}\" leftIcon=\"ui-icon-info\">                     <div class=\"ui-g ui-fluid form-group\">                         <div class=\"ui-g-6\">                             <label>{{'Group'|translate}}</label>                             <p-tree [value]=\"tree\" selectionMode=\"single\" required [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>                             <div *ngIf=\"selectedNode==null\" class=\"ui-message ui-messages-error ui-corner-all\">                                 {{'Selected group is required' | translate}}</div>                         </div>                         <div class=\"ui-g-6\">                             <div class=\"\">                                 <label>{{'Title'|translate}}</label>                                 <textarea pInputTextarea [(ngModel)]=\"object.title\" #title=\"ngModel\" required name=\"title\"></textarea>                                 <div *ngIf=\"title.invalid && (title.dirty || title.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">                                     <div *ngIf=\"title.errors.required\">                                         {{'Title is required' | translate}}                                     </div>                                 </div>                             </div>                             <div class=\"mt20\">                                 <div class=\"ui-lg-12\"><label>{{'Level'|translate}}</label></div>                                 <div class=\"ui-lg-4 fLeft\">                                     <p-radioButton name=\"level\" value=\"easy\" label=\"{{'Easy'|translate}}\" [(ngModel)]=\"object.level\" inputId=\"opt1\" #level=\"ngModel\" required></p-radioButton>                                 </div>                                 <div class=\"ui-lg-4 fLeft\">                                     <p-radioButton name=\"level\" value=\"medium\" label=\"{{'Medium'|translate}}\" [(ngModel)]=\"object.level\" inputId=\"opt2\" required></p-radioButton>                                 </div>                                 <div class=\"ui-lg-4 fLeft\">                                   <p-radioButton name=\"level\" value=\"hard\" label=\"{{'Hard'|translate}}\" [(ngModel)]=\"object.level\" inputId=\"opt3\" required></p-radioButton>                                 </div>                                 <div *ngIf=\"level.invalid\" class=\"ui-message ui-messages-error ui-corner-all ui-lg-12\">                                     <div *ngIf=\"!object.level\">                                         {{'Level is required' | translate}}                                     </div>                                 </div>                             </div>                         </div>                     </div>                 </p-tabPanel>                 <p-tabPanel header=\"{{'Details'|translate}}\" leftIcon=\"ui-icon-details\" [hidden]=\"!componentRef\">                     <ng-template question-container></ng-template>                 </p-tabPanel>             </p-tabView>         </p-scrollPanel>     </form>     <p-footer>         <button type=\"submit\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\"  (click)=\"f.ngSubmit.emit()\"></button>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"cancel()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ChangeDetectorRef])
    ], QuestionDialog);
    return QuestionDialog;
}(base_dialog_1.BaseDialog));
exports.QuestionDialog = QuestionDialog;
