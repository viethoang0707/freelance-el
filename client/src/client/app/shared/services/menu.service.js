"use strict";
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
require("rxjs/add/operator/mergeMap");
var auth_service_1 = require("./auth.service");
var _ = require("underscore");
var MenuService = (function () {
    function MenuService(authService) {
        this.authService = authService;
        this.ADMIN_MENU = [
            { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'], code: 'DASHBOARD' },
            { label: '', separator: true, styleClass: 'menu-separator' },
            {
                label: 'Syllabus', icon: 'school', code: 'SCHOOL',
                items: [
                    { label: 'Course', routerLink: ['/course/courses'], code: 'SCHOOL-COURSE' },
                    { label: 'Course group', routerLink: ['/course/groups'], code: 'SCHOOL-GROUP' },
                ]
            },
            {
                label: 'Assessment', icon: 'grade', code: 'ASSESSMENT',
                items: [
                    { label: 'Question banks', routerLink: ['/assessment/questions'], code: 'ASSESSMENT-QUESTION' },
                    { label: 'Question category', routerLink: ['/assessment/groups'], code: 'ASSESSMENT-QUESTION_GROUP' },
                    { label: 'Exam', routerLink: ['/assessment/exams'], code: 'ASSESSMENT-EXAM' },
                    { label: 'Question sheets', routerLink: ['/assessment/question-sheets'], code: 'ASSESSMENT-QUESTION_SHEET' },
                ]
            },
            {
                label: 'Competency', icon: 'linear_scale', code: 'COMPETENCY',
                items: [
                    { label: 'Competency', routerLink: ['/competency/list'], code: 'COMPETENCY-LIST' },
                    { label: 'Category', routerLink: ['/competency/groups'], code: 'COMPETENCY-GROUP' },
                    { label: 'Competency matrix', routerLink: ['/competency/matrix'], code: 'COMPETENCY-MATRIX' },
                ]
            },
            {
                label: 'Analysis', icon: 'pie_chart', code: 'ANALYSIS',
                items: [
                    { label: 'Report', routerLink: ['/analysis/reports'], code: 'ANALYSIS-REPORT' },
                    { label: 'Chart', routerLink: ['/analysis/charts'], code: 'ANALYSIS-CHART' },
                ]
            },
            {
                label: 'Workflow', icon: 'widgets', code: 'WORKFLOW',
                items: [
                    { label: 'Ticket', routerLink: ['/workflow/tickets'], code: 'WORKFLOW-TICKET' },
                    { label: 'Hierachy', routerLink: ['/workflow/hierachy'], code: 'WORKFLOW-TREE' }
                ]
            },
            {
                label: 'Accounts', icon: 'people', code: 'ACCOUNT',
                items: [
                    { label: 'User', routerLink: ['/account/users'], code: 'ACCOUNT-USER' },
                    { label: 'Group', routerLink: ['/account/groups'], code: 'ACCOUNT-USER_GROUP' },
                    { label: 'Permission', routerLink: ['/account/permissions'], code: 'ACCOUNT-PERMISSION' },
                ]
            },
            {
                label: 'Settings', icon: 'settings', code: 'SETTING',
                items: [
                    { label: 'Exam', routerLink: ['/setting/exam'], code: 'SETTING-EXAM' },
                ]
            }
        ];
        this.USER_MENU = [
            { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'] },
            { label: '', separator: true, styleClass: 'menu-separator' },
            { label: 'My course', icon: 'school', routerLink: ['/lms/courses'] },
            { label: 'My exam', icon: 'alarm_add', routerLink: ['/lms/exams'] },
            { label: 'Conference', icon: 'perm_phone_msg', routerLink: ['/lms/meetings'] },
        ];
    }
    MenuService.prototype.menuToTree = function (menu) {
        var _this = this;
        var tree = [];
        _.each(menu, (function (menuItem) {
            if (!menuItem.separator) {
                var node = _this.convertMenuNodeToTreeNode(menuItem);
                tree.push(node);
            }
        }));
        return tree;
    };
    MenuService.prototype.findMenuTreeNode = function (tree, code) {
        for (var i = 0; i < tree.length; i++) {
            var node = this.findSubMenuTreeNode(tree[i], code);
            if (node)
                return node;
        }
        return null;
    };
    MenuService.prototype.findSubMenuTreeNode = function (node, code) {
        if (node["data"] == code)
            return node;
        for (var i = 0; i < node.children.length; i++) {
            var subNode = this.findSubMenuTreeNode(node.children[i], code);
            if (subNode)
                return subNode;
        }
    };
    MenuService.prototype.convertMenuNodeToTreeNode = function (menuItem) {
        var _this = this;
        var node = menuItem;
        node["data"] = menuItem["code"];
        node["children"] = [];
        _.each(menuItem.items, (function (menuSubItem) {
            if (!menuSubItem.separator) {
                var subNode = _this.convertMenuNodeToTreeNode(menuSubItem);
                node["children"].push(subNode);
            }
        }));
        return node;
    };
    MenuService.prototype.adminMenu = function () {
        var _this = this;
        if (this.authService.UserProfile.IsSuperAdmin)
            return this.ADMIN_MENU;
        var menuCodes = [];
        if (this.authService.UserPermission.menu_access)
            menuCodes = JSON.parse(this.authService.UserPermission.menu_access);
        var menu = [];
        _.each(this.ADMIN_MENU, (function (menuItem) {
            var allow = _this.isAllowTowViewAdminMenu(menuItem, menuCodes);
            if (allow)
                menu.push(menuItem);
        }));
        return menu;
    };
    MenuService.prototype.isAllowTowViewAdminMenu = function (menuItem, menuCodes) {
        if (menuItem.separator || !menuItem["code"])
            return true;
        return _.contains(menuCodes, menuItem["code"]);
    };
    MenuService.prototype.userMenu = function () {
        return this.USER_MENU;
    };
    MenuService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map