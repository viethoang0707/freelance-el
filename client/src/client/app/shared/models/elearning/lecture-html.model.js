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
var HtmlLecture = (function (_super) {
    __extends(HtmlLecture, _super);
    function HtmlLecture() {
        var _this = _super.call(this) || this;
        _this.content = undefined;
        _this.unit_id = undefined;
        return _this;
    }
    HtmlLecture_1 = HtmlLecture;
    HtmlLecture.__api__byCourseUnit = function (unitId) {
        return new search_read_api_1.SearchReadAPI(HtmlLecture_1.Model, [], "[('unit_id','='," + unitId + ")]");
    };
    HtmlLecture.byCourseUnit = function (context, unitId) {
        return HtmlLecture_1.search(context, [], "[('unit_id','='," + unitId + ")]")
            .map(function (lectures) {
            if (lectures.length)
                return lectures[0];
            else
                return null;
        });
    };
    var HtmlLecture_1;
    HtmlLecture = HtmlLecture_1 = __decorate([
        decorator_1.Model('etraining.html_lecture'),
        __metadata("design:paramtypes", [])
    ], HtmlLecture);
    return HtmlLecture;
}(base_model_1.BaseModel));
exports.HtmlLecture = HtmlLecture;
//# sourceMappingURL=lecture-html.model.js.map