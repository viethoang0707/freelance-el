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
var base_component_1 = require("../../shared/components/base/base.component");
var _ = require("underscore");
var competency_model_1 = require("../../shared/models/elearning/competency.model");
var group_model_1 = require("../../shared/models/elearning/group.model");
var competency_dialog_component_1 = require("../competency-dialog/competency-dialog.component");
var tree_utils_1 = require("../../shared/helpers/tree.utils");
var competency_level_model_1 = require("../../shared/models/elearning/competency-level.model");
var CompetencyListComponent = (function (_super) {
    __extends(CompetencyListComponent, _super);
    function CompetencyListComponent() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.competencies = [];
        return _this;
    }
    CompetencyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        group_model_1.Group.listCompetencyGroup(this).subscribe(function (groups) {
            _this.tree = _this.treeUtils.buildGroupTree(groups);
        });
        this.loadCompetencies();
    };
    CompetencyListComponent.prototype.addCompetency = function () {
        var _this = this;
        var competency = new competency_model_1.Competency();
        this.competencyDialog.show(competency);
        this.competencyDialog.onCreateComplete.subscribe(function () {
            _this.loadCompetencies();
        });
    };
    CompetencyListComponent.prototype.editCompetency = function () {
        var _this = this;
        if (this.selectedCompetency)
            this.competencyDialog.show(this.selectedCompetency);
        this.competencyDialog.onUpdateComplete.subscribe(function () {
            _this.loadCompetencies();
        });
    };
    CompetencyListComponent.prototype.deleteCompetency = function () {
        var _this = this;
        if (this.selectedCompetency)
            this.confirm(this.translateService.instant('Are you sure to delete?'), function () {
                _this.selectedCompetency.delete(_this).subscribe(function () {
                    _this.selectedCompetency = null;
                    _this.loadCompetencies();
                });
            });
    };
    CompetencyListComponent.prototype.loadCompetencies = function () {
        var _this = this;
        competency_model_1.Competency.all(this).subscribe(function (competencies) {
            competency_level_model_1.CompetencyLevel.all(_this).subscribe(function (levels) {
                _this.levels = levels;
                _.each(competencies, function (competency) {
                    competency.levels = _.filter(_this.levels, function (level) {
                        return level.competency_id == competency.id;
                    });
                });
                _this.competencies = competencies;
                _this.displayCompetencies = competencies;
            });
        });
    };
    CompetencyListComponent.prototype.filterCompetency = function () {
        var _this = this;
        if (this.selectedGroupNodes.length != 0) {
            this.displayCompetencies = _.filter(this.competencies, function (competency) {
                var parentGroupNode = _.find(_this.selectedGroupNodes, function (node) {
                    return node.data.id == competency.group_id;
                });
                return parentGroupNode != null;
            });
        }
        else {
            this.displayCompetencies = this.competencies;
        }
    };
    __decorate([
        core_1.ViewChild(competency_dialog_component_1.CompetencyDialog),
        __metadata("design:type", competency_dialog_component_1.CompetencyDialog)
    ], CompetencyListComponent.prototype, "competencyDialog", void 0);
    CompetencyListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-list',
            templateUrl: 'competency-list.component.html',
            styleUrls: ['competency-list.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyListComponent);
    return CompetencyListComponent;
}(base_component_1.BaseComponent));
exports.CompetencyListComponent = CompetencyListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wZXRlbmN5L2NvbXBldGVuY3ktbGlzdC9jb21wZXRlbmN5LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUVwRSw4RUFBNEU7QUFHNUUsOEJBQWdDO0FBRWhDLG1GQUE0RTtBQUM1RSx5RUFBa0U7QUFDbEUsZ0dBQW9GO0FBQ3BGLDhEQUE0RDtBQUU1RCwrRkFBdUY7QUFTdkY7SUFBNkMsMkNBQWE7SUFhdEQ7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFGRyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDOztJQUMzQixDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkcsbUJBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzVDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBR0QsK0NBQWEsR0FBYjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxVQUFVLEdBQUcsSUFBSSw2QkFBVSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBQzdDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdEQUFjLEdBQWQ7UUFBQSxpQkFNQztRQUxHLElBQUksSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixJQUFJLENB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LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBRVUVTVElPTl9UWVBFLCBHUk9VUF9DQVRFR09SWSwgUVVFU1RJT05fTEVWRUwgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cydcbmltcG9ydCB7IENvbXBldGVuY3kgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb21wZXRlbmN5Lm1vZGVsJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQ29tcGV0ZW5jeURpYWxvZyB9IGZyb20gJy4uL2NvbXBldGVuY3ktZGlhbG9nL2NvbXBldGVuY3ktZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlVXRpbHMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzJztcbmltcG9ydCB7IFRyZWVOb2RlLCBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvbXBldGVuY3lMZXZlbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3ktbGV2ZWwubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2NvbXBldGVuY3ktbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICdjb21wZXRlbmN5LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydjb21wZXRlbmN5LWxpc3QuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDb21wZXRlbmN5TGlzdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuXG4gICAgQFZpZXdDaGlsZChDb21wZXRlbmN5RGlhbG9nKSBjb21wZXRlbmN5RGlhbG9nOiBDb21wZXRlbmN5RGlhbG9nO1xuXG4gICAgcHJpdmF0ZSB0cmVlOiBUcmVlTm9kZVtdO1xuICAgIHByaXZhdGUgaXRlbXM6IE1lbnVJdGVtW107XG4gICAgcHJpdmF0ZSBjb21wZXRlbmNpZXM6IENvbXBldGVuY3lbXTtcbiAgICBwcml2YXRlIGxldmVsczogQ29tcGV0ZW5jeUxldmVsW107XG4gICAgcHJpdmF0ZSBkaXNwbGF5Q29tcGV0ZW5jaWVzOiBDb21wZXRlbmN5W107XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEdyb3VwTm9kZXM6IFRyZWVOb2RlW107XG4gICAgcHJpdmF0ZSB0cmVlVXRpbHM6IFRyZWVVdGlscztcbiAgICBwcml2YXRlIHNlbGVjdGVkQ29tcGV0ZW5jeTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuICAgICAgICB0aGlzLmNvbXBldGVuY2llcyA9IFtdO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBHcm91cC5saXN0Q29tcGV0ZW5jeUdyb3VwKHRoaXMpLnN1YnNjcmliZShncm91cHM9PiB7XG4gICAgICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRyZWVVdGlscy5idWlsZEdyb3VwVHJlZShncm91cHMpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLmxvYWRDb21wZXRlbmNpZXMoKTtcbiAgICB9XG5cblxuICAgIGFkZENvbXBldGVuY3koKSB7XG4gICAgICAgIHZhciBjb21wZXRlbmN5ID0gbmV3IENvbXBldGVuY3koKTtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5RGlhbG9nLnNob3coY29tcGV0ZW5jeSk7XG4gICAgICAgIHRoaXMuY29tcGV0ZW5jeURpYWxvZy5vbkNyZWF0ZUNvbXBsZXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRDb21wZXRlbmNpZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWRpdENvbXBldGVuY3koKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ29tcGV0ZW5jeSlcbiAgICAgICAgICAgIHRoaXMuY29tcGV0ZW5jeURpYWxvZy5zaG93KHRoaXMuc2VsZWN0ZWRDb21wZXRlbmN5KTtcbiAgICAgICAgdGhpcy5jb21wZXRlbmN5RGlhbG9nLm9uVXBkYXRlQ29tcGxldGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZENvbXBldGVuY2llcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVDb21wZXRlbmN5KCl7XG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRDb21wZXRlbmN5KVxuICAgICAgICAgICAgdGhpcy5jb25maXJtKHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdBcmUgeW91IHN1cmUgdG8gZGVsZXRlPycpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENvbXBldGVuY3kuZGVsZXRlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb21wZXRlbmN5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29tcGV0ZW5jaWVzKCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRDb21wZXRlbmNpZXMoKSB7XG4gICAgICAgIENvbXBldGVuY3kuYWxsKHRoaXMpLnN1YnNjcmliZShjb21wZXRlbmNpZXMgPT4ge1xuICAgICAgICAgICAgQ29tcGV0ZW5jeUxldmVsLmFsbCh0aGlzKS5zdWJzY3JpYmUobGV2ZWxzPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxzID0gIGxldmVscztcbiAgICAgICAgICAgICAgICBfLmVhY2goY29tcGV0ZW5jaWVzLCBjb21wZXRlbmN5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGV0ZW5jeS5sZXZlbHMgPSAgXy5maWx0ZXIodGhpcy5sZXZlbHMsIChsZXZlbDpDb21wZXRlbmN5TGV2ZWwpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsZXZlbC5jb21wZXRlbmN5X2lkID09IGNvbXBldGVuY3kuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBldGVuY2llcyA9IGNvbXBldGVuY2llcztcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlDb21wZXRlbmNpZXMgPSBjb21wZXRlbmNpZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlsdGVyQ29tcGV0ZW5jeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRHcm91cE5vZGVzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb21wZXRlbmNpZXMgPSBfLmZpbHRlcih0aGlzLmNvbXBldGVuY2llcywgY29tcGV0ZW5jeSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudEdyb3VwTm9kZSA9IF8uZmluZCh0aGlzLnNlbGVjdGVkR3JvdXBOb2Rlcywgbm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLmRhdGEuaWQgPT0gY29tcGV0ZW5jeS5ncm91cF9pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50R3JvdXBOb2RlICE9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUNvbXBldGVuY2llcyA9IHRoaXMuY29tcGV0ZW5jaWVzO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0iXX0=
