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
var question_model_1 = require("../../models/elearning/question.model");
var tree_utils_1 = require("../../helpers/tree.utils");
var constants_1 = require("../../../shared/models/constants");
var SelectQuestionsDialog = (function (_super) {
    __extends(SelectQuestionsDialog, _super);
    function SelectQuestionsDialog() {
        var _this = _super.call(this) || this;
        _this.QUESTION_TYPE = constants_1.QUESTION_TYPE;
        _this.onSelectQuestionsReceiver = new Rx_1.Subject();
        _this.onSelectQuestions = _this.onSelectQuestionsReceiver.asObservable();
        _this.display = false;
        _this.selectedQuestions = [];
        _this.questions = [];
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    SelectQuestionsDialog.prototype.hide = function () {
        this.display = false;
    };
    SelectQuestionsDialog.prototype.nodeSelect = function (event) {
        var _this = this;
        if (this.selectedGroupNodes) {
            var groupNodes = [];
            this.selectedGroupNodes.forEach(function (node) {
                groupNodes.push(node.data.id);
            });
            question_model_1.Question.listByGroups(this, groupNodes).subscribe(function (questions) {
                _this.questions = questions;
            });
        }
    };
    SelectQuestionsDialog.prototype.show = function () {
        var _this = this;
        this.display = true;
        this.selectedQuestions = [];
        group_model_1.Group.listQuestionGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
    };
    SelectQuestionsDialog.prototype.selectCourse = function () {
        this.onSelectQuestionsReceiver.next(this.selectedQuestions);
        this.hide();
    };
    SelectQuestionsDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'select-question-dialog',
            templateUrl: 'select-question-dialog.component.html',
            styleUrls: ['select-question-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], SelectQuestionsDialog);
    return SelectQuestionsDialog;
}(base_component_1.BaseComponent));
exports.SelectQuestionsDialog = SelectQuestionsDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtcXVlc3Rpb24tZGlhbG9nL3NlbGVjdC1xdWVzdGlvbi1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCw4QkFBOEM7QUFDOUMsa0VBQTJEO0FBQzNELHlEQUF1RDtBQUN2RCx3RUFBaUU7QUFFakUsdURBQXFEO0FBRXJELDhEQUFnRjtBQVNoRjtJQUEyQyx5Q0FBYTtJQWN2RDtRQUFBLFlBQ0MsaUJBQU8sU0FLUDtRQWJELG1CQUFhLEdBQUcseUJBQWEsQ0FBQztRQUl0QiwrQkFBeUIsR0FBaUIsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUNoRSx1QkFBaUIsR0FBb0IsS0FBSSxDQUFDLHlCQUF5QixDQUFDLFlBQVksRUFBRSxDQUFDO1FBSWxGLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDNUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQzs7SUFDbEMsQ0FBQztJQUVELG9DQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsMENBQVUsR0FBVixVQUFXLEtBQVU7UUFBckIsaUJBVUM7UUFUQSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUM1QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ25DLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztZQUNILHlCQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxTQUFTO2dCQUMxRCxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVELG9DQUFJLEdBQUo7UUFBQSxpQkFPQztRQU5BLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFFNUIsbUJBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzdDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsNENBQVksR0FBWjtRQUNDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQWxEVyxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7U0FDbkQsQ0FBQzs7T0FDVyxxQkFBcUIsQ0FxRGpDO0lBQUQsNEJBQUM7Q0FyREQsQUFxREMsQ0FyRDBDLDhCQUFhLEdBcUR2RDtBQXJEWSxzREFBcUIiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1xdWVzdGlvbi1kaWFsb2cvc2VsZWN0LXF1ZXN0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFRyZWVVdGlscyB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEdST1VQX0NBVEVHT1JZLCBRVUVTVElPTl9UWVBFIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdzZWxlY3QtcXVlc3Rpb24tZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICdzZWxlY3QtcXVlc3Rpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJ3NlbGVjdC1xdWVzdGlvbi1kaWFsb2cuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RRdWVzdGlvbnNEaWFsb2cgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuXHRwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBUcmVlTm9kZTtcblx0cHJpdmF0ZSBzZWxlY3RlZFF1ZXN0aW9uczogUXVlc3Rpb25bXTtcblx0cHJpdmF0ZSBxdWVzdGlvbnM6IFF1ZXN0aW9uW107XG5cdHByaXZhdGUgZGlzcGxheTogYm9vbGVhbjtcblx0UVVFU1RJT05fVFlQRSA9IFFVRVNUSU9OX1RZUEU7XG5cdHByaXZhdGUgdHJlZVV0aWxzOiBUcmVlVXRpbHM7XG5cdHByaXZhdGUgc2VsZWN0ZWRHcm91cE5vZGVzOiBUcmVlTm9kZVtdO1xuXG5cdHByaXZhdGUgb25TZWxlY3RRdWVzdGlvbnNSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblx0b25TZWxlY3RRdWVzdGlvbnM6IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25TZWxlY3RRdWVzdGlvbnNSZWNlaXZlci5hc09ic2VydmFibGUoKTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuXHRcdHRoaXMuc2VsZWN0ZWRRdWVzdGlvbnMgPSBbXTtcblx0XHR0aGlzLnF1ZXN0aW9ucyA9IFtdO1xuXHRcdHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuXHR9XG5cblx0aGlkZSgpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSBmYWxzZTtcblx0fVxuXG5cdG5vZGVTZWxlY3QoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkR3JvdXBOb2Rlcykge1xuXHRcdFx0dmFyIGdyb3VwTm9kZXMgPSBbXTtcblx0XHRcdHRoaXMuc2VsZWN0ZWRHcm91cE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG5cdFx0XHRcdGdyb3VwTm9kZXMucHVzaChub2RlLmRhdGEuaWQpO1xuXHRcdFx0fSk7XG5cdFx0XHRRdWVzdGlvbi5saXN0QnlHcm91cHModGhpcywgZ3JvdXBOb2Rlcykuc3Vic2NyaWJlKHF1ZXN0aW9ucyA9PiB7XG5cdFx0XHRcdHRoaXMucXVlc3Rpb25zID0gcXVlc3Rpb25zO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0c2hvdygpIHtcblx0XHR0aGlzLmRpc3BsYXkgPSB0cnVlO1xuXHRcdHRoaXMuc2VsZWN0ZWRRdWVzdGlvbnMgPSBbXTtcblx0XHQvLyAsIEdST1VQX0NBVEVHT1JZLlFVRVNUSU9OXG5cdFx0R3JvdXAubGlzdFF1ZXN0aW9uR3JvdXAodGhpcykuc3Vic2NyaWJlKGdyb3VwcyA9PiB7XG5cdFx0XHR0aGlzLnRyZWUgPSB0aGlzLnRyZWVVdGlscy5idWlsZEdyb3VwVHJlZShncm91cHMpO1xuXHRcdH0pO1xuXHR9XG5cblx0c2VsZWN0Q291cnNlKCkge1xuXHRcdHRoaXMub25TZWxlY3RRdWVzdGlvbnNSZWNlaXZlci5uZXh0KHRoaXMuc2VsZWN0ZWRRdWVzdGlvbnMpO1xuXHRcdHRoaXMuaGlkZSgpO1xuXHR9XG5cblxufVxuXG4iXX0=
