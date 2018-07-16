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
