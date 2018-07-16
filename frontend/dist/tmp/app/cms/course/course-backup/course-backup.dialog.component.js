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
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_unit_model_1 = require("../../../shared/models/elearning/course-unit.model");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var constants_1 = require("../../../shared/models/constants");
var _ = require("underscore");
var course_faq_model_1 = require("../../../shared/models/elearning/course-faq.model");
var course_material_model_1 = require("../../../shared/models/elearning/course-material.model");
var platform_browser_1 = require("@angular/platform-browser");
var CourseBackupDialog = (function (_super) {
    __extends(CourseBackupDialog, _super);
    function CourseBackupDialog(sanitizer) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.onShowReceiver = new Rx_1.Subject();
        _this.onHideReceiver = new Rx_1.Subject();
        _this.onShow = _this.onShowReceiver.asObservable();
        _this.onHide = _this.onHideReceiver.asObservable();
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        _this.course = new course_model_1.Course();
        _this.courseStatus = _.map(constants_1.COURSE_STATUS, function (val, key) {
            return {
                label: _this.translateService.instant(val),
                value: key
            };
        });
        _this.user = _this.authService.UserProfile;
        _this.faqs = [];
        _this.materials = [];
        return _this;
    }
    CourseBackupDialog.prototype.show = function (course) {
        this.onShowReceiver.next();
        this.display = true;
        this.course = course;
        this.buildCourseTree();
    };
    CourseBackupDialog.prototype.buildCourseTree = function () {
        var _this = this;
        course_syllabus_model_1.CourseSyllabus.get(this, this.course.syllabus_id).subscribe(function (syl) {
            _this.syl = syl;
            course_unit_model_1.CourseUnit.listByCourse(_this, _this.syl.id).subscribe(function (units) {
                _this.units = units;
                _this.tree = _this.sylUtils.buildGroupTree(units);
                _this.output = '"course-syllabus"', _this.sylUtils.buildGroupTree(units);
            });
        });
    };
    CourseBackupDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    CourseBackupDialog.prototype.getCourseMaterial = function () {
        var _this = this;
        course_material_model_1.CourseMaterial.listByCourse(this, this.course.id)
            .subscribe(function (materials) {
            _this.materials = materials;
        });
    };
    CourseBackupDialog.prototype.getCourseFaq = function () {
        var _this = this;
        course_faq_model_1.CourseFaq.listByCourse(this, this.course.id)
            .subscribe(function (faqs) {
            _this.faqs = faqs;
        });
    };
    CourseBackupDialog.prototype.backupCourse = function () {
        this.getCourseFaq();
        this.getCourseMaterial();
        this.output = { "course_faq": this.faqs, "course_material": this.materials, "course_syllabus": this.syl, "course_unit": this.units };
        var dataStr = JSON.stringify(this.output);
        var data = "text/json;charset=utf-8," + encodeURIComponent(dataStr);
        var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(dataStr));
        this.downloadJsonHref = uri;
    };
    CourseBackupDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-backup-dialog',
            template: "<p-dialog header=\"{{'Course Backup'|translate}}: {{syl.name}}\" [(visible)]=\"display\" modal=\"false\" width=\"1000\" height=\"100%\"     [responsive]=\"true\">     <div class=\"ui-g\">         <div class=\"ui-g-12 course-syllabus\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left mt5\">                     <a pButton type=\"button\" [href]=\"downloadJsonHref\" label=\"{{'Backup'|translate}}\" class=\"green-btn\" icon=\"ui-icon-mode-edit\" download=\"data.json\" (click)=\"backupCourse()\"></a>                 </div>             </p-toolbar>             <div class=\"ui-g-6\">                 <p-tree [value]=\"tree\" [loading]=\"loading\" selectionMode=\"single\" [(selection)]=\"selectedNode\"></p-tree>             </div>         </div>     </div>     <p-footer>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
            styles: [".image-box-footer{margin-top:10px}.course-syllabus-unit{height:268px;margin-bottom:0}"],
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], CourseBackupDialog);
    return CourseBackupDialog;
}(base_component_1.BaseComponent));
exports.CourseBackupDialog = CourseBackupDialog;
