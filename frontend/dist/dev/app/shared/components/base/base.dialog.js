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
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var base_component_1 = require("../base/base.component");
var BaseDialog = (function (_super) {
    __extends(BaseDialog, _super);
    function BaseDialog() {
        var _this = _super.call(this) || this;
        _this.onCreateCompleteReceiver = new Rx_1.Subject();
        _this.onUpdateCompleteReceiver = new Rx_1.Subject();
        _this.onShowReceiver = new Rx_1.Subject();
        _this.onHideReceiver = new Rx_1.Subject();
        _this.onCreateComplete = _this.onCreateCompleteReceiver.asObservable();
        _this.onUpdateComplete = _this.onUpdateCompleteReceiver.asObservable();
        _this.onShow = _this.onShowReceiver.asObservable();
        _this.onHide = _this.onHideReceiver.asObservable();
        _this.display = false;
        _this.object = {};
        return _this;
    }
    BaseDialog.prototype.show = function (object) {
        this.object = object;
        this.originalObject = {};
        Object.assign(this.originalObject, this.object);
        this.display = true;
        this.onShowReceiver.next(object);
    };
    BaseDialog.prototype.cancel = function () {
        Object.assign(this.object, this.originalObject);
        this.hide();
    };
    BaseDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    BaseDialog.prototype.save = function () {
        var _this = this;
        if (!this.object.id) {
            this.object.save(this).subscribe(function () {
                _this.hide();
                _this.onCreateCompleteReceiver.next(_this.object);
                _this.success('Object created successfully.');
            }, function () {
                _this.error('Permission denied');
            });
        }
        else {
            this.object.save(this).subscribe(function () {
                _this.onUpdateCompleteReceiver.next(_this.object);
                _this.success('Object saved successfully.');
                _this.hide();
            }, function () {
                _this.error('Permission denied');
            });
        }
    };
    return BaseDialog;
}(base_component_1.BaseComponent));
exports.BaseDialog = BaseDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlDQUErQjtBQUMvQiw4QkFBOEM7QUFDOUMseURBQXVEO0FBTXZEO0lBQThELDhCQUFhO0lBY3ZFO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBYlMsOEJBQXdCLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDdkQsOEJBQXdCLEdBQWlCLElBQUksWUFBTyxFQUFFLENBQUM7UUFDdkQsb0JBQWMsR0FBaUIsSUFBSSxZQUFPLEVBQUUsQ0FBQztRQUM3QyxvQkFBYyxHQUFpQixJQUFJLFlBQU8sRUFBRSxDQUFDO1FBQ3ZELHNCQUFnQixHQUFvQixLQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakYsc0JBQWdCLEdBQW9CLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqRixZQUFNLEdBQW9CLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0QsWUFBTSxHQUFvQixLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSXpELEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztJQUNyQixDQUFDO0lBR0QseUJBQUksR0FBSixVQUFLLE1BQVc7UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwyQkFBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHlCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCx5QkFBSSxHQUFKO1FBQUEsaUJBd0JDO1FBdEJHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDWixLQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEQsS0FBSSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBRWpELENBQUMsRUFBQztnQkFDRSxLQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFcEMsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUNJO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUM3QixLQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEQsS0FBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFFO2dCQUU1QyxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsQ0FBQyxFQUFDO2dCQUNFLEtBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVwQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FoRUEsQUFnRUMsQ0FoRTZELDhCQUFhLEdBZ0UxRTtBQWhFcUIsZ0NBQVUiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS9tb2RlbC1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRGlhbG9nPFQgZXh0ZW5kcyBCYXNlTW9kZWw+IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG5cbiAgICBvcmlnaW5hbE9iamVjdDogYW55O1xuICAgIG9iamVjdDogYW55O1xuICAgIGRpc3BsYXk6IGJvb2xlYW47XG4gICAgcHJvdGVjdGVkIG9uQ3JlYXRlQ29tcGxldGVSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcm90ZWN0ZWQgb25VcGRhdGVDb21wbGV0ZVJlY2VpdmVyOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuICAgIHByb3RlY3RlZCBvblNob3dSZWNlaXZlcjogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcm90ZWN0ZWQgb25IaWRlUmVjZWl2ZXI6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgb25DcmVhdGVDb21wbGV0ZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vbkNyZWF0ZUNvbXBsZXRlUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgb25VcGRhdGVDb21wbGV0ZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vblVwZGF0ZUNvbXBsZXRlUmVjZWl2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgb25TaG93OiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLm9uU2hvd1JlY2VpdmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIG9uSGlkZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vbkhpZGVSZWNlaXZlci5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vYmplY3QgPSB7fTtcbiAgICB9XG5cblxuICAgIHNob3cob2JqZWN0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgICAgIHRoaXMub3JpZ2luYWxPYmplY3QgPSB7fTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9yaWdpbmFsT2JqZWN0LCB0aGlzLm9iamVjdCk7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgICAgIHRoaXMub25TaG93UmVjZWl2ZXIubmV4dChvYmplY3QpO1xuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9iamVjdCwgdGhpcy5vcmlnaW5hbE9iamVjdCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uSGlkZVJlY2VpdmVyLm5leHQoKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLm9iamVjdC5pZCkge1xuICAgICAgICAgICAgdGhpcy5vYmplY3Quc2F2ZSh0aGlzKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25DcmVhdGVDb21wbGV0ZVJlY2VpdmVyLm5leHQodGhpcy5vYmplY3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VjY2VzcygnT2JqZWN0IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yKCdQZXJtaXNzaW9uIGRlbmllZCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdC5zYXZlKHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblVwZGF0ZUNvbXBsZXRlUmVjZWl2ZXIubmV4dCh0aGlzLm9iamVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzKCdPYmplY3Qgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicpIDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0sKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcignUGVybWlzc2lvbiBkZW5pZWQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=
