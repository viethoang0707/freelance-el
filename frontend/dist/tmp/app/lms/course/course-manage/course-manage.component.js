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
var base_component_1 = require("../../../shared/components/base/base.component");
var course_model_1 = require("../../../shared/models/elearning/course.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var class_conference_dialog_component_1 = require("../../class/class-conference/class-conference.dialog.component");
var course_faq_dialog_component_1 = require("../course-faq/course-faq.dialog.component");
var course_material_dialog_component_1 = require("../course-material/course-material.dialog.component");
var course_syllabus_model_1 = require("../../../shared/models/elearning/course-syllabus.model");
var syllabus_utils_1 = require("../../../shared/helpers/syllabus.utils");
var course_unit_preview_dialog_component_1 = require("../../../cms/course/course-unit-preview-dialog/course-unit-preview-dialog.component");
var mail_message_dialog_component_1 = require("../../../shared/components/mail-message/mail-message.dialog.component");
var CourseManageComponent = (function (_super) {
    __extends(CourseManageComponent, _super);
    function CourseManageComponent(router, route) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.COURSE_UNIT_TYPE = constants_1.COURSE_UNIT_TYPE;
        _this.sylUtils = new syllabus_utils_1.SyllabusUtils();
        _this.classes = [];
        _this.faqs = [];
        _this.materials = [];
        _this.course = new course_model_1.Course();
        _this.syl = new course_syllabus_model_1.CourseSyllabus();
        return _this;
    }
    CourseManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var courseId = +params['courseId'];
            _this.memberId = +params['memberId'];
            _this.course = _this.lmsProfileService.courseById(courseId);
            _this.classes = _this.lmsProfileService.classByCourseId(courseId);
            _this.lmsProfileService.getCourseContent(courseId).subscribe(function (content) {
                _this.syl = content["syllabus"];
                _this.faqs = content["faqs"];
                _this.materials = content["materials"];
                _this.units = content["units"];
                _this.displayCouseSyllabus();
            });
        });
    };
    CourseManageComponent.prototype.displayCouseSyllabus = function () {
        this.units = _.filter(this.units, function (unit) {
            return unit.status == 'published';
        });
        this.tree = this.sylUtils.buildGroupTree(this.units);
        if (this.syl.status != 'published')
            this.warn('Cours syllabus is not published');
    };
    CourseManageComponent.prototype.manageConference = function () {
        this.conferenceDialog.show(this.selectedClass);
    };
    CourseManageComponent.prototype.manageClass = function () {
        this.router.navigate(['/lms/courses/manage/class', this.course.id, this.selectedClass.id, this.memberId]);
    };
    CourseManageComponent.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.selectedUnit = this.selectedNode.data;
        }
    };
    CourseManageComponent.prototype.broadcastMessage = function () {
        var _this = this;
        course_member_model_1.CourseMember.listByClass(this, this.selectedClass.id).subscribe(function (members) {
            if (members.length) {
                var emails = _.pluck(members, "email");
                _this.mailDialog.show(emails);
            }
        });
    };
    CourseManageComponent.prototype.previewUnit = function () {
        if (this.selectedNode) {
            this.unitPreviewDialog.show(this.selectedNode.data);
        }
    };
    __decorate([
        core_1.ViewChild(course_material_dialog_component_1.CourseMaterialDialog),
        __metadata("design:type", course_material_dialog_component_1.CourseMaterialDialog)
    ], CourseManageComponent.prototype, "materialDialog", void 0);
    __decorate([
        core_1.ViewChild(course_faq_dialog_component_1.CourseFaqDialog),
        __metadata("design:type", course_faq_dialog_component_1.CourseFaqDialog)
    ], CourseManageComponent.prototype, "faqDialog", void 0);
    __decorate([
        core_1.ViewChild(class_conference_dialog_component_1.ClassConferenceDialog),
        __metadata("design:type", class_conference_dialog_component_1.ClassConferenceDialog)
    ], CourseManageComponent.prototype, "conferenceDialog", void 0);
    __decorate([
        core_1.ViewChild(course_unit_preview_dialog_component_1.CourseUnitPreviewDialog),
        __metadata("design:type", course_unit_preview_dialog_component_1.CourseUnitPreviewDialog)
    ], CourseManageComponent.prototype, "unitPreviewDialog", void 0);
    __decorate([
        core_1.ViewChild(mail_message_dialog_component_1.MailMessageDialog),
        __metadata("design:type", mail_message_dialog_component_1.MailMessageDialog)
    ], CourseManageComponent.prototype, "mailDialog", void 0);
    CourseManageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-manage',
            template: "<div class=\"card card-w-title course-syllabus\">     <h1>{{'Course manage: '|translate}}: {{course.name}} </h1>     <p-tabView [style]=\"{width: '100%', height: '600px'}\">         <p-tabPanel header=\"{{'Class list'|translate}}\" leftIcon=\"ui-icon-supervisor-account\" *ngIf=\"course.mode=='group'\">             <div class=\"ui-g-12 \">                 <p-toolbar>                     <div class=\"ui-toolbar-group-left \">                         <button pButton type=\"button \" label=\"{{ 'Students'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-people \" (click)=\"manageClass(selectedClass) \" [disabled]=\"!selectedClass\"></button>                         <button pButton type=\"button \" label=\"{{ 'Conferences'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-call \" (click)=\"manageConference(selectedClass) \" [disabled]=\"!selectedClass\"></button>                         <button pButton type=\"button \" label=\"{{ 'Annoucement'|translate}} \" class=\"blue-grey-btn \" icon=\"ui-icon-send \" (click)=\"broadcastMessage(selectedClass) \" [disabled]=\"!selectedClass\"></button>                     </div>                 </p-toolbar>                 <p-table #classTable [value]=\"classes\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedClass\" [responsive]=\"true\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th [pSortableColumn]=\"'name'\">                                 {{'Name'|translate}}                                 <p-sortIcon [field]=\"'name'\"></p-sortIcon>                             </th>                             <th>                                 {{'Status'|translate}}                             </th>                             <th [pSortableColumn]=\"'start'\">                                 {{'Start'|translate}}                                 <p-sortIcon [field]=\"'start'\"></p-sortIcon>                             </th>                             <th [pSortableColumn]=\"'end'\">                                 {{'End'|translate}}                                 <p-sortIcon [field]=\"'end'\"></p-sortIcon>                             </th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-class>                         <tr [pSelectableRow]=\"class\">                             <td>{{class.name}}</td>                             <td>{{class.status}}</td>                             <td>{{class.start | date : \"dd/MM/yyyy\"}}</td>                             <td>{{class.end | date : \"dd/MM/yyyy\"}}</td>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"summary\">                         {{'Total records'|translate}} : {{classes?.length}}                     </ng-template>                 </p-table>             </div>             <mail-message-dialog></mail-message-dialog>             <class-conference-dialog></class-conference-dialog>         </p-tabPanel>                 <p-tabPanel header=\"{{'Course syllabus'|translate}}\" leftIcon=\"ui-icon-dehaze\" [disabled]=\"syl.status!='published'\">             <div class=\"ui-g-3\">                 <p-tree [value]=\"tree\" selectionMode=\"single\" [(selection)]=\"selectedNode\" (onNodeSelect)=\"nodeSelect($event)\"></p-tree>             </div>             <div class=\"ui-g-9\" *ngIf=\"selectedUnit\">                 <div class=\"card\">                     <div class=\"image-box-content\">                         <div>                             <h3 class=\"removeMT\">{{selectedUnit.name}}</h3>                             <span>{{'Unit type'|translate}} : {{COURSE_UNIT_TYPE[selectedUnit.type]}}</span>                         </div>                         <div class=\"image-box-footer\">                             <button pButton type=\"button\" icon=\"ui-icon-remove-red-eye\" title=\"{{'Preview'| translate}}\" label=\"{{'Preview'|translate}}\" class=\"orange-btn\" style=\"margin-right:4px;\" (click)=\"previewUnit()\" *ngIf=\"selectedUnit.type!='folder'\"></button>                         </div>                     </div>                 </div>             </div>             <course-unit-preview-dialog></course-unit-preview-dialog>         </p-tabPanel>         <p-tabPanel header=\"{{'Course material'|translate}}\" leftIcon=\"ui-icon-cloud-download\">             <div class=\"ui-g-12\">                 <p-table #materialTable [value]=\"materials\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedMaterial\" [responsive]=\"true\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th [pSortableColumn]=\"'name'\">                                 {{'Name'|translate}}                                 <p-sortIcon [field]=\"'name'\"></p-sortIcon>                             </th>                             <th [pSortableColumn]=\"'type'\">                                 {{'Type'|translate}}                                 <p-sortIcon [field]=\"'type'\"></p-sortIcon>                             </th>                             <th>                                 {{'URL'|translate}}                             </th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-material>                         <tr [pSelectableRow]=\"material\">                             <td>{{material.name}}</td>                             <td>{{material.type}}</td>                             <td class=\"url-course-material\">{{material.url}}</td>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"summary\">                         {{'Total records'|translate}} : {{materials?.length}}                     </ng-template>                 </p-table>             </div>             <course-material-dialog></course-material-dialog>         </p-tabPanel>         <p-tabPanel header=\"{{'Course FAQ'|translate}}\" leftIcon=\"ui-icon-question-answer\">             <div class=\"ui-g-12\">                 <p-table #faqTable [value]=\"faqs\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedFaq\" [responsive]=\"true\">                     <ng-template pTemplate=\"header\">                         <tr>                             <th>                                 {{'Question'|translate}}                             </th>                             <th>                                 {{'Answer'|translate}}                             </th>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"body\" let-faq>                         <tr [pSelectableRow]=\"faq\">                             <td>{{faq.question}}</td>                             <td>{{faq.answer}}</td>                         </tr>                     </ng-template>                     <ng-template pTemplate=\"summary\">                         {{'Total records'|translate}} : {{faqs?.length}}                     </ng-template>                 </p-table>             </div>             <course-faq-dialog></course-faq-dialog>         </p-tabPanel>     </p-tabView> </div>",
            styles: [".image-box-footer{margin-top:10px}.url-course-material{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute])
    ], CourseManageComponent);
    return CourseManageComponent;
}(base_component_1.BaseComponent));
exports.CourseManageComponent = CourseManageComponent;
