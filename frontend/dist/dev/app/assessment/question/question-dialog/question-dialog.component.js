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
            templateUrl: 'question-dialog.component.html',
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ChangeDetectorRef])
    ], QuestionDialog);
    return QuestionDialog;
}(base_dialog_1.BaseDialog));
exports.QuestionDialog = QuestionDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLWRpYWxvZy9xdWVzdGlvbi1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFnSTtBQUloSSw0RUFBcUU7QUFDckUsMkVBQXlFO0FBR3pFLGlFQUErRDtBQUcvRCxrR0FBK0Y7QUFFL0YsOEVBQTJFO0FBVzNFO0lBQW9DLGtDQUFvQjtJQVV2RCx3QkFBb0Isd0JBQWtELEVBQVUsa0JBQXFDO1FBQXJILFlBQ0MsaUJBQU8sU0FHUDtRQUptQiw4QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQVUsd0JBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUVwSCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOztJQUN6QyxDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLEtBQVU7UUFDcEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQ3ZFO0lBQ0YsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkE4QkM7UUE3QkEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzNCLG1CQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtnQkFDN0MsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUNwQixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1RTtZQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3JDLElBQUksZUFBZSxHQUFHLHFDQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzFELElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM5RixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDM0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFTLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztnQkFDMUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNyQyxJQUFJLEtBQUksQ0FBQyxZQUFZO2dCQUNSLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDOUQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDaEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3JDLElBQUksS0FBSSxDQUFDLFlBQVk7Z0JBQ1IsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUM5RCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELDZCQUFJLEdBQUo7UUFBQSxpQkFJQztRQUhZLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM5RCxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFuRHNDO1FBQXRDLGdCQUFTLENBQUMseURBQTBCLENBQUM7a0NBQWUseURBQTBCO3dEQUFDO0lBUnBFLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSxnQ0FBZ0M7U0FDN0MsQ0FBQzt5Q0FXNkMsK0JBQXdCLEVBQThCLHdCQUFpQjtPQVZ6RyxjQUFjLENBNEQxQjtJQUFELHFCQUFDO0NBNURELEFBNERDLENBNURtQyx3QkFBVSxHQTREN0M7QUE1RFksd0NBQWMiLCJmaWxlIjoiYXBwL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tZGlhbG9nL3F1ZXN0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgSW5wdXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IEJhc2VEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuZGlhbG9nJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgUVVFU1RJT05fTEVWRUwgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSVF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uUmVnaXN0ZXIgfSBmcm9tICcuLi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5kZWNvcmF0b3InO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvd2luZG9udy5yZWYnO1xuZGVjbGFyZSB2YXIgJDtcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdxdWVzdGlvbi1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ3F1ZXN0aW9uLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uRGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxRdWVzdGlvbj4gIHtcblxuXHRwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSBjb21wb25lbnRSZWY6IGFueTtcblx0cHJpdmF0ZSB0cmVlVXRpbHM6IFRyZWVVdGlscztcblx0V0lORE9XX0hFSUdIVDogYW55O1xuXG5cdEBWaWV3Q2hpbGQoUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmUpIHF1ZXN0aW9uSG9zdDogUXVlc3Rpb25Db250YWluZXJEaXJlY3RpdmU7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcblx0XHR0aGlzLldJTkRPV19IRUlHSFQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG5cdH1cblxuXHRub2RlU2VsZWN0KGV2ZW50OiBhbnkpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZE5vZGUpIHtcblx0XHRcdHRoaXMub2JqZWN0Lmdyb3VwX2lkID0gdGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5pZDtcblx0XHRcdHRoaXMub2JqZWN0Lmdyb3VwX2lkX19ERVNDX18gPSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmdyb3VwX2lkX19ERVNDX187XG5cdFx0fVxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5vblNob3cuc3Vic2NyaWJlKG9iamVjdCA9PiB7XG5cdFx0XHRHcm91cC5saXN0UXVlc3Rpb25Hcm91cCh0aGlzKS5zdWJzY3JpYmUoZ3JvdXBzID0+IHtcblx0XHRcdFx0dGhpcy50cmVlID0gdGhpcy50cmVlVXRpbHMuYnVpbGRHcm91cFRyZWUoZ3JvdXBzKTtcblx0XHRcdFx0aWYgKG9iamVjdC5ncm91cF9pZCkge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlID0gdGhpcy50cmVlVXRpbHMuZmluZFRyZWVOb2RlKHRoaXMudHJlZSwgb2JqZWN0Lmdyb3VwX2lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRvYmplY3QucG9wdWxhdGVPcHRpb24odGhpcykuc3Vic2NyaWJlKCgpPT4ge1xuXHRcdFx0XHR2YXIgZGV0YWlsQ29tcG9uZW50ID0gUXVlc3Rpb25SZWdpc3Rlci5JbnN0YW5jZS5sb29rdXAob2JqZWN0LnR5cGUpO1xuXHRcdFx0XHRsZXQgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMucXVlc3Rpb25Ib3N0LnZpZXdDb250YWluZXJSZWY7XG5cdFx0XHRcdGxldCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoZGV0YWlsQ29tcG9uZW50KTtcblx0XHRcdFx0dmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuXHRcdFx0XHR0aGlzLmNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubW9kZSA9ICdlZGl0Jztcblx0XHRcdFx0KDxJUXVlc3Rpb24+dGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UpLnJlbmRlcihvYmplY3QpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5vblVwZGF0ZUNvbXBsZXRlLnN1YnNjcmliZShvYmplY3QgPT4ge1xuXHRcdFx0aWYgKHRoaXMuY29tcG9uZW50UmVmKVxuXHRcdFx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuc2F2ZUVkaXRvcigpLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zdWNjZXNzKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdRdWVzdGlvbiBzYXZlZC4nKSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMub25DcmVhdGVDb21wbGV0ZS5zdWJzY3JpYmUob2JqZWN0ID0+IHtcblx0XHRcdGlmICh0aGlzLmNvbXBvbmVudFJlZilcblx0XHRcdFx0KDxJUXVlc3Rpb24+dGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UpLnNhdmVFZGl0b3IoKS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuc3VjY2Vzcyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnUXVlc3Rpb24gc2F2ZWQuJykpO1xuXHRcdFx0XHR9KTtcblx0XHR9KVxuXHR9XG5cblx0c2F2ZSgpIHtcblx0XHQoPElRdWVzdGlvbj50aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSkuc2F2ZUVkaXRvcigpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdH0pO1xuXHR9XG59XG5cblxuIl19
