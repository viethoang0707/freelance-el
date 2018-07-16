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
var UserDialog = (function (_super) {
    __extends(UserDialog, _super);
    function UserDialog() {
        var _this = _super.call(this) || this;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.startDate = new Date('1900-01-01');
        _this.endDate = new Date('2018-01-01');
        return _this;
    }
    UserDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
            this.object.group_id__DESC__ = this.selectedNode.data.group_id__DESC__;
        }
    };
    UserDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            group_model_1.Group.listUserGroup(_this).subscribe(function (groups) {
                _this.tree = _this.treeUtils.buildGroupTree(groups);
                if (object.group_id) {
                    _this.selectedNode = _this.treeUtils.findTreeNode(_this.tree, object.group_id);
                }
            });
        });
    };
    UserDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-dialog',
            templateUrl: 'user-dialog.component.html',
        }),
        __metadata("design:paramtypes", [])
    ], UserDialog);
    return UserDialog;
}(base_dialog_1.BaseDialog));
exports.UserDialog = UserDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hY2NvdW50L3VzZXIvdXNlci1kaWFsb2cvdXNlci1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF3RDtBQUl4RCw0RUFBcUU7QUFDckUsMkVBQXlFO0FBR3pFLGlFQUErRDtBQVUvRDtJQUFnQyw4QkFBZ0I7SUFRL0M7UUFBQSxZQUNDLGlCQUFPLFNBSVA7UUFIQSxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7SUFDdkMsQ0FBQztJQUVELCtCQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ3BCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUN2RTtJQUNGLENBQUM7SUFFRCw2QkFBUSxHQUFSO1FBQUEsaUJBU0M7UUFSQSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDM0IsbUJBQUssQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtnQkFDekMsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUNwQixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1RTtZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBL0JXLFVBQVU7UUFMdEIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsNEJBQTRCO1NBQ3pDLENBQUM7O09BQ1csVUFBVSxDQWtDdEI7SUFBRCxpQkFBQztDQWxDRCxBQWtDQyxDQWxDK0Isd0JBQVUsR0FrQ3pDO0FBbENZLGdDQUFVIiwiZmlsZSI6ImFwcC9hY2NvdW50L3VzZXIvdXNlci1kaWFsb2cvdXNlci1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGV9ICAgICBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9kZWxBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvYmFzZS9iYXNlLmRpYWxvZyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IHsgVHJlZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2hlbHBlcnMvdHJlZS51dGlscyc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEdST1VQX0NBVEVHT1JZIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9jb25zdGFudHMnO1xuXG5cbkBDb21wb25lbnQoe1xuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHRzZWxlY3RvcjogJ3VzZXItZGlhbG9nJyxcblx0dGVtcGxhdGVVcmw6ICd1c2VyLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJEaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPFVzZXI+IHtcblxuXHRwcml2YXRlIHRyZWU6IFRyZWVOb2RlW107XG5cdHByaXZhdGUgc2VsZWN0ZWROb2RlOiBhbnk7XG5cdHByaXZhdGUgdHJlZVV0aWxzOiBUcmVlVXRpbHM7XG5cdHN0YXJ0RGF0ZTogRGF0ZTtcblx0ZW5kRGF0ZTogRGF0ZTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMudHJlZVV0aWxzID0gbmV3IFRyZWVVdGlscygpO1xuXHRcdHRoaXMuc3RhcnREYXRlID0gbmV3IERhdGUoJzE5MDAtMDEtMDEnKTtcblx0XHR0aGlzLmVuZERhdGUgPSBuZXcgRGF0ZSgnMjAxOC0wMS0wMScpO1xuXHR9XG5cblx0bm9kZVNlbGVjdChldmVudDogYW55KSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2RlKSB7XG5cdFx0XHR0aGlzLm9iamVjdC5ncm91cF9pZCA9IHRoaXMuc2VsZWN0ZWROb2RlLmRhdGEuaWQ7XG5cdFx0XHR0aGlzLm9iamVjdC5ncm91cF9pZF9fREVTQ19fID0gdGhpcy5zZWxlY3RlZE5vZGUuZGF0YS5ncm91cF9pZF9fREVTQ19fO1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMub25TaG93LnN1YnNjcmliZShvYmplY3QgPT4ge1xuXHRcdFx0R3JvdXAubGlzdFVzZXJHcm91cCh0aGlzKS5zdWJzY3JpYmUoZ3JvdXBzID0+IHtcblx0XHRcdFx0dGhpcy50cmVlID0gdGhpcy50cmVlVXRpbHMuYnVpbGRHcm91cFRyZWUoZ3JvdXBzKTtcblx0XHRcdFx0aWYgKG9iamVjdC5ncm91cF9pZCkge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlID0gdGhpcy50cmVlVXRpbHMuZmluZFRyZWVOb2RlKHRoaXMudHJlZSwgb2JqZWN0Lmdyb3VwX2lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXG59XG5cbiJdfQ==
