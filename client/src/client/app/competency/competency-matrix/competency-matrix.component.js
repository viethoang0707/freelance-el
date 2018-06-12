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
var base_component_1 = require("../../shared/components/base/base.component");
var course_model_1 = require("../../shared/models/elearning/course.model");
var CompetencyMatrixComponent = (function (_super) {
    __extends(CompetencyMatrixComponent, _super);
    function CompetencyMatrixComponent() {
        var _this = _super.call(this) || this;
        _this.courses = [];
        return _this;
    }
    CompetencyMatrixComponent.prototype.ngOnInit = function () {
        this.buildCompetencyMatrix();
    };
    CompetencyMatrixComponent.prototype.buildCompetencyMatrix = function () {
        var _this = this;
        course_model_1.Course.all(this).subscribe(function (courses) {
            _this.courses = _this.courses;
        });
    };
    CompetencyMatrixComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-matrix',
            templateUrl: 'competency-matrix.component.html',
            styleUrls: ['competency-matrix.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyMatrixComponent);
    return CompetencyMatrixComponent;
}(base_component_1.BaseComponent));
exports.CompetencyMatrixComponent = CompetencyMatrixComponent;
//# sourceMappingURL=competency-matrix.component.js.map