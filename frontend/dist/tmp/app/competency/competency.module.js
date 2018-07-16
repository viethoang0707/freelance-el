"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_module_1 = require("../auth/auth.module");
var shared_module_1 = require("../shared/shared.module");
var competency_component_1 = require("./competency.component");
var competency_list_component_1 = require("./competency-list/competency-list.component");
var competency_dialog_component_1 = require("./competency-dialog/competency-dialog.component");
var competency_matrix_component_1 = require("./competency-matrix/competency-matrix.component");
var competency_routing_1 = require("./competency-routing");
var CompetencyModule = (function () {
    function CompetencyModule() {
    }
    CompetencyModule = __decorate([
        core_1.NgModule({
            imports: [competency_routing_1.CompetencyRoutingModule, shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [competency_component_1.CompetencyComponent, competency_list_component_1.CompetencyListComponent, competency_dialog_component_1.CompetencyDialog, competency_matrix_component_1.CompetencyMatrixComponent],
            providers: [],
            exports: [],
        })
    ], CompetencyModule);
    return CompetencyModule;
}());
exports.CompetencyModule = CompetencyModule;
