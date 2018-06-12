"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setting_exam_component_1 = require("./exam/setting-exam.component");
var setting_component_1 = require("./setting.component");
var admin_guard_1 = require("../shared/guards/admin.guard");
exports.SettingRoutes = [
    {
        path: "setting",
        component: setting_component_1.SettingComponent,
        canActivate: [admin_guard_1.AdminGuard],
        data: {
            breadcrumb: 'Setting'
        },
        children: [
            {
                path: "exam",
                component: setting_exam_component_1.SettingExamComponent,
                data: {
                    breadcrumb: 'Exam'
                }
            },
        ]
    }
];
//# sourceMappingURL=setting-routing.js.map