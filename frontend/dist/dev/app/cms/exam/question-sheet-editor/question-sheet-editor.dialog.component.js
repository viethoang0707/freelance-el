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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var base_component_1 = require("../../../shared/components/base/base.component");
var question_model_1 = require("../../../shared/models/elearning/question.model");
var exam_question_model_1 = require("../../../shared/models/elearning/exam-question.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var QuestionSheetEditorDialog = (function (_super) {
    __extends(QuestionSheetEditorDialog, _super);
    function QuestionSheetEditorDialog() {
        var _this = _super.call(this) || this;
        _this.QUESTION_LEVEL = constants_1.QUESTION_LEVEL;
        _this.onSaveReceiver = new Rx_1.Subject();
        _this.onSave = _this.onSaveReceiver.asObservable();
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    QuestionSheetEditorDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.tree = {};
        this.selectorGroups = {};
        this.selectedNodes = {};
        _.each(constants_1.QUESTION_LEVEL, function (val, key) {
            _this.selectorGroups[key] = {};
            _this.selectorGroups[key]["number"] = 0;
            _this.selectorGroups[key]["score"] = 0;
            _this.selectorGroups[key]["include_sub_group"] = true;
            _this.selectorGroups[key]["group_ids"] = [];
            _this.selectedNodes[key] = [];
        });
        group_model_1.Group.listQuestionGroup(this).subscribe(function (groups) {
            _.each(constants_1.QUESTION_LEVEL, function (val, key) {
                _this.tree[key] = _this.treeUtils.buildGroupTree(groups);
                _this.selectedNodes[key] = _.map(_this.selectorGroups[key]["group_ids"], (function (group_id) {
                    return _this.treeUtils.findTreeNode(_this.tree[key], group_id);
                }));
            });
        });
    };
    QuestionSheetEditorDialog.prototype.nodeSelect = function (event, level) {
        this.selectorGroups[level]["group_ids"] = _.map(this.selectedNodes[level], (function (node) {
            return node['data']['id'];
        }));
    };
    QuestionSheetEditorDialog.prototype.createExamQuestionFromQuestionBank = function (questions, score) {
        return _.map(questions, function (question) {
            var examQuestion = new exam_question_model_1.ExamQuestion();
            examQuestion.question_id = question.id;
            examQuestion.score = score;
            examQuestion.title = question.title;
            examQuestion.group_id = question.group_id;
            examQuestion.group_id__DESC__ = question.group_id__DESC__;
            return examQuestion;
        });
    };
    QuestionSheetEditorDialog.prototype.generateQuestion = function () {
        var _this = this;
        var subscriptions = [];
        _.each(constants_1.QUESTION_LEVEL, function (val, key) {
            var groupIds = _this.selectorGroups[key]["group_ids"];
            if (groupIds.length > 0 && _this.selectorGroups[key]["number"])
                subscriptions.push(question_model_1.Question.listByGroups(_this, groupIds).do(function (questions) {
                    questions = _.shuffle(questions);
                    questions = _.filter(questions, function (obj) {
                        return obj.level == key;
                    });
                    var score = _this.selectorGroups[key]["score"];
                    questions = questions.slice(0, _this.selectorGroups[key]["number"]);
                    _this.examQuestions = _this.examQuestions.concat(_this.createExamQuestionFromQuestionBank(questions, score));
                }));
        });
        return subscriptions;
    };
    QuestionSheetEditorDialog.prototype.show = function () {
        this.display = true;
        this.examQuestions = [];
    };
    QuestionSheetEditorDialog.prototype.hide = function () {
        this.display = false;
    };
    QuestionSheetEditorDialog.prototype.save = function () {
        var _this = this;
        Rx_1.Observable.forkJoin(this.generateQuestion()).subscribe(function () {
            _this.hide();
            _this.onSaveReceiver.next(_this.examQuestions);
            _this.success(_this.translateService.instant('Content saved successfully.'));
        });
    };
    QuestionSheetEditorDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'question-sheet-editor-dialog',
            templateUrl: 'question-sheet-editor.dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], QuestionSheetEditorDialog);
    return QuestionSheetEditorDialog;
}(base_component_1.BaseComponent));
exports.QuestionSheetEditorDialog = QuestionSheetEditorDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvZXhhbS9xdWVzdGlvbi1zaGVldC1lZGl0b3IvcXVlc3Rpb24tc2hlZXQtZWRpdG9yLmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBQ3BFLDhCQUE4QztBQUc5Qyw0RUFBcUU7QUFDckUsaUZBQStFO0FBRS9FLGtGQUEyRTtBQUczRSw0RkFBb0Y7QUFFcEYsOERBQXFKO0FBRXJKLDhCQUFnQztBQUNoQyxpRUFBK0Q7QUFTL0Q7SUFBK0MsNkNBQWE7SUFjM0Q7UUFBQSxZQUNDLGlCQUFPLFNBR1A7UUFoQkQsb0JBQWMsR0FBRywwQkFBYyxDQUFDO1FBU3hCLG9CQUFjLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDbEQsWUFBTSxHQUFvQixLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSS9ELEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7O0lBRWxDLENBQUM7SUFFRCw0Q0FBUSxHQUFSO1FBQUEsaUJBb0JDO1FBbkJBLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBYyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDL0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDOUIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FB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THJDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxXQUFXLEVBQUUsNkNBQTZDO1NBQzFELENBQUM7O09BQ1cseUJBQXlCLENBa0dyQztJQUFELGdDQUFDO0NBbEdELEFBa0dDLENBbEc4Qyw4QkFBYSxHQWtHM0Q7QUFsR1ksOERBQXlCIiwiZmlsZSI6ImFwcC9jbXMvZXhhbS9xdWVzdGlvbi1zaGVldC1lZGl0b3IvcXVlc3Rpb24tc2hlZXQtZWRpdG9yLmRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uU2hlZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi1zaGVldC5tb2RlbCc7XG5pbXBvcnQgeyBFeGFtR3JhZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLWdyYWRlLm1vZGVsJztcbmltcG9ydCB7IEV4YW1RdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IFFVRVNUSU9OX1NFTEVDVElPTiwgR1JPVVBfQ0FURUdPUlksIEVYQU1fU1RBVFVTLCBRVUVTVElPTl9UWVBFLCBFWEFNX01FTUJFUl9TVEFUVVMsIFFVRVNUSU9OX0xFVkVMIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnXG5pbXBvcnQgeyBTZWxlY3RJdGVtLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFNlbGVjdFF1ZXN0aW9uc0RpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3NlbGVjdC1xdWVzdGlvbi1kaWFsb2cvc2VsZWN0LXF1ZXN0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3F1ZXN0aW9uLXNoZWV0LWVkaXRvci1kaWFsb2cnLFxuXHR0ZW1wbGF0ZVVybDogJ3F1ZXN0aW9uLXNoZWV0LWVkaXRvci5kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblNoZWV0RWRpdG9yRGlhbG9nIGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0UVVFU1RJT05fTEVWRUwgPSBRVUVTVElPTl9MRVZFTDtcblxuXHRwcml2YXRlIGRpc3BsYXk6IGJvb2xlYW47XG5cdHByaXZhdGUgdHJlZTogYW55O1xuXHRwcml2YXRlIHNlbGVjdG9yR3JvdXBzOiBhbnk7XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlczogYW55O1xuXHRwcml2YXRlIGdyb3VwczogR3JvdXBbXTtcblx0cHJpdmF0ZSB0cmVlVXRpbHM6IFRyZWVVdGlscztcblx0cHJpdmF0ZSBleGFtUXVlc3Rpb25zOiBFeGFtUXVlc3Rpb25bXTtcblx0cHJpdmF0ZSBvblNhdmVSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBvblNhdmU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMub25TYXZlUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcblx0XHRcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMudHJlZSA9IHt9O1xuXHRcdHRoaXMuc2VsZWN0b3JHcm91cHMgPSB7fTtcblx0XHR0aGlzLnNlbGVjdGVkTm9kZXMgPSB7fTtcblx0XHRfLmVhY2goUVVFU1RJT05fTEVWRUwsICh2YWwsIGtleSkgPT4ge1xuXHRcdFx0dGhpcy5zZWxlY3Rvckdyb3Vwc1trZXldID0ge307XG5cdFx0XHR0aGlzLnNlbGVjdG9yR3JvdXBzW2tleV1bXCJudW1iZXJcIl0gPSAwO1xuXHRcdFx0dGhpcy5zZWxlY3Rvckdyb3Vwc1trZXldW1wic2NvcmVcIl0gPSAwO1xuXHRcdFx0dGhpcy5zZWxlY3Rvckdyb3Vwc1trZXldW1wiaW5jbHVkZV9zdWJfZ3JvdXBcIl0gPSB0cnVlO1xuXHRcdFx0dGhpcy5zZWxlY3Rvckdyb3Vwc1trZXldW1wiZ3JvdXBfaWRzXCJdID0gW107XG5cdFx0XHR0aGlzLnNlbGVjdGVkTm9kZXNba2V5XSA9IFtdO1xuXHRcdH0pO1xuXHRcdEdyb3VwLmxpc3RRdWVzdGlvbkdyb3VwKHRoaXMpLnN1YnNjcmliZShncm91cHMgPT4ge1xuXHRcdFx0Xy5lYWNoKFFVRVNUSU9OX0xFVkVMLCAodmFsLCBrZXkpID0+IHtcblx0XHRcdFx0dGhpcy50cmVlW2tleV0gPSB0aGlzLnRyZWVVdGlscy5idWlsZEdyb3VwVHJlZShncm91cHMpO1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkTm9kZXNba2V5XSA9IF8ubWFwKHRoaXMuc2VsZWN0b3JHcm91cHNba2V5XVtcImdyb3VwX2lkc1wiXSwgKGdyb3VwX2lkID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy50cmVlVXRpbHMuZmluZFRyZWVOb2RlKHRoaXMudHJlZVtrZXldLCBncm91cF9pZCk7XG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0bm9kZVNlbGVjdChldmVudDogYW55LCBsZXZlbCkge1xuXHRcdHRoaXMuc2VsZWN0b3JHcm91cHNbbGV2ZWxdW1wiZ3JvdXBfaWRzXCJdID0gXy5tYXAodGhpcy5zZWxlY3RlZE5vZGVzW2xldmVsXSwgKG5vZGUgPT4ge1xuXHRcdFx0cmV0dXJuIG5vZGVbJ2RhdGEnXVsnaWQnXTtcblx0XHR9KSk7XG5cdH1cblxuXHRjcmVhdGVFeGFtUXVlc3Rpb25Gcm9tUXVlc3Rpb25CYW5rKHF1ZXN0aW9uczogUXVlc3Rpb25bXSwgc2NvcmUpICB7XG5cdFx0cmV0dXJuICBfLm1hcChxdWVzdGlvbnMsIChxdWVzdGlvbjpRdWVzdGlvbikgPT4ge1xuXHRcdFx0dmFyIGV4YW1RdWVzdGlvbiA9IG5ldyBFeGFtUXVlc3Rpb24oKTtcblx0XHRcdGV4YW1RdWVzdGlvbi5xdWVzdGlvbl9pZCA9IHF1ZXN0aW9uLmlkO1xuXHRcdFx0ZXhhbVF1ZXN0aW9uLnNjb3JlID0gc2NvcmU7XG5cdFx0XHRleGFtUXVlc3Rpb24udGl0bGUgPSBxdWVzdGlvbi50aXRsZTtcblx0XHRcdGV4YW1RdWVzdGlvbi5ncm91cF9pZCA9IHF1ZXN0aW9uLmdyb3VwX2lkO1xuXHRcdFx0ZXhhbVF1ZXN0aW9uLmdyb3VwX2lkX19ERVNDX18gPSBxdWVzdGlvbi5ncm91cF9pZF9fREVTQ19fO1xuXHRcdFx0cmV0dXJuIGV4YW1RdWVzdGlvbjtcblx0XHR9KTtcblx0fVxuXG5cdGdlbmVyYXRlUXVlc3Rpb24oKSB7XG5cdFx0dmFyIHN1YnNjcmlwdGlvbnMgPSBbXTtcblx0XHRfLmVhY2goUVVFU1RJT05fTEVWRUwsICh2YWwsIGtleSk9PiB7XG5cdFx0XHR2YXIgZ3JvdXBJZHMgPSB0aGlzLnNlbGVjdG9yR3JvdXBzW2tleV1bXCJncm91cF9pZHNcIl1cblx0XHRcdGlmIChncm91cElkcy5sZW5ndGggPiAwICYmIHRoaXMuc2VsZWN0b3JHcm91cHNba2V5XVtcIm51bWJlclwiXSlcblx0XHRcdFx0c3Vic2NyaXB0aW9ucy5wdXNoKFF1ZXN0aW9uLmxpc3RCeUdyb3Vwcyh0aGlzLCBncm91cElkcykuZG8ocXVlc3Rpb25zID0+IHtcblx0XHRcdFx0XHRxdWVzdGlvbnMgPSBfLnNodWZmbGUocXVlc3Rpb25zKTtcblx0XHRcdFx0XHRxdWVzdGlvbnMgPSBfLmZpbHRlcihxdWVzdGlvbnMsIChvYmo6UXVlc3Rpb24pPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG9iai5sZXZlbCA9PSBrZXk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dmFyIHNjb3JlID0gdGhpcy5zZWxlY3Rvckdyb3Vwc1trZXldW1wic2NvcmVcIl07XG5cdFx0XHRcdFx0cXVlc3Rpb25zID0gcXVlc3Rpb25zLnNsaWNlKDAsIHRoaXMuc2VsZWN0b3JHcm91cHNba2V5XVtcIm51bWJlclwiXSk7XG5cdFx0XHRcdFx0dGhpcy5leGFtUXVlc3Rpb25zID0gdGhpcy5leGFtUXVlc3Rpb25zLmNvbmNhdCh0aGlzLmNyZWF0ZUV4YW1RdWVzdGlvbkZyb21RdWVzdGlvbkJhbmsocXVlc3Rpb25zLCBzY29yZSkpO1xuXHRcdFx0XHR9KSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHN1YnNjcmlwdGlvbnM7XG5cdH1cblxuXHRzaG93KCkge1xuXHRcdHRoaXMuZGlzcGxheSA9IHRydWU7XG5cdFx0dGhpcy5leGFtUXVlc3Rpb25zID0gW107XG5cdFx0XG5cdH1cblxuXG5cdGhpZGUoKSB7XG5cdFx0dGhpcy5kaXNwbGF5ID0gZmFsc2U7XG5cdH1cblxuXHRzYXZlKCkge1xuXHRcdE9ic2VydmFibGUuZm9ya0pvaW4odGhpcy5nZW5lcmF0ZVF1ZXN0aW9uKCkpLnN1YnNjcmliZSgoKT0+IHtcblx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdFx0dGhpcy5vblNhdmVSZWNlaXZlci5uZXh0KHRoaXMuZXhhbVF1ZXN0aW9ucyk7XG5cdFx0XHR0aGlzLnN1Y2Nlc3ModGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ0NvbnRlbnQgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicpKTtcblx0XHR9KVxuXHR9XG5cblx0XG59Il19
