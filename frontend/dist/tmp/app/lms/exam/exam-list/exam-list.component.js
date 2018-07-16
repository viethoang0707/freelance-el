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
var base_component_1 = require("../../../shared/components/base/base.component");
var _ = require("underscore");
var constants_1 = require("../../../shared/models/constants");
var exam_content_dialog_component_1 = require("../../../cms/exam/content-dialog/exam-content.dialog.component");
var exam_study_dialog_component_1 = require("../exam-study/exam-study.dialog.component");
var report_utils_1 = require("../../../shared/helpers/report.utils");
var router_1 = require("@angular/router");
var ExamListComponent = (function (_super) {
    __extends(ExamListComponent, _super);
    function ExamListComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.exams = [];
        _this.reportUtils = new report_utils_1.ReportUtils();
        return _this;
    }
    ExamListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.lmsProfileService.init(this).subscribe(function () {
            _this.displayExams(_this.lmsProfileService.MyExams);
        });
    };
    ExamListComponent.prototype.displayExams = function (exams) {
        var _this = this;
        _.each(exams, function (exam) {
            exam['candidate'] = _this.lmsProfileService.getExamMemberByRole('candidate', exam.id);
            exam['editor'] = _this.lmsProfileService.getExamMemberByRole('editor', exam.id);
            exam['supervisor'] = _this.lmsProfileService.getExamMemberByRole('supervisor', exam.id);
            if (exam['supervisor'])
                exam['editor'] = exam['supervisor'];
        });
        exams.sort(function (exam1, exam2) {
            return _this.lmsProfileService.getLastExamTimestamp(exam2) - _this.lmsProfileService.getLastExamTimestamp(exam1);
        });
        this.exams = exams;
    };
    ExamListComponent.prototype.manageExam = function (exam, member) {
        if (!exam.IsAvailable) {
            this.warn(this.translateService.instant('Exam is not available.'));
            return;
        }
        this.router.navigate(['/lms/exams/manage', exam.id, member.id]);
    };
    ExamListComponent.prototype.editContent = function (exam) {
        this.examContentDialog.show(exam);
    };
    ExamListComponent.prototype.publishExam = function (exam) {
        exam.sheet_status = 'published';
        exam.save(this).subscribe();
    };
    ExamListComponent.prototype.unpublishExam = function (exam) {
        exam.sheet_status = 'unpublished';
        exam.save(this).subscribe();
    };
    ExamListComponent.prototype.startExam = function (exam, member) {
        var _this = this;
        this.confirmationService.confirm({
            message: this.translateService.instant('Are you sure to start?'),
            accept: function () {
                _this.examStudyDialog.show(exam, member);
            }
        });
    };
    __decorate([
        core_1.ViewChild(exam_content_dialog_component_1.ExamContentDialog),
        __metadata("design:type", exam_content_dialog_component_1.ExamContentDialog)
    ], ExamListComponent.prototype, "examContentDialog", void 0);
    __decorate([
        core_1.ViewChild(exam_study_dialog_component_1.ExamStudyDialog),
        __metadata("design:type", exam_study_dialog_component_1.ExamStudyDialog)
    ], ExamListComponent.prototype, "examStudyDialog", void 0);
    ExamListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lms-exam-list',
            template: "<div class=\"card card-w-title ui-g\">   <div class=\"ui-g-12 ui-md-12 ui-lg-12\"><h1>{{'My exams'|translate}}</h1></div>   <div class=\"ui-g-12 ui-md-12 ui-lg-12\">   <p-dataList [value]=\"exams\" [paginator]=\"true\" [rows]=\"5\" styleClass=\"lms-exam-list\">     <ng-template let-exam pTemplate=\"item\">       <p-card styleClass=\"lms-exam-list-item\">         <div class=\"ui-g\">           <div class=\"ui-lg-8 ui-md-12 ui-g-12\">             <div class=\"mt5\">               <h4 class=\"title\">{{exam.name}}</h4>               <span class=\"e-status\">                 {{exam.status}}               </span>             </div>             <div class=\"clearfix\"></div>             <p-accordion styleClass=\"cont\">               <p-accordionTab header=\"{{'Summary' | translate}}\">                 {{exam.summary}}               </p-accordionTab>               <p-accordionTab header=\"{{'Instruction' | translate}}\">                 <p [innerHTML]=\"exam.instruction\"></p>               </p-accordionTab>             </p-accordion>                        <!-- </div> -->           </div>           <div class=\"ui-lg-4 ui-md-12 ui-g-12\">             <p-card styleClass=\"lms-exam-detail\">               <ul class=\"list-cmt\">                 <li class=\"clearfix\" *ngIf=\"!exam.IsAvailable\">                     <i class=\"material-icons\">error</i>                     <span class=\"cmt-title\">{{'Exam not available'|translate}}</span>                 </li>                 <li class=\"clearfix\">                   <i class=\"material-icons\">date_range</i>                   <span class=\"cmt-title\">{{'Start date'|translate}}</span>                   <span class=\"cmt-detail\">{{exam.start | date : \"dd/MM/yyyy\"}}</span>                 </li>                 <li class=\"clearfix\">                   <i class=\"material-icons\">date_range</i>                   <span class=\"cmt-title\">{{'End date'|translate}}</span>                   <span class=\"cmt-detail\">{{exam.end | date : \"dd/MM/yyyy\"}}</span>                 </li>                 <li class=\"clearfix\">                   <i class=\"material-icons\">alarm</i>                   <span class=\"cmt-title\">{{'Duration (mintes)'|translate}}</span>                   <span class=\"cmt-detail\">{{exam.duration}}</span>                 </li>                 <li class=\"clearfix\" style=\"border-bottom: none;\">                   <i class=\"material-icons\">done</i>                   <span class=\"cmt-title\">{{'Number of question'|translate}}</span>                   <span class=\"cmt-detail\">{{exam.question_count}}</span>                 </li>                                </ul>               <p-footer>                 <button pButton type=\"button\" icon=\"ui-icon-arrow-forward\" title=\"{{'Join'| translate}}\" label=\"{{'Join'|translate}}\" class=\" green-btn\" style=\"margin-right:4px;\" (click)=\"startExam(exam, exam.candidate)\" *ngIf=\"exam.candidate!=null\" [disabled]=\"!exam.IsAvailable || exam.candidate.enroll_status=='completed'\"></button>                 <button pButton type=\"button\" icon=\"ui-icon-publish\" title=\"{{'Publish'| translate}}\" label=\"{{'Publish'|translate}}\" class=\"mr4 blue-grey-btn\" (click)=\"publishExam(exam)\" *ngIf=\"exam.supervisor!=null && exam.sheet_status!='published'\" ></button>                 <button pButton type=\"button\" icon=\"ui-icon-publish\" title=\"{{'Unpublish'| translate}}\" label=\"{{'Unpublish'|translate}}\" class=\"mr4 red-btn\" (click)=\"unpublishExam(exam)\" *ngIf=\"exam.supervisor!=null && exam.sheet_status!='unpublished'\" ></button>                 <button pButton type=\"button\" icon=\"ui-icon-edit\" title=\"{{'Edit content'| translate}}\" label=\"{{'Edit content'|translate}}\" class=\" blue-grey-btn\" style=\"margin-right:4px;\" (click)=\"editContent(exam)\" *ngIf=\"exam.editor != null\"></button>                 <button pButton type=\"button\" icon=\"ui-icon-star\" title=\"{{'Manage exam'| translate}}\" label=\"{{'Manage exam'|translate}}\" class=\"orange-btn\" style=\"margin-right:4px;\" (click)=\"manageExam(exam, exam.supervisor)\" *ngIf=\"exam.supervisor != null\"></button>               </p-footer>             </p-card>           </div>         </div>       </p-card>     </ng-template>   </p-dataList>   <exam-content-dialog></exam-content-dialog>   <exam-study-dialog></exam-study-dialog>   </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.head-exam{background-color:#e91e63}.head-exam button{margin:5px 0 5px 5px}.list-cmt{padding-left:0}.list-cmt li{list-style:none;padding:10px 14px;border-bottom:1px solid #dbdbdb}.list-cmt li i{font-size:24px;margin-right:8px;width:32px;vertical-align:middle;color:#757575}.list-cmt li .cmt-title{font-weight:700;margin-right:8px}.list-cmt li .cmt-detail{color:#757575;float:right}.e-title{font-size:15px}.e-status{background-color:#e91e63;border-radius:9px;padding:2px 8px;color:#fff}.status-bars{margin-top:10px;margin-right:20px}h4.title{float:left;font-weight:600;color:#192fa9;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:5px 10px 0 15px}"],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ExamListComponent);
    return ExamListComponent;
}(base_component_1.BaseComponent));
exports.ExamListComponent = ExamListComponent;
