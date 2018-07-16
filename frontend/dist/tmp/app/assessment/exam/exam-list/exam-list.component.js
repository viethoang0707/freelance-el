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
var ExamListComponent = (function (_super) {
    __extends(ExamListComponent, _super);
    function ExamListComponent() {
        var _this = _super.call(this) || this;
        _this.EXAM_STATUS = constants_1.EXAM_STATUS;
        _this.REVIEW_STATE = constants_1.REVIEW_STATE;
        return _this;
    }
    ExamListComponent.prototype.ngOnInit = function () {
        this.loadExams();
    };
    ExamListComponent.prototype.addExam = function () {
        var _this = this;
        var exam = new exam_model_1.Exam();
        exam.is_public = true;
        this.examDialog.show(exam);
        this.examDialog.onCreateComplete.subscribe(function () {
            _this.loadExams();
        });
    };
    ExamListComponent.prototype.editExam = function () {
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
            this.error('You do not have enroll permission for this exam');
            return;
        }
        this.examDialog.show(this.selectedExam);
    };
    ExamListComponent.prototype.deleteExam = function () {
        var _this = this;
        if (!this.ContextUser.IsSuperAdmin && this.ContextUser.id != this.selectedExam.supervisor_id) {
            this.error('You do not have enroll permission for this exam');
            return;
        }
        this.confirm('Are you sure to delete ?', function () {
            _this.selectedExam.delete(_this).subscribe(function () {
                _this.loadExams();
                _this.selectedExam = null;
            });
        });
    };
    ExamListComponent.prototype.loadExams = function () {
        var _this = this;
        exam_model_1.Exam.listPublicExam(this).subscribe(function (exams) {
            _this.exams = exams;
            _this.exams.sort(function (exam1, exam2) {
                return exam1.id - exam2.id;
            });
        });
    };
    ExamListComponent.prototype.requestReview = function () {
        var _this = this;
        if (this.ContextUser.id != this.selectedExam.supervisor_id) {
            this.error('You do not have submit-review permission for this exam');
            return;
        }
        this.workflowService.createExamReviewTicket(this, this.selectedExam).subscribe(function () {
            _this.success('Request submitted');
            _this.selectedExam.refresh(_this).subscribe();
        });
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], ExamListComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(enrollment_dialog_component_1.ExamEnrollDialog),
        __metadata("design:type", enrollment_dialog_component_1.ExamEnrollDialog)
    ], ExamListComponent.prototype, "examEnrollDialog", void 0);
    ExamListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'exam-list',
            template: "<div class=\"card card-w-title\">     <h1>{{'Exams'|translate}}</h1>     <div class=\"ui-g\">         <div class=\"ui-g-12\">             <p-toolbar>                 <div class=\"ui-toolbar-group-left\">                     <button pButton type=\"button\" label=\"{{'New'|translate}}\" class=\"green-btn\" (click)=\"addExam()\" icon=\"ui-icon-add\"></button>                     <button pButton type=\"button\" label=\"{{'Edit'|translate}}\" class=\"blue-grey-btn\" icon=\"ui-icon-mode-edit\" (click)=\"editExam()\" *ngIf=\"selectedExam\"></button>                     <button pButton type=\"button\" label=\"{{'Delete'|translate}}\" class=\"red-btn\" icon=\"ui-icon-delete\" (click)=\"deleteExam()\" *ngIf=\"selectedExam\"></button>                     <button pButton type=\"button\" label=\"{{'Request review'|translate}}\" class=\"purple-btn\" icon=\"ui-icon-rate-revie\" (click)=\"requestReview()\" *ngIf=\"selectedExam &&  selectedExam.review_state !='approved'\"></button>                 </div>                  <div class=\"ui-toolbar-group-right\">                     <span class=\"md-inputfield search\">                         <input type=\"text\" pInputText placeholder=\"Search\"                         (input)=\"examTable.filterGlobal($event.target.value, 'contains')\">                            <i class=\"fa fa-search\"></i>                           </span>                 </div>             </p-toolbar>             <p-table #examTable [value]=\"exams\" [paginator]=\"true\" [rows]=\"10\" selectionMode=\"single\" [(selection)]=\"selectedExam\" [responsive]=\"true\" [globalFilterFields]=\"['name']\">                 <ng-template pTemplate=\"header\">                     <tr>                         <th [pSortableColumn]=\"'name'\">                             {{'Name'|translate}}                             <p-sortIcon [field]=\"'name'\"></p-sortIcon>                         </th>                         <th>                             {{'Supervisor'|translate}}                         </th>                         <th>                             {{'Start'|translate}}                         </th>                         <th>                             {{'End'|translate}}                         </th>                         <th [pSortableColumn]=\"'status'\">                             {{'Status'|translate}}                             <p-sortIcon [field]=\"'status'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'review_state'\">                             {{'Reviewed'|translate}}                             <p-sortIcon [field]=\"'review_state'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'create_date'\">                             {{'Created'|translate}}                             <p-sortIcon [field]=\"'create_date'\"></p-sortIcon>                         </th>                         <th [pSortableColumn]=\"'write_date'\">                             {{'Updated'|translate}}                             <p-sortIcon [field]=\"'write_date'\"></p-sortIcon>                         </th>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"body\" let-exam>                     <tr [pSelectableRow]=\"exam\">                         <td  style=\"text-align: left;\">{{exam.name}}</td>                         <td class=\"showformb\" style=\"text-align: left;\">{{exam.supervisor_name}}</td>                         <td class=\"showformb\">{{exam.start | date : \"dd/MM/yyyy\"}}</td>                         <td class=\"showformb\">{{exam.end | date : \"dd/MM/yyyy\"}}</td>                         <td class=\"showformb\">{{EXAM_STATUS[exam.status] | translate}}</td>                         <td class=\"showformb\">{{REVIEW_STATE[exam.review_state] | translate}}</td>                         <td>{{exam.create_date | date : \"dd/MM/yyyy \"}}</td>                         <td>{{exam.write_date | date : \"dd/MM/yyyy \"}}</td>                     </tr>                 </ng-template>                 <ng-template pTemplate=\"summary\">                     {{'Total records'|translate}} : {{exams?.length}}                 </ng-template>             </p-table>             <exam-dialog></exam-dialog>         </div>     </div> </div>",
            styles: [".mrg-bt{margin-bottom:15px}.search input{color:#fff;padding:6px 24px 6px 6px}.search i{position:absolute;right:0;top:0;color:#e8eaf6;font-size:28px}"],
        }),
        __metadata("design:paramtypes", [])
    ], ExamListComponent);
    return ExamListComponent;
}(base_component_1.BaseComponent));
exports.ExamListComponent = ExamListComponent;
