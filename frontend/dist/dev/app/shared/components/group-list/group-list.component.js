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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9ncm91cC1saXN0L2dyb3VwLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRjtBQUNuRiwwQ0FBaUQ7QUFLakQsa0VBQTJEO0FBQzNELHlEQUF1RDtBQUN2RCx1REFBcUQ7QUFFckQsaUZBQXFFO0FBQ3JFLDhFQUF1RTtBQUN2RSwwRUFBbUU7QUFDbkUsa0ZBQTJFO0FBQzNFLHNGQUErRTtBQVEvRTtJQUF3QyxzQ0FBYTtJQU1qRCw0QkFBcUIsS0FBcUI7UUFBMUMsWUFDSSxpQkFBTyxTQUVWO1FBSG9CLFdBQUssR0FBTCxLQUFLLENBQWdCO1FBRXRDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7O0lBQ3JDLENBQUM7SUFPRCxxQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNwRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNmLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLEVBQUUsRUFBWCxDQUFXLEVBQUM7WUFDMUcsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsRUFBQztTQUM5RyxDQUFDO0lBQ04sQ0FBQztJQUVE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QUM7UUFDbEQsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLFlBQVk7WUFDNUIsWUFBWSxHQUFJLG1CQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxZQUFZO1lBQ1osWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0JBQ3pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUNyQixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQXJGdUI7UUFBdkIsZ0JBQVMsQ0FBQyxvQ0FBVyxDQUFDO2tDQUFjLG9DQUFXOzJEQUFDO0lBRnhDLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDMUMsQ0FBQzt5Q0FPOEIsdUJBQWM7T0FOakMsa0JBQWtCLENBeUY5QjtJQUFELHlCQUFDO0NBekZELEFBeUZDLENBekZ1Qyw4QkFBYSxHQXlGcEQ7QUF6RlksZ0RBQWtCIiwiZmlsZSI6ImFwcC9zaGFyZWQvY29tcG9uZW50cy9ncm91cC1saXN0L2dyb3VwLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL21vZGVsLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEdyb3VwRGlhbG9nIH0gZnJvbSAnLi4vZ3JvdXAtZGlhbG9nL2dyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3kubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnZ3JvdXAtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdncm91cC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnZ3JvdXAtbGlzdC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEdyb3VwTGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQFZpZXdDaGlsZChHcm91cERpYWxvZykgZ3JvdXBEaWFsb2c6IEdyb3VwRGlhbG9nO1xuICAgIHByaXZhdGUgYWN0aW9uSXRlbXM6IE1lbnVJdGVtW107IFxuICAgIHByaXZhdGUgdHJlZVV0aWxzOiBUcmVlVXRpbHM7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmVlVXRpbHMgPSBuZXcgVHJlZVV0aWxzKCk7XG4gICAgfVxuXG4gICAgdHJlZTogVHJlZU5vZGVbXTtcbiAgICBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuICAgIGdyb3VwczogR3JvdXBbXTtcbiAgICBjYXRlZ29yeTogc3RyaW5nO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSB0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGFbJ2NhdGVnb3J5J11cbiAgICAgICAgdGhpcy5sb2FkR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuYWN0aW9uSXRlbXMgPSBbXG4gICAgICAgICAgICB7bGFiZWw6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdFZGl0JyksIGljb246ICd1aS1pY29uLW1vZGUtZWRpdCcsIGNvbW1hbmQ6IChldmVudCkgPT4gdGhpcy5lZGl0KCl9LFxuICAgICAgICAgICAge2xhYmVsOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnRGVsZXRlJyksIGljb246ICd1aS1pY29uLWRlbGV0ZScsIGNvbW1hbmQ6IChldmVudCkgPT4gdGhpcy5kZWxldGUoKX1cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBhZGQoKSB7XG4gICAgICAgIHZhciBncm91cCA9ICBuZXcgR3JvdXAoKTtcbiAgICAgICAgZ3JvdXAuY2F0ZWdvcnkgPSB0aGlzLmNhdGVnb3J5O1xuICAgICAgICB0aGlzLmdyb3VwRGlhbG9nLnNob3coZ3JvdXApO1xuICAgICAgICB0aGlzLmdyb3VwRGlhbG9nLm9uQ3JlYXRlQ29tcGxldGUuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkR3JvdXBzKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZWRpdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWROb2RlKVxuICAgICAgICAgICAgdGhpcy5ncm91cERpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEpO1xuICAgIH1cblxuICAgIGNvbmZpcm1EZWxldGUoKSB7XG4gICAgICAgIHRoaXMuY29uZmlybSgnQXJlIHlvdSBzdXJlIHRvIGRlbGV0ZSA/JywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5kZWxldGUodGhpcykuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEdyb3VwcygpO1xuICAgICAgICAgICAgfSwgKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcignUGVybWlzc2lvbiBkZW5pZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGUoKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICBpZih0aGlzLmNhdGVnb3J5ID09IFwiY291cnNlXCIpXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSAgQ291cnNlLmxpc3RCeUdyb3VwKHRoaXMsIHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQpO1xuICAgICAgICBpZih0aGlzLmNhdGVnb3J5ID09IFwib3JnYW5pemF0aW9uXCIpXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSAgVXNlci5saXN0QnlHcm91cCh0aGlzLCB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkKVxuICAgICAgICBpZih0aGlzLmNhdGVnb3J5ID09IFwicXVlc3Rpb25cIilcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9ICBRdWVzdGlvbi5saXN0QnlHcm91cCh0aGlzLCB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkKTtcbiAgICAgICAgaWYodGhpcy5jYXRlZ29yeSA9PSBcImNvbXBldGVuY3lcIilcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9ICBDb21wZXRlbmN5Lmxpc3RCeUdyb3VwKHRoaXMsIHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQpO1xuICAgICAgICBpZihzdWJzY3JpcHRpb24pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoaXRlbXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhcm4oJ1RoZSBncm91cCBpcyB1c2VkIGJ5IGFub3RoZXIgY29udGVudC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtRGVsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkR3JvdXBzKCkge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgaWYodGhpcy5jYXRlZ29yeSA9PSBcImNvdXJzZVwiKVxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gIEdyb3VwLmxpc3RDb3Vyc2VHcm91cCh0aGlzKTtcbiAgICAgICAgaWYodGhpcy5jYXRlZ29yeSA9PSBcIm9yZ2FuaXphdGlvblwiKVxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gIEdyb3VwLmxpc3RVc2VyR3JvdXAodGhpcyk7XG4gICAgICAgIGlmKHRoaXMuY2F0ZWdvcnkgPT0gXCJxdWVzdGlvblwiKVxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gIEdyb3VwLmxpc3RRdWVzdGlvbkdyb3VwKHRoaXMpO1xuICAgICAgICBpZih0aGlzLmNhdGVnb3J5ID09IFwiY29tcGV0ZW5jeVwiKVxuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gIEdyb3VwLmxpc3RDb21wZXRlbmN5R3JvdXAodGhpcyk7XG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24pICBcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5zdWJzY3JpYmUoZ3JvdXBzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwcyA9IGdyb3VwcztcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRyZWVVdGlscy5idWlsZEdyb3VwVHJlZShncm91cHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufVxuIl19
