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
var platform_browser_1 = require("@angular/platform-browser");
var excel_service_1 = require("../../../shared/services/excel.service");
var CourseRestoreDialog = (function (_super) {
    __extends(CourseRestoreDialog, _super);
    function CourseRestoreDialog(sanitizer, excelService) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.excelService = excelService;
        _this.uploadedFiles = [];
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
    CourseRestoreDialog.prototype.show = function (course) {
        this.onShowReceiver.next();
        this.display = true;
        this.course = course;
        this.buildCourseTree();
    };
    CourseRestoreDialog.prototype.buildCourseTree = function () {
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
    CourseRestoreDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    CourseRestoreDialog.prototype.onUpload = function (event) {
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    };
    CourseRestoreDialog.prototype.changeListner = function (event) {
        var _this = this;
        var file = event.files[0];
        this.fileName = file.name;
        this.excelService.importFromJsonFile(file).subscribe(function (data) {
            _this.data = data;
        });
    };
    CourseRestoreDialog.prototype.restoreCourse = function () {
        var subscriptions = [];
        console.log(this.data);
        var output = JSON.parse(this.data);
        var course_faq = output.course_faq;
        var course_material = output.course_material;
        var course_syllabus = output.course_syllabus;
        var course_unit = output.course_unit;
        console.log('course_faq: ', course_faq);
        console.log('course_material: ', course_material);
        console.log('course_syllabus: ', course_syllabus);
        console.log('course_unit: ', course_unit);
    };
    CourseRestoreDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-restore-dialog',
            template: "<p-dialog header=\"{{'Course Restore'|translate}}: {{syl.name}}\" [(visible)]=\"display\" modal=\"false\" width=\"1000\" height=\"100%\"     [responsive]=\"true\">     <div class=\"ui-g\">         <div class=\"ui-g-12 course-syllabus\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left mt5\">                     <a pButton type=\"button\" label=\"{{'Restore'|translate}}\" class=\"green-btn\" icon=\"ui-icon-mode-edit\" (click)=\"restoreCourse()\"></a>                     <p-fileUpload mode=\"basic\" chooseLabel=\"{{'Select file'|translate}}\" (onSelect)=\"changeListner($event)\" accept=\"json\" maxFileSize=\"1024*16\"                         showUploadButton=\"false\"></p-fileUpload>                 </div>             </p-toolbar>             <div class=\"ui-g-6\">                 <p-tree [value]=\"tree\" [loading]=\"loading\" selectionMode=\"single\" [(selection)]=\"selectedNode\"></p-tree>             </div>         </div>     </div>     <p-footer>         <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer> </p-dialog>",
            styles: [".image-box-footer{margin-top:10px}.course-syllabus-unit{height:268px;margin-bottom:0}"],
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, excel_service_1.ExcelService])
    ], CourseRestoreDialog);
    return CourseRestoreDialog;
}(base_component_1.BaseComponent));
exports.CourseRestoreDialog = CourseRestoreDialog;
