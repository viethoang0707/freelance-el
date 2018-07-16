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
var constants_1 = require("../../../shared/models/constants");
var exam_model_1 = require("../../../shared/models/elearning/exam.model");
var exam_dialog_component_1 = require("../exam-dialog/exam-dialog.component");
var enrollment_dialog_component_1 = require("../enrollment-dialog/enrollment-dialog.component");
var ExamEnrollmentListComponent = (function (_super) {
    __extends(ExamEnrollmentListComponent, _super);
    function ExamEnrollmentListComponent() {
        var _this = _super.call(this) || this;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        _this.header = constants_1.SCHEDULER_HEADER;
        return _this;
    }
    ExamEnrollmentListComponent.prototype.enrollExam = function () {
        if (this.selectedExam) {
            if (this.selectedExam.review_state != 'approved') {
                this.warn('Exam not reviewed yet');
                return;
            }
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have enroll permission for this exam');
                return;
            }
            this.examEnrollDialog.enroll(this.selectedExam);
        }
    };
    ExamEnrollmentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        exam_model_1.Exam.allForEnrollPublic(this).subscribe(function (exams) {
            _this.exams = exams;
        });
    };
    ExamEnrollmentListComponent.prototype.closeExam = function () {
        var _this = this;
        if (this.selectedExam) {
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have close permission for this exam');
                return;
            }
            this.confirm('Are you sure to proceed ?  You will not be able to enroll students after the exam is closed', function () {
                _this.selectedExam.close(_this).subscribe(function () {
                    _this.selectedExam.status = 'closed';
                    _this.success('Exam close');
                });
            });
        }
    };
    ExamEnrollmentListComponent.prototype.openExam = function () {
        var _this = this;
        if (this.selectedExam) {
            if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
                this.error('You do not have open permission for this exam');
                return;
            }
            this.confirm('Are you sure to proceed ?', function () {
                _this.selectedExam.open(_this).subscribe(function () {
                    _this.selectedExam.status = 'open';
                    _this.success('Exam open');
                });
            });
        }
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], ExamEnrollmentListComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.ExamEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.ExamEnrollDialog)
    ], ExamEnrollmentListComponent.prototype, "examEnrollDialog", void 0);
    ExamEnrollmentListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-enrollment-list',
            template: "<div class=\"card card-w-title\">     <h1>{{'Exam enrollments'|translate}}</h1>     <div class=\"ui-g\">         <div class=\"ui-g-12\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{'Enroll'|translate}}\" class=\"green-btn\" icon=\"ui-icon-people\" (click)=\"enrollExam()\" *ngIf=\"selectedExam && selectedExam.status=='open'\"></button>                 </div>                 <div class=\"ui-toolbar-group-right\">                      <button pButton type=\"button \" label=\"{{ 'Open'|translate}} \" class=\"green-btn \" icon=\"ui-icon-lock\" (click)=\"openExam() \" [disabled]=\" selectedExam && selectedExam.status=='open'\" ></button>                      <button pButton type=\"button \" label=\"{{ 'Close'|translate}} \" class=\"orange-btn \" icon=\"ui-icon-lock\" (click)=\"closeExam() \" [disabled]=\" selectedExam && selectedExam.status=='closed'\" ></button>                 </div>             </p-toolbar>             <p-table #examTable [value]=\"exams\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedExam\" [responsive]=\"true\" [globalFilterFields]=\"['name']\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th>                             {{'Supervisor'|translate}}                         </th>                         <th>                             {{'Start'|translate}}                         </th>                         <th>                             {{'End'|translate}}                         </th>                         <th [pSortableColumn]=\"'status'\">                             {{'Status'|translate}}                             <p-sortIcon [field]=\"'status'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'review_state'\">                             {{'Reviewed'|translate}}                             <p-sortIcon [field]=\"'review_state'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'create_date'\">                             {{'Created'|translate}}                             <p-sortIcon [field]=\"'create_date'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'write_date'\">                             {{'Updated'|translate}}                             <p-sortIcon [field]=\"'write_date'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-exam>                     <tr [pSelectableRow]=\"exam\">                         <td  style=\"text-align: left;\">{{exam.name}}</td>                         <td class=\"showformb\" style=\"text-align: left;\">{{exam.supervisor_name}}</td>                         <td class=\"showformb\">{{exam.start | date : \"dd/MM/yyyy, h:mm a\"}}</td>                         <td class=\"showformb\">{{exam.end | date : \"dd/MM/yyyy, h:mm a\"}}</td>                         <td class=\"showformb\">{{EXAM_STATUS[exam.status] | translate}}</td>                         <td class=\"showformb\">{{REVIEW_STATE[exam.review_state] | translate}}</td>                         <td>{{exam.create_date | date : \"dd/MM/yyyy \"}}</td>                         <td>{{exam.write_date | date : \"dd/MM/yyyy \"}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{exams?.length}}                 </ng-template>             </p-table>             <exam-enrollment-dialog></exam-enrollment-dialog>             <exam-dialog></exam-dialog>         </div>     </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.search input{color:#fff;padding:6px 24px 6px 6px}.search i{position:absolute;right:0;top:0;color:#e8eaf6;font-size:28px}"],
        }),
        __metadata("design:paramtypes", [])
    ], ExamEnrollmentListComponent);
    return ExamEnrollmentListComponent;
}(base_component_1.BaseComponent));
exports.ExamEnrollmentListComponent = ExamEnrollmentListComponent;
