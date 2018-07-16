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
            templateUrl: 'course-dialog.component.html',
            styleUrls: ['course-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CourseDialog);
    return CourseDialog;
}(base_dialog_1.BaseDialog));
exports.CourseDialog = CourseDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb3Vyc2UvY291cnNlL2NvdXJzZS1kaWFsb2cvY291cnNlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW9FO0FBS3BFLDRFQUFxRTtBQUVyRSwyRUFBeUU7QUFHekUsNEZBQW9GO0FBRXBGLGlFQUErRDtBQUkvRCwySEFBK0c7QUFFL0csK0pBQWlKO0FBV2pKO0lBQWtDLGdDQUFrQjtJQVluRDtRQUFBLFlBQ0MsaUJBQU8sU0FJUDtRQUhBLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7UUFDakMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFZLEVBQUUsQ0FBQztRQUNqQyxLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7SUFDekMsQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ3BCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDM0Q7SUFDRixDQUFDO0lBRUQsbUNBQVksR0FBWjtRQUFBLGlCQVlDO1FBWEEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ3JELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLEtBQUksQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztnQkFDOUMsT0FBTzth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UyxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsc0NBQWUsR0FBZixVQUFnQixNQUFNO1FBQXRCLGlCQU9DO1FBTkEsbUJBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUMzQyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDcEIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1RTtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQTlFNkI7UUFBN0IsZ0JBQVMsQ0FBQyxnREFBaUIsQ0FBQztrQ0FBYyxnREFBaUI7cURBQUM7SUFDckI7UUFBdkMsZ0JBQVMsQ0FBQyxzRUFBMkIsQ0FBQztrQ0FBd0Isc0VBQTJCOytEQUFDO0lBVi9FLFlBQVk7UUFOeEIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1NBQzFDLENBQUM7O09BQ1csWUFBWSxDQXdGeEI7SUFBRCxtQkFBQztDQXhGRCxBQXdGQyxDQXhGaUMsd0JBQVUsR0F3RjNDO0FBeEZZLG9DQUFZIiwiZmlsZSI6ImFwcC9jb3Vyc2UvY291cnNlL2NvdXJzZS1kaWFsb2cvY291cnNlLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2RlbEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBXZWJTb2NrZXRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NvY2tldC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQmFzZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IFRpY2tldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3RpY2tldC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgU2VsZWN0SXRlbSwgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBHUk9VUF9DQVRFR09SWSwgQ09VUlNFX1NUQVRVUywgQ09VUlNFX01PREUsIENPVVJTRV9NRU1CRVJfUk9MRSwgQ09VUlNFX01FTUJFUl9TVEFUVVMsIENPVVJTRV9NRU1CRVJfRU5ST0xMX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgU2VsZWN0VXNlcnNEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtdXNlci1kaWFsb2cvc2VsZWN0LXVzZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXb3JrZmxvd1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvd29ya2Zsb3cuc2VydmljZSc7XG5pbXBvcnQgeyBTZWxlY3RDb21wZXRlbmN5TGV2ZWxEaWFsb2cgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9zZWxlY3QtY29tcGV0ZW5jeS1sZXZlbC1kaWFsb2cvc2VsZWN0LWNvbXBldGVuY3ktbGV2ZWwtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaGVscGVycy93aW5kb253LnJlZic7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnY291cnNlLWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnY291cnNlLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWydjb3Vyc2UtZGlhbG9nLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ291cnNlRGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxDb3Vyc2U+IHtcblxuXHRXSU5ET1dfSEVJR0hUOiBhbnk7XG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBpdGVtczogTWVudUl0ZW1bXTtcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuXHRwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuXHRwcml2YXRlIGVkaXRvcjogQ291cnNlTWVtYmVyO1xuXG5cdEBWaWV3Q2hpbGQoU2VsZWN0VXNlcnNEaWFsb2cpIHVzZXJzRGlhbG9nOiBTZWxlY3RVc2Vyc0RpYWxvZztcblx0QFZpZXdDaGlsZChTZWxlY3RDb21wZXRlbmN5TGV2ZWxEaWFsb2cpIGNvbXBldGVuY3lMZXZlbERpYWxvZzogU2VsZWN0Q29tcGV0ZW5jeUxldmVsRGlhbG9nO1xuXG5cdGNvbnN0cnVjdG9yKCApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuXHRcdHRoaXMuZWRpdG9yID0gbmV3IENvdXJzZU1lbWJlcigpO1xuXHRcdHRoaXMuV0lORE9XX0hFSUdIVCA9ICQod2luZG93KS5oZWlnaHQoKTtcblx0fVxuXG5cdG5vZGVTZWxlY3QoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0dGhpcy5vYmplY3QuZ3JvdXBfaWQgPSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkO1xuXHRcdFx0dGhpcy5vYmplY3QuZ3JvdXBfaWRfX0RFU0NfXyA9IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEubmFtZTtcblx0XHR9XG5cdH1cblxuXHRzZWxlY3RFZGl0b3IoKSB7XG5cdFx0dGhpcy51c2Vyc0RpYWxvZy5zaG93KCk7XG5cdFx0dGhpcy51c2Vyc0RpYWxvZy5vblNlbGVjdFVzZXJzLmZpcnN0KCkuc3Vic2NyaWJlKHVzZXJzID0+IHtcblx0XHRcdGlmICh1c2Vycy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdHRoaXMuZXJyb3IoJ1lvdSBjYW4gc2VsZWN0IG9ubHkgb25lIGVkaXRvci4nKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIGlmICh1c2Vycy5sZW5ndGggPT0gMSkge1xuXHRcdFx0XHR2YXIgdXNlciA9IHVzZXJzWzBdO1xuXHRcdFx0XHR0aGlzLmVkaXRvci51c2VyX2lkID0gdXNlci5pZDtcblx0XHRcdFx0dGhpcy5lZGl0b3IubmFtZSA9IHVzZXIubmFtZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHNlbGVjdENvbXBldGVuY3lMZXZlbCgpIHtcblx0XHR0aGlzLmNvbXBldGVuY3lMZXZlbERpYWxvZy5zaG93KCk7XG5cdFx0dGhpcy5jb21wZXRlbmN5TGV2ZWxEaWFsb2cub25TZWxlY3RDb21wZXRlbmN5TGV2ZWwuc3Vic2NyaWJlKGxldmVsID0+IHtcblx0XHRcdFx0dGhpcy5vYmplY3QuY29tcGV0ZW5jeV9sZXZlbF9pZCA9IGxldmVsLmlkO1xuXHRcdFx0XHR0aGlzLm9iamVjdC5jb21wZXRlbmN5X2xldmVsX25hbWUgPSBsZXZlbC5uYW1lO1xuXHRcdFx0XHR0aGlzLm9iamVjdC5jb21wZXRlbmN5X2lkID0gbGV2ZWwuY29tcGV0ZW5jeV9pZDtcblx0XHRcdFx0dGhpcy5vYmplY3QuY29tcGV0ZW5jeV9uYW1lID0gbGV2ZWwuY29tcGV0ZW5jeV9uYW1lO1xuXHRcdFx0XHR0aGlzLm9iamVjdC5jb21wZXRlbmN5X2dyb3VwX2lkID0gbGV2ZWwuY29tcGV0ZW5jeV9ncm91cF9pZDtcblx0XHRcdFx0dGhpcy5vYmplY3QuY29tcGV0ZW5jeV9ncm91cF9uYW1lID0gbGV2ZWwuY29tcGV0ZW5jeV9ncm91cF9uYW1lO1xuXHRcdH0pO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5vblNob3cuc3Vic2NyaWJlKG9iamVjdCA9PiB7XG5cdFx0XHRpZiAob2JqZWN0LklzTmV3KSAge1xuXHRcdFx0XHR0aGlzLmVkaXRvciA9IG5ldyBDb3Vyc2VNZW1iZXIoKTtcblx0XHRcdFx0b2JqZWN0LnN1cGVydmlzb3JfaWQgPSB0aGlzLkNvbnRleHRVc2VyLmlkO1xuXHRcdFx0XHRvYmplY3QucmV2aWV3X3N0YXRlID0gdGhpcy5Db250ZXh0VXNlci5Jc1N1cGVyQWRtaW4gPydhcHByb3ZlZCc6J2luaXRpYWwnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Q291cnNlTWVtYmVyLmNvdXJzZUVkaXRvcih0aGlzLCBvYmplY3QuaWQpLnN1YnNjcmliZShtZW1iZXI9PiB7XG5cdFx0XHRcdFx0aWYgKCFtZW1iZXIpIHtcblx0XHRcdFx0XHRcdHRoaXMuZWRpdG9yID0gIG5ldyBDb3Vyc2VNZW1iZXIoKTtcblx0XHRcdFx0XHRcdHRoaXMuZWRpdG9yLnJvbGUgPSAnZWRpdG9yJztcblx0XHRcdFx0XHRcdHRoaXMuZWRpdG9yLmNvdXJzZV9pZCA9IG9iamVjdC5pZDtcblx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdHRoaXMuZWRpdG9yID0gIG1lbWJlcjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmJ1aWxkQ291cnNlVHJlZShvYmplY3QpO1xuXHRcdH0pO1xuXHRcdHRoaXMub25DcmVhdGVDb21wbGV0ZS5zdWJzY3JpYmUob2JqZWN0ID0+IHtcblx0XHRcdHRoaXMuZWRpdG9yLnJvbGUgPSAnZWRpdG9yJztcblx0XHRcdHRoaXMuZWRpdG9yLmNvdXJzZV9pZCA9IG9iamVjdC5pZDtcblx0XHRcdHRoaXMuZWRpdG9yLnNhdmUodGhpcykuc3Vic2NyaWJlKCk7XG5cdFx0fSk7XG5cdFx0dGhpcy5vblVwZGF0ZUNvbXBsZXRlLnN1YnNjcmliZShvYmplY3QgPT4ge1xuXHRcdFx0dGhpcy5lZGl0b3Iuc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKTtcblx0XHR9KTtcblx0fVxuXG5cdGJ1aWxkQ291cnNlVHJlZShvYmplY3QpIHtcblx0XHRHcm91cC5saXN0Q291cnNlR3JvdXAodGhpcykuc3Vic2NyaWJlKGdyb3VwcyA9PiB7XG5cdFx0XHR0aGlzLnRyZWUgPSB0aGlzLnRyZWVVdGlscy5idWlsZEdyb3VwVHJlZShncm91cHMpO1xuXHRcdFx0aWYgKG9iamVjdC5ncm91cF9pZCkge1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkTm9kZSA9IHRoaXMudHJlZVV0aWxzLmZpbmRUcmVlTm9kZSh0aGlzLnRyZWUsIG9iamVjdC5ncm91cF9pZCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuIl19
