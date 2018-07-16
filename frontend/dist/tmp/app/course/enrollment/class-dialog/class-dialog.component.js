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
var http_1 = require("@angular/http");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var constants_1 = require("../../../shared/models/constants");
var select_user_dialog_component_1 = require("../../../shared/components/select-user-dialog/select-user-dialog.component");
var CourseClassDialog = (function (_super) {
    __extends(CourseClassDialog, _super);
    function CourseClassDialog(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.CLASS_STATUS = constants_1.CLASS_STATUS;
        _this.locale = constants_1.DEFAULT_DATE_LOCALE;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        return _this;
    }
    CourseClassDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.start && object.end) {
                _this.rangeDates = [object.start, object.end];
            }
            var lang = _this.translateService.currentLang;
            _this.http.get("/assets/i18n/calendar." + lang + ".json")
                .subscribe(function (res) {
                _this.locale = res.json();
            });
        });
    };
    CourseClassDialog.prototype.onDateSelect = function ($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    };
    __decorate([
        core_1.ViewChild(select_user_dialog_component_1.SelectUsersDialog),
        __metadata("design:type", select_user_dialog_component_1.SelectUsersDialog)
    ], CourseClassDialog.prototype, "usersDialog", void 0);
    CourseClassDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-dialog',
            template: "<p-dialog header=\"{{'Class'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"960\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <form novalidate (ngSubmit)=\"save()\" #f=\"ngForm\" autocomplete=\"off\">     <div class=\"ui-g ui-fluid form-group\">       <div class=\"ui-g-12\">         <label style=\"font-weight: 600;\">{{'Course'|translate}}:{{object.course_name}}</label>       </div>       <div class=\"ui-g-12\">         <div class=\"ui-g-4\">           <label>{{'Enrollment'|translate}}</label>           <p-calendar [(ngModel)]=\"rangeDates\" selectionMode=\"range\" readonlyInput=\"true\" name=\"date\" [inline]=\"true\" required [locale]=\"locale\" (onSelect)=\"onDateSelect($event)\" [showIcon]=\"true\" ></p-calendar>         </div>         <div class=\"ui-g-8\">                     <span class=\"md-inputfield\">             <input type=\"text\" pInputText [(ngModel)]=\"object.name\" #name=\"ngModel\" name=\"name\" required>             <label>{{'Name'|translate}}</label>             <div *ngIf=\"name.invalid && (name.dirty || name.touched)\" class=\"ui-message ui-messages-error ui-corner-all\">               <div *ngIf=\"name.errors.required\">                 {{'Name is required' | translate}}               </div>             </div>           </span>                 </div>       </div>     </div>   </form>   <p-footer>     <button type=\"submit\" (click)=\"f.ngSubmit.emit()\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], CourseClassDialog);
    return CourseClassDialog;
}(base_dialog_1.BaseDialog));
exports.CourseClassDialog = CourseClassDialog;
