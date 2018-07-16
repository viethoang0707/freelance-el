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
var Observable_1 = require("rxjs/Observable");
var group_model_1 = require("../../shared/models/elearning/group.model");
var base_dialog_1 = require("../../shared/components/base/base.dialog");
var _ = require("underscore");
var tree_utils_1 = require("../../shared/helpers/tree.utils");
var competency_level_model_1 = require("../../shared/models/elearning/competency-level.model");
var CompetencyDialog = (function (_super) {
    __extends(CompetencyDialog, _super);
    function CompetencyDialog(componentFactoryResolver, changeDetectionRef) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.changeDetectionRef = changeDetectionRef;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.levels = [];
        return _this;
    }
    CompetencyDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
            this.object.group_id__DESC__ = this.selectedNode.data.name;
        }
    };
    CompetencyDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            _this.levels = [];
            group_model_1.Group.listCompetencyGroup(_this).subscribe(function (groups) {
                _this.tree = _this.treeUtils.buildGroupTree(groups);
                if (object.group_id) {
                    _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.group_id);
                }
            });
            if (_this.object.id)
                competency_level_model_1.CompetencyLevel.listByCompetency(_this, _this.object.id).subscribe(function (levels) {
                    _this.levels = levels;
                });
        });
    };
    CompetencyDialog.prototype.addCompetencyLevel = function () {
        var level = new competency_level_model_1.CompetencyLevel();
        level.name = 'New level';
        this.levels.push(level);
    };
    CompetencyDialog.prototype.saveWithLevel = function () {
        var _this = this;
        var isNew = this.object.IsNew;
        this.object.save(this).subscribe(function () {
            _.each(_this.levels, function (level) {
                level.competency_id = _this.object.id;
            });
            var existLevels = _.filter(_this.levels, function (level) {
                return !level.IsNew && (level.name && level.name != '');
            });
            var newLevels = _.filter(_this.levels, function (level) {
                return level.IsNew && (level.name && level.name != '');
            });
            var deleteLevels = _.filter(_this.levels, function (level) {
                return !level.IsNew && (!level.name || level.name === '');
            });
            Observable_1.Observable.forkJoin(competency_level_model_1.CompetencyLevel.updateArray(_this, existLevels), competency_level_model_1.CompetencyLevel.createArray(_this, newLevels), competency_level_model_1.CompetencyLevel.deleteArray(_this, deleteLevels))
                .subscribe(function () {
                if (isNew) {
                    _this.onCreateCompleteReceiver.next(_this.object);
                    _this.success(_this.translateService.instant('Object created successfully.'));
                    _this.hide();
                }
                else {
                    _this.onUpdateCompleteReceiver.next(_this.object);
                    _this.success(_this.translateService.instant('Object created successfully.'));
                    _this.hide();
                }
            });
        });
    };
    CompetencyDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-dialog',
            templateUrl: 'competency-dialog.component.html',
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ChangeDetectorRef])
    ], CompetencyDialog);
    return CompetencyDialog;
}(base_dialog_1.BaseDialog));
exports.CompetencyDialog = CompetencyDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wZXRlbmN5L2NvbXBldGVuY3ktZGlhbG9nL2NvbXBldGVuY3ktZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0k7QUFDaEksOENBQTZDO0FBRzdDLHlFQUFrRTtBQUNsRSx3RUFBc0U7QUFFdEUsOEJBQWdDO0FBQ2hDLDhEQUE0RDtBQUU1RCwrRkFBdUY7QUFTdkY7SUFBc0Msb0NBQXNCO0lBTzNELDBCQUFvQix3QkFBa0QsRUFBVSxrQkFBcUM7UUFBckgsWUFDQyxpQkFBTyxTQUdQO1FBSm1CLDhCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFBVSx3QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBRXBILEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7UUFDM0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7O0lBQ3hCLENBQUM7SUFFRCxxQ0FBVSxHQUFWLFVBQVcsS0FBVTtRQUNwQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzNEO0lBQ0YsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNsQixLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixtQkFBSyxDQUFDLG1CQUFtQixDQUFDLEtBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0JBQzVDLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FB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QUNILEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoRCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2Y7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXhFUSxnQkFBZ0I7UUFMNUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSxrQ0FBa0M7U0FDL0MsQ0FBQzt5Q0FRNkMsK0JBQXdCLEVBQThCLHdCQUFpQjtPQVB6RyxnQkFBZ0IsQ0F5RTVCO0lBQUQsdUJBQUM7Q0F6RUQsQUF5RUMsQ0F6RXFDLHdCQUFVLEdBeUUvQztBQXpFWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL2NvbXBldGVuY3kvY29tcGV0ZW5jeS1kaWFsb2cvY29tcGV0ZW5jeS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBPbkluaXQsIElucHV0LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlRGlhbG9nIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmRpYWxvZyc7XG5pbXBvcnQgeyBDb21wZXRlbmN5IH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY29tcGV0ZW5jeS5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvbXBldGVuY3lMZXZlbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvbXBldGVuY3ktbGV2ZWwubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0c2VsZWN0b3I6ICdjb21wZXRlbmN5LWRpYWxvZycsXG5cdHRlbXBsYXRlVXJsOiAnY29tcGV0ZW5jeS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBDb21wZXRlbmN5RGlhbG9nIGV4dGVuZHMgQmFzZURpYWxvZzxDb21wZXRlbmN5PiAge1xuXG5cdHByaXZhdGUgdHJlZTogVHJlZU5vZGVbXTtcblx0cHJpdmF0ZSBzZWxlY3RlZE5vZGU6IFRyZWVOb2RlO1xuXHRwcml2YXRlIHRyZWVVdGlsczogVHJlZVV0aWxzO1xuXHRwcml2YXRlIGxldmVsczogQ29tcGV0ZW5jeUxldmVsW107XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnRyZWVVdGlscyA9IG5ldyBUcmVlVXRpbHMoKTtcbiAgICAgICAgdGhpcy5sZXZlbHMgPSBbXTtcblx0fVxuXG5cdG5vZGVTZWxlY3QoZXZlbnQ6IGFueSkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZSkge1xuXHRcdFx0dGhpcy5vYmplY3QuZ3JvdXBfaWQgPSB0aGlzLnNlbGVjdGVkTm9kZS5kYXRhLmlkO1xuXHRcdFx0dGhpcy5vYmplY3QuZ3JvdXBfaWRfX0RFU0NfXyA9IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEubmFtZTtcblx0XHR9XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLm9uU2hvdy5zdWJzY3JpYmUob2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxzID0gW107XG4gICAgICAgICAgICBHcm91cC5saXN0Q29tcGV0ZW5jeUdyb3VwKHRoaXMpLnN1YnNjcmliZShncm91cHM9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlID0gdGhpcy50cmVlVXRpbHMuYnVpbGRHcm91cFRyZWUoZ3JvdXBzKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0Lmdyb3VwX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlID0gdGhpcy50cmVlVXRpbHMuZmluZFRyZWVOb2RlKHRoaXMudHJlZSwgb2JqZWN0Lmdyb3VwX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdC5pZClcbiAgICAgICAgICAgICAgICBDb21wZXRlbmN5TGV2ZWwubGlzdEJ5Q29tcGV0ZW5jeSh0aGlzLCB0aGlzLm9iamVjdC5pZCkuc3Vic2NyaWJlKGxldmVscz0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbHMgPSBsZXZlbHM7XG4gICAgICAgICAgICAgICAgfSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRDb21wZXRlbmN5TGV2ZWwoKSB7XG4gICAgICAgIHZhciBsZXZlbCA9IG5ldyBDb21wZXRlbmN5TGV2ZWwoKTtcbiAgICAgICAgbGV2ZWwubmFtZSA9J05ldyBsZXZlbCc7XG4gICAgICAgIHRoaXMubGV2ZWxzLnB1c2gobGV2ZWwpO1xuICAgIH1cblxuICAgIHNhdmVXaXRoTGV2ZWwoKSB7XG4gICAgICAgIHZhciBpc05ldyA9ICB0aGlzLm9iamVjdC5Jc05ldztcbiAgICAgICAgdGhpcy5vYmplY3Quc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgXy5lYWNoKHRoaXMubGV2ZWxzLCAobGV2ZWw6IENvbXBldGVuY3lMZXZlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldmVsLmNvbXBldGVuY3lfaWQgPSB0aGlzLm9iamVjdC5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGV4aXN0TGV2ZWxzID0gXy5maWx0ZXIodGhpcy5sZXZlbHMsIChsZXZlbDpDb21wZXRlbmN5TGV2ZWwpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAhbGV2ZWwuSXNOZXcgJiYgKGxldmVsLm5hbWUgJiYgbGV2ZWwubmFtZSAhPScnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIG5ld0xldmVscyA9IF8uZmlsdGVyKHRoaXMubGV2ZWxzLCAobGV2ZWw6Q29tcGV0ZW5jeUxldmVsKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGV2ZWwuSXNOZXcgJiYgKGxldmVsLm5hbWUgJiYgbGV2ZWwubmFtZSAhPScnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGRlbGV0ZUxldmVscyA9IF8uZmlsdGVyKHRoaXMubGV2ZWxzLCAobGV2ZWw6Q29tcGV0ZW5jeUxldmVsKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWxldmVsLklzTmV3ICYmICghbGV2ZWwubmFtZSB8fCBsZXZlbC5uYW1lID09PScnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JzZXJ2YWJsZS5mb3JrSm9pbihDb21wZXRlbmN5TGV2ZWwudXBkYXRlQXJyYXkodGhpcywgZXhpc3RMZXZlbHMpLFxuICAgICAgICAgICAgICAgIENvbXBldGVuY3lMZXZlbC5jcmVhdGVBcnJheSh0aGlzLCBuZXdMZXZlbHMpLCBcbiAgICAgICAgICAgICAgICBDb21wZXRlbmN5TGV2ZWwuZGVsZXRlQXJyYXkodGhpcywgZGVsZXRlTGV2ZWxzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCk9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DcmVhdGVDb21wbGV0ZVJlY2VpdmVyLm5leHQodGhpcy5vYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3ModGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ09iamVjdCBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25VcGRhdGVDb21wbGV0ZVJlY2VpdmVyLm5leHQodGhpcy5vYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3ModGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ09iamVjdCBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuIl19
