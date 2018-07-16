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
var base_api_1 = require("./base.api");
var decorator_1 = require("./decorator");
var CreateAPI = (function (_super) {
    __extends(CreateAPI, _super);
    function CreateAPI(model, object) {
        var _this = _super.call(this) || this;
        _this.params = { model: model, values: object };
        return _this;
    }
    CreateAPI = __decorate([
        decorator_1.Method('/api/create'),
        __metadata("design:paramtypes", [String, Object])
    ], CreateAPI);
    return CreateAPI;
}(base_api_1.BaseAPI));
exports.CreateAPI = CreateAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2NyZWF0ZS5hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXFDO0FBRXJDLHlDQUFxQztBQUlyQztJQUErQiw2QkFBTztJQUVsQyxtQkFBYSxLQUFZLEVBQUUsTUFBVTtRQUFyQyxZQUNJLGlCQUFPLFNBR2I7UUFETSxLQUFJLENBQUMsTUFBTSxHQUFHLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFFLENBQUM7O0lBQ3BELENBQUM7SUFOVyxTQUFTO1FBRHJCLGtCQUFNLENBQUMsYUFBYSxDQUFDOztPQUNULFNBQVMsQ0FRckI7SUFBRCxnQkFBQztDQVJELEFBUUMsQ0FSOEIsa0JBQU8sR0FRckM7QUFSWSw4QkFBUyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2FwaS9jcmVhdGUuYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUFQSSB9IGZyb20gJy4vYmFzZS5hcGknO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSAnLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgTWFwVXRpbHMgfSBmcm9tICcuLi8uLi9oZWxwZXJzL21hcC51dGlscyc7XG5cbkBNZXRob2QoJy9hcGkvY3JlYXRlJylcbmV4cG9ydCBjbGFzcyBDcmVhdGVBUEkgZXh0ZW5kcyBCYXNlQVBJe1xuXG4gICAgY29uc3RydWN0b3IoIG1vZGVsOnN0cmluZywgb2JqZWN0OmFueSl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBhcmFtcyA9IHttb2RlbDogbW9kZWwsIHZhbHVlczpvYmplY3QgfTtcblx0fVxuXG59XG4iXX0=
