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
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var FolderCourseUnitComponent = (function (_super) {
    __extends(FolderCourseUnitComponent, _super);
    function FolderCourseUnitComponent() {
        return _super.call(this) || this;
    }
    FolderCourseUnitComponent.prototype.render = function (unit) {
        this.unit = unit;
    };
    FolderCourseUnitComponent.prototype.saveEditor = function () {
        return this.unit.save(this);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FolderCourseUnitComponent.prototype, "mode", void 0);
    FolderCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'folder-course-unit',
            templateUrl: 'folder-unit.component.html',
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'folder'
        }),
        __metadata("design:paramtypes", [])
    ], FolderCourseUnitComponent);
    return FolderCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.FolderCourseUnitComponent = FolderCourseUnitComponent;
//# sourceMappingURL=folder-unit.component.js.map