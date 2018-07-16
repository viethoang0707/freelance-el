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
var router_1 = require("@angular/router");
var user_model_1 = require("../../shared/models/elearning/user.model");
var home_manager_service_1 = require("../home-manager.service");
var home_component_1 = require("../home.component");
var base_component_1 = require("../../shared/components/base/base.component");
var ticket_dialog_component_1 = require("../../workflow/ticket-dialog/ticket-dialog.component");
var _ = require("underscore");
var course_model_1 = require("../../shared/models/elearning/course.model");
var course_member_model_1 = require("../../shared/models/elearning/course-member.model");
var base_model_1 = require("../../shared/models/base.model");
var NavbarComponent = (function (_super) {
    __extends(NavbarComponent, _super);
    function NavbarComponent(router, parent, eventManager) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.parent = parent;
        _this.eventManager = eventManager;
        _this.lang = _this.translateService.currentLang;
        _this.notifs = [];
        _this.viewMode = _this.ContextUser.IsAdmin ? 'admin' : 'lms';
        return _this;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.viewMode = this.settingService.ViewMode;
        if (this.viewMode == 'admin')
            this.loadStats();
    };
    NavbarComponent.prototype.loadStats = function () {
        var _this = this;
        base_model_1.BaseModel
            .bulk_count(this, user_model_1.User.__api__countAll(), course_model_1.Course.__api__countAll(), course_member_model_1.CourseMember.__api__countTeacher(), course_member_model_1.CourseMember.__api__countStudent())
            .map(function (jsonArray) {
            return _.flatten(jsonArray);
        })
            .subscribe(function (counts) {
            _this.userCount = counts[0];
            _this.courseCount = counts[1];
            _this.teacherCount = counts[2];
            _this.studentCount = counts[3];
        });
    };
    NavbarComponent.prototype.setLang = function (lang) {
        this.lang = lang;
        this.settingService.Lang = lang;
        this.translateService.use(lang);
    };
    NavbarComponent.prototype.setViewMode = function (mode) {
        this.viewMode = mode;
        this.settingService.ViewMode = mode;
        this.router.navigate(['/dashboard']);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavbarComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NavbarComponent.prototype, "viewMode", void 0);
    __decorate([
        core_1.ViewChild(ticket_dialog_component_1.TicketDialog),
        __metadata("design:type", ticket_dialog_component_1.TicketDialog)
    ], NavbarComponent.prototype, "ticketDialog", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-navbar',
            template: "<div class=\"layout-topbar\">     <img alt=\"logo\" src=\"assets/images/logo/logo_light.png\" class=\"mobile-logo\" />     <a class=\"menu-btn\" (click)=\"eventManager.menuClick()\">         <i class=\"material-icons\">&#xE5D2;</i>     </a>     <a class=\"topbar-menu-btn\" (click)=\"eventManager.topbarMobileMenuClick()\">         <i class=\"material-icons\">&#xE853;</i>     </a>     <div class=\"layout-topbar-menu-wrapper\">         <ul class=\"topbar-menu fadeInDown\" [ngClass]=\"{'topbar-menu-active': parent.topbarMenuActive}\" (click)=\"eventManager.topbarMenuClick()\">             <li #profile class=\"profile-item\" [ngClass]=\"{'active-topmenuitem': parent.activeTopbarItem === profile}\" (click)=\"eventManager.topbarRootItemClick(profile)\">                 <a>             <span class=\"profile-image-wrapper\">                 <img [src]='ContextUser.image | imageBase64'/>             </span>             <span class=\"topbar-item-name profile-name\">{{ContextUser.display_name}}</span>         </a>                 <ul class=\"fadeInDown\">                     <li role=\"menuitem\">                         <a (click)=\"eventManager.showProfile()\">                 <i class=\"material-icons\">account_circle</i>                 <span>{{'User Profile'|translate}}</span>             </a>                     </li>                     <li role=\"menuitem\">                         <a (click)=\"appEvent.userLogout()\">                 <i class=\"material-icons\" >exit_to_app</i>                 <span>{{'Log out'|translate}}</span>             </a>                     </li>                 </ul>             </li>             <li #languages [ngClass]=\"{'active-topmenuitem':parent.activeTopbarItem === languages}\" (click)=\"eventManager.topbarRootItemClick( languages)\">                 <a pTooltip=\"{{'Language'|translate}}\" *ngIf=\"lang=='gb'\" (click)=\"setLang('vn')\">             <i class=\"topbar-icon material-icons\">language</i>             <span class=\"flag-icon\" [ngClass]=\"'flag-icon-gb'\"></span>         </a>                 <a pTooltip=\"{{'Language'|translate}}\" *ngIf=\"lang=='vn'\" (click)=\"setLang('gb')\">             <i class=\"topbar-icon material-icons\">language</i>             <span class=\"flag-icon\" [ngClass]=\"'flag-icon-vn'\"></span>         </a>             </li>             <li #mode [ngClass]=\"{'active-topmenuitem':parent.activeTopbarItem === mode}\" (click)=\"eventManager.topbarRootItemClick( mode)\" *ngIf=\"ContextUser.IsAdmin\">                 <a pTooltip=\"{{'Switch to LMS'|translate}}\" *ngIf=\"viewMode=='admin'\" (click)=\"setViewMode('lms')\">                     <i class=\"topbar-icon material-icons\">swap_horiz</i>                 </a>                 <a pTooltip=\"{{'Switch to adminnistrator'|translate}}\" *ngIf=\"viewMode=='lms'\" (click)=\"setViewMode('admin')\">                     <i class=\"topbar-icon material-icons\">swap_horiz</i>                 </a>             </li>             <li class=\"stats-items\" #stats [ngClass]=\"{'active-topmenuitem':parent.activeTopbarItem === stats}\" (click)=\"eventManager.topbarRootItemClick( stats)\" *ngIf=\"ContextUser.IsAdmin\">                 <a>              <i class=\"topbar-icon material-icons\">person_pin_circle</i>             <div> {{userCount}} {{'Users'|translate}}</div>         </a>                 <a>             <i class=\"topbar-icon material-icons\">school</i>             <div> {{courseCount}} {{'Courses'|translate}}</div>         </a>                 <a>             <i class=\"topbar-icon material-icons\">people</i>             <div> {{studentCount}} {{'Students'|translate}}</div>         </a>                 <a>             <i class=\"topbar-icon material-icons\">people</i>             <div> {{teacherCount}} {{'Teachers'|translate}}</div>         </a>             </li>         </ul>     </div>      </div>",
            styles: ["a:hover{cursor:pointer}.stats-items{float:left!important;position:relative;left:10%}.stats-items a div{border-color:#fff;border-right-style:solid;border-width:1px;display:inline;padding-right:.5em}"],
        }),
        __metadata("design:paramtypes", [router_1.Router, home_component_1.HomeComponent,
            home_manager_service_1.HomeEventManager])
    ], NavbarComponent);
    return NavbarComponent;
}(base_component_1.BaseComponent));
exports.NavbarComponent = NavbarComponent;
