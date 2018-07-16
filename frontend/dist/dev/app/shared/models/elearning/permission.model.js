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
var decorator_1 = require("../decorator");
var base_model_1 = require("../base.model");
var Permission = (function (_super) {
    __extends(Permission, _super);
    function Permission() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.user_group_id = undefined;
        _this.user_group_id__DESC__ = undefined;
        _this.menu_access = undefined;
        return _this;
    }
    Permission = __decorate([
        decorator_1.Model('etraining.permission'),
        __metadata("design:paramtypes", [])
    ], Permission);
    return Permission;
}(base_model_1.BaseModel));
exports.Permission = Permission;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wZXJtaXNzaW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDBDQUFxQztBQUVyQyw0Q0FBMEM7QUFNMUM7SUFBZ0MsOEJBQVM7SUFHckM7UUFBQSxZQUNJLGlCQUFPLFNBS2I7UUFKQSxLQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUMvQixLQUFJLENBQUMscUJBQXFCLEdBQUcsU0FBUyxDQUFDO1FBQ3ZDLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDOztJQUM5QixDQUFDO0lBVFcsVUFBVTtRQUR0QixpQkFBSyxDQUFDLHNCQUFzQixDQUFDOztPQUNqQixVQUFVLENBZ0J0QjtJQUFELGlCQUFDO0NBaEJELEFBZ0JDLENBaEIrQixzQkFBUyxHQWdCeEM7QUFoQlksZ0NBQVUiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Blcm1pc3Npb24ubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi9jb21wYW55Lm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnBlcm1pc3Npb24nKVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb24gZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMudXNlcl9ncm91cF9pZCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnVzZXJfZ3JvdXBfaWRfX0RFU0NfXyA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLm1lbnVfYWNjZXNzID0gdW5kZWZpbmVkO1xuXHR9XG5cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdXNlcl9ncm91cF9pZDogbnVtYmVyO1xuICAgIHVzZXJfZ3JvdXBfaWRfX0RFU0NfXzogc3RyaW5nO1xuICAgIG1lbnVfYWNjZXNzOiBzdHJpbmc7XG4gICAgXG59XG4iXX0=
