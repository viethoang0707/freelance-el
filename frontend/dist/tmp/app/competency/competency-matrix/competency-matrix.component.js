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
        var _this = this;
        course_model_1.Course.all(this).subscribe(function (courses) {
            _this.courses = courses;
        });
    };
    CompetencyMatrixComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'competency-matrix',
            template: "<div class=\"card card-w-title\">         <h1>{{'Competency matrix'|translate}}</h1>         <div class=\"ui-g\">             <div class=\"ui-g-12\">                 <p-table  #skillTable [value]=\"courses\" [paginator]=\"true\" [rows]=\"10\" [responsive]=\"true\" selectionMode=\"single\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th [pSortableColumn]=\"'name'\">                                 {{'Course'|translate}}                                 <p-sortIcon [field]=\"'name'\"></p-sortIcon>                             </th>                             <th  [pSortableColumn]=\"'group'\">                                 {{'Competency group'|translate}}                                 <p-sortIcon [field]=\"'group'\"></p-sortIcon>                             </th>                                <th  [pSortableColumn]=\"'competency'\">                                 {{'Competency'|translate}}                                 <p-sortIcon [field]=\"'competency'\"></p-sortIcon>                             </th>                               <th  [pSortableColumn]=\"'level'\">                                 {{'Level'|translate}}                                 <p-sortIcon [field]=\"'level'\"></p-sortIcon>                             </th>                          </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-course let-i=\"rowIndex\">                         <tr [pSelectableRow]=\"course\">                             <td style=\"text-align: left;\">{{course.name}}</td>                             <td style=\"text-align: left;\">{{course.competency_group_name}}</td>                             <td style=\"text-align: left;\">{{course.competency_name}}</td>                             <td style=\"text-align: left;\">{{course.competency_level_name}}</td>                         </tr>                     </ng-template>                 </p-table>             </div>         </div>     </div>",
            styles: [".mrg-bt{margin-bottom:15px}.q-content{text-align:left}"],
        }),
        __metadata("design:paramtypes", [])
    ], CompetencyMatrixComponent);
    return CompetencyMatrixComponent;
}(base_component_1.BaseComponent));
exports.CompetencyMatrixComponent = CompetencyMatrixComponent;
