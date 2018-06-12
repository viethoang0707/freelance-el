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
var Rx_1 = require("rxjs/Rx");
var lecture_html_model_1 = require("../../../../shared/models/elearning/lecture-html.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var HtmlLectureCourseUnitComponent = (function (_super) {
    __extends(HtmlLectureCourseUnitComponent, _super);
    function HtmlLectureCourseUnitComponent() {
        var _this = _super.call(this) || this;
        _this.lecture = new lecture_html_model_1.HtmlLecture();
        return _this;
    }
    HtmlLectureCourseUnitComponent.prototype.render = function (unit) {
        var _this = this;
        this.unit = unit;
        lecture_html_model_1.HtmlLecture.byCourseUnit(this, unit.id).subscribe(function (lecture) {
            if (lecture)
                _this.lecture = lecture;
            else {
                var lecture = new lecture_html_model_1.HtmlLecture();
                lecture.unit_id = _this.unit.id;
                _this.lecture = lecture;
            }
        });
    };
    HtmlLectureCourseUnitComponent.prototype.saveEditor = function () {
        return;
        return Rx_1.Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HtmlLectureCourseUnitComponent.prototype, "mode", void 0);
    HtmlLectureCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'html-lecture-course-unit',
            templateUrl: 'html-lecture-unit.component.html',
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'html'
        }),
        __metadata("design:paramtypes", [])
    ], HtmlLectureCourseUnitComponent);
    return HtmlLectureCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.HtmlLectureCourseUnitComponent = HtmlLectureCourseUnitComponent;
//# sourceMappingURL=html-lecture-unit.component.js.map