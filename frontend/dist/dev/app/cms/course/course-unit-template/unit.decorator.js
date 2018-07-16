"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CourseUnitRegister = (function () {
    function CourseUnitRegister() {
        this.registry = {};
    }
    Object.defineProperty(CourseUnitRegister, "Instance", {
        get: function () {
            return this._instance || (this._instance = new CourseUnitRegister());
        },
        enumerable: true,
        configurable: true
    });
    CourseUnitRegister.prototype.register = function (type, ctor) {
        this.registry[type] = ctor;
    };
    CourseUnitRegister.prototype.lookup = function (type) {
        return this.registry[type];
    };
    return CourseUnitRegister;
}());
exports.CourseUnitRegister = CourseUnitRegister;
function CourseUnitTemplate(args) {
    return function (ctor) {
        CourseUnitRegister.Instance.register(args.type, ctor);
    };
}
exports.CourseUnitTemplate = CourseUnitTemplate;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL3VuaXQuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFLSTtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxzQkFBa0IsOEJBQVE7YUFBMUI7WUFHSSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7OztPQUFBO0lBRU0scUNBQVEsR0FBZixVQUFnQixJQUFJLEVBQUUsSUFBSTtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUksbUNBQU0sR0FBYixVQUFjLElBQUk7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNQLHlCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsSUFBQTtBQXZCWSxnREFBa0I7QUEwQi9CLDRCQUFvQyxJQUFTO0lBQ3pDLE9BQU8sVUFBQyxJQUFjO1FBQ2xCLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7QUFDTixDQUFDO0FBSkQsZ0RBSUMiLCJmaWxlIjoiYXBwL2Ntcy9jb3Vyc2UvY291cnNlLXVuaXQtdGVtcGxhdGUvdW5pdC5kZWNvcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ291cnNlVW5pdFJlZ2lzdGVyXG57XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDb3Vyc2VVbml0UmVnaXN0ZXI7XG4gICAgcHJpdmF0ZSByZWdpc3RyeTogYW55O1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0ge307XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKVxuICAgIHtcbiAgICAgICAgLy8gRG8geW91IG5lZWQgYXJndW1lbnRzPyBNYWtlIGl0IGEgcmVndWxhciBtZXRob2QgaW5zdGVhZC5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyBDb3Vyc2VVbml0UmVnaXN0ZXIoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyKHR5cGUsIGN0b3IpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RyeVt0eXBlXT1jdG9yO1xuICAgICAgfVxuXG4gICAgcHVibGljIGxvb2t1cCh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W3R5cGVdO1xuICAgICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBDb3Vyc2VVbml0VGVtcGxhdGUoIGFyZ3M6IGFueSkge1xuICAgIHJldHVybiAoY3RvcjogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgQ291cnNlVW5pdFJlZ2lzdGVyLkluc3RhbmNlLnJlZ2lzdGVyKCBhcmdzLnR5cGUsY3Rvcik7XG4gICAgfTtcbn1cblxuIl19
