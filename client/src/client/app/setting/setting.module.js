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
var setting_exam_component_1 = require("./exam/setting-exam.component");
var setting_component_1 = require("./setting.component");
var grade_pipe_1 = require("./exam/grade.pipe");
var SettingModule = (function () {
    function SettingModule() {
    }
    SettingModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.ErpSharedModule, auth_module_1.AuthModule],
            declarations: [setting_exam_component_1.SettingExamComponent, setting_component_1.SettingComponent, grade_pipe_1.ValidateGradePipe],
            exports: [],
            providers: []
        })
    ], SettingModule);
    return SettingModule;
}());
exports.SettingModule = SettingModule;
//# sourceMappingURL=setting.module.js.map