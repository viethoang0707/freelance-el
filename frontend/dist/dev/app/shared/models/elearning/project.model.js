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
var base_model_1 = require("../base.model");
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var Project = (function (_super) {
    __extends(Project, _super);
    function Project() {
        var _this = _super.call(this) || this;
        _this.name = undefined;
        _this.status = undefined;
        _this.course_id = undefined;
        _this.class_id = undefined;
        _this.content = undefined;
        _this.filename = undefined;
        _this.file_url = undefined;
        _this.start = undefined;
        _this.end = undefined;
        return _this;
    }
    Project_1 = Project;
    Project.__api__listByClass = function (classId) {
        return new search_read_api_1.SearchReadAPI(Project_1.Model, [], "[('class_id','='," + classId + ")]");
    };
    Object.defineProperty(Project.prototype, "IsAvailable", {
        get: function () {
            if (this.status != 'open')
                return false;
            var now = new Date();
            if (this.start.getTime() > now.getTime())
                return false;
            if (this.end.getTime() < now.getTime())
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Project.listByClass = function (context, classId) {
        return Project_1.search(context, [], "[('class_id','='," + classId + ")]");
    };
    var Project_1;
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Project.prototype, "start", void 0);
    __decorate([
        decorator_1.FieldProperty(),
        __metadata("design:type", Date)
    ], Project.prototype, "end", void 0);
    Project = Project_1 = __decorate([
        decorator_1.Model('etraining.project'),
        __metadata("design:paramtypes", [])
    ], Project);
    return Project;
}(base_model_1.BaseModel));
exports.Project = Project;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUEwQztBQUUxQywwQ0FBbUQ7QUFLbkQsc0VBQW1FO0FBSW5FO0lBQTZCLDJCQUFTO0lBR2xDO1FBQUEsWUFDSSxpQkFBTyxTQVdiO1FBVEEsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDaEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDOUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDckIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7O0lBQzVCLENBQUM7Z0JBZlcsT0FBTztJQTZCVCwwQkFBa0IsR0FBekIsVUFBMEIsT0FBZTtRQUNyQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxTQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxtQkFBbUIsR0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELHNCQUFJLGdDQUFXO2FBQWY7WUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUcsTUFBTTtnQkFDcEIsT0FBTyxLQUFLLENBQUM7WUFDakIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNyQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDcEMsT0FBTyxLQUFLLENBQUM7WUFDakIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xDLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBO0lBSU0sbUJBQVcsR0FBbEIsVUFBbUIsT0FBa0IsRUFBRSxPQUFPO1FBQzFDLE9BQU8sU0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFBRSxFQUFFLG1CQUFtQixHQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDOztJQXZCRDtRQURDLHlCQUFhLEVBQVE7a0NBQ2YsSUFBSTswQ0FBQztJQUVaO1FBREMseUJBQWEsRUFBUTtrQ0FDakIsSUFBSTt3Q0FBQztJQTNCRCxPQUFPO1FBRG5CLGlCQUFLLENBQUMsbUJBQW1CLENBQUM7O09BQ2QsT0FBTyxDQWtEbkI7SUFBRCxjQUFDO0NBbERELEFBa0RDLENBbEQ0QixzQkFBUyxHQWtEckM7QUFsRFksMEJBQU8iLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Byb2plY3QubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IE1vZGVsLEZpZWxkUHJvcGVydHkgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi9leGFtLXF1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IEV4YW0gfSBmcm9tICcuL2V4YW0ubW9kZWwnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jYWNoZS51dGlscyc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnByb2plY3QnKVxuZXhwb3J0IGNsYXNzIFByb2plY3QgZXh0ZW5kcyBCYXNlTW9kZWx7XG5cbiAgICAvLyBEZWZhdWx0IGNvbnN0cnVjdG9yIHdpbGwgYmUgY2FsbGVkIGJ5IG1hcHBlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG5cdFx0XG5cdFx0dGhpcy5uYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNvdXJzZV9pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jbGFzc19pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZpbGVuYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZpbGVfdXJsID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmVuZCA9IHVuZGVmaW5lZDtcblx0fVxuXG4gICAgbmFtZTpzdHJpbmc7XG4gICAgc3RhdHVzOnN0cmluZztcbiAgICBjb250ZW50OnN0cmluZztcbiAgICBmaWxlbmFtZTogc3RyaW5nO1xuICAgIGNsYXNzX2lkOm51bWJlcjtcbiAgICBjb3Vyc2VfaWQ6IG51bWJlcjtcbiAgICBmaWxlX3VybDogc3RyaW5nO1xuICAgIEBGaWVsZFByb3BlcnR5PERhdGU+KClcbiAgICBzdGFydDogRGF0ZTtcbiAgICBARmllbGRQcm9wZXJ0eTxEYXRlPigpXG4gICAgZW5kOiBEYXRlO1xuXG4gICAgc3RhdGljIF9fYXBpX19saXN0QnlDbGFzcyhjbGFzc0lkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKFByb2plY3QuTW9kZWwsIFtdLFwiWygnY2xhc3NfaWQnLCc9JyxcIitjbGFzc0lkK1wiKV1cIik7XG4gICAgfVxuICAgIFxuICAgIGdldCBJc0F2YWlsYWJsZSgpOmJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT0nb3BlbicpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5zdGFydC5nZXRUaW1lKCkgPiBub3cuZ2V0VGltZSgpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5lbmQuZ2V0VGltZSgpIDwgbm93LmdldFRpbWUoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG5cblxuICAgIHN0YXRpYyBsaXN0QnlDbGFzcyhjb250ZXh0OkFQSUNvbnRleHQsIGNsYXNzSWQpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBQcm9qZWN0LnNlYXJjaChjb250ZXh0LFtdLCBcIlsoJ2NsYXNzX2lkJywnPScsXCIrY2xhc3NJZCtcIildXCIpO1xuICAgIH1cblxufVxuIl19
