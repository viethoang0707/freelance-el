"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../helpers/reflect");
var decorator_1 = require("./decorator");
var BaseAPI = (function () {
    function BaseAPI() {
    }
    Object.defineProperty(BaseAPI, "Method", {
        get: function () {
            return Reflect.getMetadata(decorator_1.METHOD_METADATA_KEY, this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAPI.prototype, "Method", {
        get: function () {
            return Reflect.getMetadata(decorator_1.METHOD_METADATA_KEY, this.constructor);
        },
        enumerable: true,
        configurable: true
    });
    return BaseAPI;
}());
exports.BaseAPI = BaseAPI;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2Jhc2UuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWdDO0FBR2hDLHlDQUFrRTtBQUlsRTtJQUdJO0lBQ0EsQ0FBQztJQUVELHNCQUFXLGlCQUFNO2FBQWpCO1lBQ0ksT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLCtCQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFELENBQUM7OztPQUFBO0lBRUEsc0JBQUksMkJBQU07YUFBVjtZQUNHLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQywrQkFBbUIsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEUsQ0FBQzs7O09BQUE7SUFHTCxjQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmcUIsMEJBQU8iLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hcGkvYmFzZS5hcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgICcuLi8uLi9oZWxwZXJzL3JlZmxlY3QnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNRVRIT0RfTUVUQURBVEFfS0VZLCBNZXRob2RSZWdpc3RlciB9IGZyb20gJy4vZGVjb3JhdG9yJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VBUEkge1xuICAgIHBhcmFtc1x0XHQ6XHRhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IE1ldGhvZCgpOnN0cmluZyB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0LmdldE1ldGFkYXRhKE1FVEhPRF9NRVRBREFUQV9LRVksIHRoaXMpO1xuICAgIH1cblxuICAgICBnZXQgTWV0aG9kKCk6c3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoTUVUSE9EX01FVEFEQVRBX0tFWSwgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuXG5cbn1cbiJdfQ==
