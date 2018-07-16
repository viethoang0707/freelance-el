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
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var group_model_1 = require("../../../shared/models/elearning/group.model");
var question_dialog_component_1 = require("../question-dialog/question-dialog.component");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var import_dialog_component_1 = require("../import-dialog/import-dialog.component");
var QuestionListComponent = (function (_super) {
    __extends(QuestionListComponent, _super);
    function QuestionListComponent() {
        var _this = _super.call(this) || this;
        _this.QUESTION_LEVEL = constants_1.QUESTION_LEVEL;
        _this.QUESTION_TYPE = constants_1.QUESTION_TYPE;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.questions = [];
        _this.selectMode = "single";
        _this.items = [
            { label: _this.translateService.instant(constants_1.QUESTION_TYPE['sc']), command: function () { _this.addQuestion('sc'); } },
            { label: _this.translateService.instant(constants_1.QUESTION_TYPE['mc']), command: function () { _this.addQuestion('mc'); } },
            { label: _this.translateService.instant(constants_1.QUESTION_TYPE['ext']), command: function () { _this.addQuestion('ext'); } },
        ];
        return _this;
    }
    QuestionListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listQuestionGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadQuestions();
    };
    QuestionListComponent.prototype.addQuestion = function (type) {
        var _this = this;
        var question = new question_model_1.Question();
        question.type = type;
        this.questionDialog.show(question);
        this.questionDialog.onCreateComplete.subscribe(function () {
            _this.loadQuestions();
        });
    };
    QuestionListComponent.prototype.editQuestion = function () {
        if (this.selectedQuestions && this.selectMode == 'single')
            this.questionDialog.show(this.selectedQuestions);
    };
    QuestionListComponent.prototype.deleteMultipleQuestions = function () {
        var _this = this;
        if (this.selectedQuestions && this.selectedQuestions.length)
            this.confirm('Are you sure to delete ?', function () {
                question_model_1.Question.deleteArray(_this, _this.selectedQuestions).subscribe(function () {
                    _this.selectedQuestions = null;
                    _this.loadQuestions();
                    _this.selectMode = "single";
                });
            });
    };
    QuestionListComponent.prototype.loadQuestions = function () {
        var _this = this;
        question_model_1.Question.all(this).subscribe(function (questions) {
            _this.questions = questions;
            _this.displayQuestions = questions;
        });
    };
    QuestionListComponent.prototype.importQuestion = function () {
        var _this = this;
        this.questionImportDialog.show();
        this.questionImportDialog.onImportComplete.subscribe(function () {
            _this.loadQuestions();
        });
    };
    QuestionListComponent.prototype.filterQuestion = function () {
        var _this = this;
        if (this.selectedGroupNodes.length != 0) {
            this.displayQuestions = _.filter(this.questions, function (question) {
                var parentGroupNode = _.find(_this.selectedGroupNodes, function (node) {
                    return node.data.id == question.group_id;
                });
                return parentGroupNode != null;
            });
        }
        else {
            this.displayQuestions = this.questions;
        }
    };
    __decorate([
        core_1.ViewChild(question_dialog_component_1.QuestionDialog),
        __metadata("design:type", question_dialog_component_1.QuestionDialog)
    ], QuestionListComponent.prototype, "questionDialog", void 0);
    __decorate([
        core_1.ViewChild(import_dialog_component_1.QuestionImportDialog),
        __metadata("design:type", import_dialog_component_1.QuestionImportDialog)
    ], QuestionListComponent.prototype, "questionImportDialog", void 0);
    QuestionListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-list',
            templateUrl: 'question-list.component.html',
            styleUrls: ['question-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], QuestionListComponent);
    return QuestionListComponent;
}(base_component_1.BaseComponent));
exports.QuestionListComponent = QuestionListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLWxpc3QvcXVlc3Rpb24tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBRXBFLGlGQUErRTtBQUcvRSw4QkFBZ0M7QUFDaEMsOERBQWdHO0FBQ2hHLGtGQUEyRTtBQUMzRSw0RUFBcUU7QUFDckUsMEZBQThFO0FBQzlFLGlFQUErRDtBQUUvRCxvRkFBZ0Y7QUFTaEY7SUFBMkMseUNBQWE7SUFrQnBEO1FBQUEsWUFDSSxpQkFBTyxTQVNWO1FBMUJELG9CQUFjLEdBQUcsMEJBQWMsQ0FBQztRQUNoQyxtQkFBYSxHQUFHLHlCQUFhLENBQUM7UUFpQjFCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7UUFDakMsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDM0IsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNULEVBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMseUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFPLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUM7WUFDcEcsRUFBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyx5QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQztZQUNwRyxFQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLHlCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTyxLQUFJ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LENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxnQkFBZ0IsR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQXpFMEI7UUFBMUIsZ0JBQVMsQ0FBQywwQ0FBYyxDQUFDO2tDQUFpQiwwQ0FBYztpRUFBQztJQUN6QjtRQUFoQyxnQkFBUyxDQUFDLDhDQUFvQixDQUFDO2tDQUF1Qiw4Q0FBb0I7dUVBQUM7SUFmbkUscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDOztPQUNXLHFCQUFxQixDQXdGakM7SUFBRCw0QkFBQztDQXhGRCxBQXdGQyxDQXhGMEMsOEJBQWEsR0F3RnZEO0FBeEZZLHNEQUFxQiIsImZpbGUiOiJhcHAvYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi1saXN0L3F1ZXN0aW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFFVRVNUSU9OX1RZUEUsIEdST1VQX0NBVEVHT1JZLCBRVUVTVElPTl9MRVZFTCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2dyb3VwLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uRGlhbG9nIH0gZnJvbSAnLi4vcXVlc3Rpb24tZGlhbG9nL3F1ZXN0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBRdWVzdGlvbkltcG9ydERpYWxvZyB9IGZyb20gJy4uL2ltcG9ydC1kaWFsb2cvaW1wb3J0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ3F1ZXN0aW9uLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAncXVlc3Rpb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ3F1ZXN0aW9uLWxpc3QuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkxpc3RDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ29tcG9uZW50IHtcblxuICAgIFFVRVNUSU9OX0xFVkVMID0gUVVFU1RJT05fTEVWRUw7XG4gICAgUVVFU1RJT05fVFlQRSA9IFFVRVNUSU9OX1RZUEU7XG5cbiAgICBwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG4gICAgcHJpdmF0ZSBpdGVtczogTWVudUl0ZW1bXTtcbiAgICBwcml2YXRlIHF1ZXN0aW9uczogUXVlc3Rpb25bXTtcbiAgICBwcml2YXRlIGRpc3BsYXlRdWVzdGlvbnM6IFF1ZXN0aW9uW107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEdyb3VwTm9kZXM6IFRyZWVOb2RlW107XG4gICAgcHJpdmF0ZSB0cmVlVXRpbHM6IFRyZWVVdGlscztcbiAgICBwcml2YXRlIHNlbGVjdGVkUXVlc3Rpb25zOiBhbnk7XG4gICAgcHJpdmF0ZSBzZWxlY3RNb2RlOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKFF1ZXN0aW9uRGlhbG9nKSBxdWVzdGlvbkRpYWxvZzogUXVlc3Rpb25EaWFsb2c7XG4gICAgQFZpZXdDaGlsZChRdWVzdGlvbkltcG9ydERpYWxvZykgcXVlc3Rpb25JbXBvcnREaWFsb2c6IFF1ZXN0aW9uSW1wb3J0RGlhbG9nO1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmVlVXRpbHMgPSBuZXcgVHJlZVV0aWxzKCk7XG4gICAgICAgIHRoaXMucXVlc3Rpb25zID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9IFwic2luZ2xlXCI7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgICAgICB7bGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KFFVRVNUSU9OX1RZUEVbJ3NjJ10pLCBjb21tYW5kOiAoKT0+IHsgdGhpcy5hZGRRdWVzdGlvbignc2MnKX19LFxuICAgICAgICAgICAge2xhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudChRVUVTVElPTl9UWVBFWydtYyddKSwgY29tbWFuZDogKCk9PiB7IHRoaXMuYWRkUXVlc3Rpb24oJ21jJyl9fSxcbiAgICAgICAgICAgIHtsYWJlbDogdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoUVVFU1RJT05fVFlQRVsnZXh0J10pLCBjb21tYW5kOiAoKT0+IHsgdGhpcy5hZGRRdWVzdGlvbignZXh0Jyl9fSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgR3JvdXAubGlzdFF1ZXN0aW9uR3JvdXAodGhpcykuc3Vic2NyaWJlKGdyb3Vwcz0+IHtcbiAgICAgICAgICAgIHRoaXMudHJlZSA9IHRoaXMudHJlZVV0aWxzLmJ1aWxkR3JvdXBUcmVlKGdyb3Vwcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvYWRRdWVzdGlvbnMoKTtcbiAgICB9XG5cbiAgICBhZGRRdWVzdGlvbih0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uKCk7XG4gICAgICAgIHF1ZXN0aW9uLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uRGlhbG9nLnNob3cocXVlc3Rpb24pO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uRGlhbG9nLm9uQ3JlYXRlQ29tcGxldGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFF1ZXN0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlZGl0UXVlc3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUXVlc3Rpb25zICYmIHRoaXMuc2VsZWN0TW9kZT09J3NpbmdsZScpXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uRGlhbG9nLnNob3codGhpcy5zZWxlY3RlZFF1ZXN0aW9ucyk7XG4gICAgfVxuXG4gICAgZGVsZXRlTXVsdGlwbGVRdWVzdGlvbnMoKXtcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZFF1ZXN0aW9ucyAmJiB0aGlzLnNlbGVjdGVkUXVlc3Rpb25zLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMuY29uZmlybSgnQXJlIHlvdSBzdXJlIHRvIGRlbGV0ZSA/JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFF1ZXN0aW9uLmRlbGV0ZUFycmF5KHRoaXMsIHRoaXMuc2VsZWN0ZWRRdWVzdGlvbnMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRRdWVzdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRRdWVzdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID0gXCJzaW5nbGVcIjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRRdWVzdGlvbnMoKSB7XG4gICAgICAgIFF1ZXN0aW9uLmFsbCh0aGlzKS5zdWJzY3JpYmUocXVlc3Rpb25zID0+IHtcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zID0gcXVlc3Rpb25zO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5UXVlc3Rpb25zID0gcXVlc3Rpb25zO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbXBvcnRRdWVzdGlvbigpIHtcbiAgICAgICAgdGhpcy5xdWVzdGlvbkltcG9ydERpYWxvZy5zaG93KCk7XG4gICAgICAgIHRoaXMucXVlc3Rpb25JbXBvcnREaWFsb2cub25JbXBvcnRDb21wbGV0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkUXVlc3Rpb25zKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlclF1ZXN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEdyb3VwTm9kZXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVF1ZXN0aW9ucyA9IF8uZmlsdGVyKHRoaXMucXVlc3Rpb25zLCBxdWVzdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudEdyb3VwTm9kZSA9ICBfLmZpbmQodGhpcy5zZWxlY3RlZEdyb3VwTm9kZXMsIG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5kYXRhLmlkID09IHF1ZXN0aW9uLmdyb3VwX2lkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRHcm91cE5vZGUgIT0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5UXVlc3Rpb25zID0gIHRoaXMucXVlc3Rpb25zO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
