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
var class_dialog_component_1 = require("../../course/enrollment/class-dialog/class-dialog.component");
var base_component_1 = require("../../shared/components/base/base.component");
var exam_model_1 = require("../../shared/models/elearning/exam.model");
var date_utils_1 = require("../../shared/helpers/date.utils");
var exam_dialog_component_1 = require("../../assessment/exam/exam-dialog/exam-dialog.component");
var _ = require("underscore");
var constants_1 = require("../../shared/models/constants");
var base_model_1 = require("../../shared/models/base.model");
var course_class_model_1 = require("../../shared/models/elearning/course-class.model");
var ticket_model_1 = require("../../shared/models/elearning/ticket.model");
var AdminDashboardComponent = (function (_super) {
    __extends(AdminDashboardComponent, _super);
    function AdminDashboardComponent() {
        var _this = _super.call(this) || this;
        _this.TICKET_STATUS = constants_1.TICKET_STATUS;
        _this.header = constants_1.SCHEDULER_HEADER;
        _this.dateUtils = new date_utils_1.DateUtils();
        return _this;
    }
    AdminDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var now = new Date();
        this.events = [];
        this.approvalTickets = [];
        base_model_1.BaseModel
            .bulk_search(this, exam_model_1.Exam.__api__listBySupervisorAndDate(this.ContextUser.id, this.dateUtils.firstDateOfMonth(now), this.dateUtils.lastDateOfMonth(now)), course_class_model_1.CourseClass.__api__listBySupervisorAndDate(this.ContextUser.id, this.dateUtils.firstDateOfMonth(now), this.dateUtils.lastDateOfMonth(now)), ticket_model_1.Ticket.__api__listPendingByApproveUser(this.ContextUser.id))
            .subscribe(function (jsonArr) {
            _this.exams = _.filter(exam_model_1.Exam.toArray(jsonArr[0]), function (exam) {
                return exam.IsAvailable;
            });
            var examEvents = _.map(_this.exams, function (exam) {
                return {
                    title: exam.name,
                    start: exam.start,
                    end: exam.end,
                    id: exam_model_1.Exam.Model + ':' + exam.id,
                    allDay: true
                };
            });
            _this.classes = _.filter(course_class_model_1.CourseClass.toArray(jsonArr[1]), function (clz) {
                return clz.IsAvailable;
            });
            var classEvents = _.map(_this.classes, function (clazz) {
                return {
                    title: clazz.name,
                    start: clazz.start,
                    end: clazz.end,
                    id: course_class_model_1.CourseClass.Model + ':' + clazz.id,
                    allDay: true
                };
            });
            _this.events = _this.events.concat(examEvents).concat(classEvents);
            _this.approvalTickets = ticket_model_1.Ticket.toArray(jsonArr[2]);
        });
    };
    AdminDashboardComponent.prototype.onEventClick = function (event) {
        var eventId = event.calEvent.id;
        var model = eventId.split(':')[0];
        var id = eventId.split(':')[1];
        if (model == exam_model_1.Exam.Model) {
            var exam = _.find(this.exams, function (exam) {
                return exam.id == id;
            });
            this.examDialog.show(exam);
        }
        if (model == course_class_model_1.CourseClass.Model) {
            var clazz = _.find(this.classes, function (clazz) {
                return clazz.id == id;
            });
            this.classDialog.show(clazz);
        }
    };
    AdminDashboardComponent.prototype.approveTicket = function (ticket) {
        var _this = this;
        if (ticket.status == 'pending') {
            this.workflowService.approveTicket(this, ticket.id).subscribe(function () {
                _this.info(_this.translateService.instant('Ticket approved'));
                _this.approvalTickets = _.reject(_this.approvalTickets, function (obj) {
                    return obj.id == ticket.id;
                });
            });
        }
    };
    AdminDashboardComponent.prototype.rejectTicket = function (ticket) {
        var _this = this;
        if (ticket.status == 'pending') {
            this.workflowService.rejectTicket(this, ticket.id).subscribe(function () {
                _this.info(_this.translateService.instant('Ticket rejected'));
                _this.approvalTickets = _.reject(_this.approvalTickets, function (obj) {
                    return obj.id == ticket.id;
                });
            });
        }
    };
    __decorate([
        core_1.ViewChild(exam_dialog_component_1.ExamDialog),
        __metadata("design:type", exam_dialog_component_1.ExamDialog)
    ], AdminDashboardComponent.prototype, "examDialog", void 0);
    __decorate([
        core_1.ViewChild(class_dialog_component_1.CourseClassDialog),
        __metadata("design:type", class_dialog_component_1.CourseClassDialog)
    ], AdminDashboardComponent.prototype, "classDialog", void 0);
    AdminDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-dashboard',
            templateUrl: 'admin-dashboard.component.html',
            styleUrls: ['admin-dashboard.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], AdminDashboardComponent);
    return AdminDashboardComponent;
}(base_component_1.BaseComponent));
exports.AdminDashboardComponent = AdminDashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kYXNoYm9hcmQvYWRtaW4tZGFzaGJvYXJkL2FkbWluLWRhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXVGO0FBSXZGLHNHQUFnRztBQUVoRyw4RUFBNEU7QUFFNUUsdUVBQWdFO0FBQ2hFLDhEQUE0RDtBQUU1RCxpR0FBcUY7QUFDckYsOEJBQWdDO0FBRWhDLDJEQUFvSTtBQUVwSSw2REFBMkQ7QUFDM0QsdUZBQStFO0FBQy9FLDJFQUFvRTtBQVVwRTtJQUE2QywyQ0FBYTtJQWN0RDtRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQWhCRCxtQkFBYSxHQUFHLHlCQUFhLENBQUM7UUFjMUIsS0FBSSxDQUFDLE1BQU0sR0FBRyw0QkFBZ0IsQ0FBQztRQUMvQixLQUFJLENBQUMsU0FBUyxHQUFJLElBQUksc0JBQVMsRUFBRSxDQUFDOztJQUN0QyxDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUFBLGlCQXFDQztRQXBDRyxJQUFJLEdBQUcsR0FBSSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLHNCQUFTO2FBQ1IsV0FBVyxDQUFDLElBQUksRUFDYixpQkFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDakksZ0NBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFD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QkFDL0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXRGc0I7UUFBdEIsZ0JBQVMsQ0FBQyxrQ0FBVSxDQUFDO2tDQUFhLGtDQUFVOytEQUFDO0lBQ2hCO1FBQTdCLGdCQUFTLENBQUMsMENBQWlCLENBQUM7a0NBQWMsMENBQWlCO2dFQUFDO0lBWnBELHVCQUF1QjtRQVBuQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUUvQyxDQUFDOztPQUNXLHVCQUF1QixDQWtHbkM7SUFBRCw4QkFBQztDQWxHRCxBQWtHQyxDQWxHNEMsOEJBQWEsR0FrR3pEO0FBbEdZLDBEQUF1QiIsImZpbGUiOiJhcHAvZGFzaGJvYXJkL2FkbWluLWRhc2hib2FyZC9hZG1pbi1kYXNoYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3NEaWFsb2cgfSBmcm9tICcuLi8uLi9jb3Vyc2UvZW5yb2xsbWVudC9jbGFzcy1kaWFsb2cvY2xhc3MtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3Vyc2VNZW1iZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBFeGFtIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS5tb2RlbCc7XG5pbXBvcnQgeyBEYXRlVXRpbHMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaGVscGVycy9kYXRlLnV0aWxzJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgRXhhbURpYWxvZyB9IGZyb20gJy4uLy4uL2Fzc2Vzc21lbnQvZXhhbS9leGFtLWRpYWxvZy9leGFtLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgVVNFUl9TVEFUVVMsIFNFUlZFUl9EQVRFVElNRV9GT1JNQVQsVElDS0VUX1NUQVRVUywgQ09OVEVOVF9TVEFUVVMsIFNDSEVEVUxFUl9IRUFERVIgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQ291cnNlQ2xhc3MgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9jb3Vyc2UtY2xhc3MubW9kZWwnO1xuaW1wb3J0IHsgVGlja2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvdGlja2V0Lm1vZGVsJztcbmltcG9ydCB7IFdvcmtmbG93U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy93b3JrZmxvdy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ2FkbWluLWRhc2hib2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICdhZG1pbi1kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWydhZG1pbi1kYXNoYm9hcmQuY29tcG9uZW50LmNzcyddLFxuXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluRGFzaGJvYXJkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBUSUNLRVRfU1RBVFVTID0gVElDS0VUX1NUQVRVUztcblxuICAgIHByaXZhdGUgZXZlbnRzOiBhbnlbXTtcbiAgICBwcml2YXRlIGhlYWRlcjogYW55O1xuICAgIHByaXZhdGUgZXhhbXM6IEV4YW1bXTtcbiAgICBwcml2YXRlIGNsYXNzZXM6IENvdXJzZUNsYXNzW107XG4gICAgcHJpdmF0ZSBhcHByb3ZhbFRpY2tldHMgOiBUaWNrZXRbXTtcbiAgICBwcml2YXRlIGRhdGVVdGlsczogRGF0ZVV0aWxzO1xuXG4gICAgQFZpZXdDaGlsZChFeGFtRGlhbG9nKSBleGFtRGlhbG9nOiBFeGFtRGlhbG9nO1xuICAgIEBWaWV3Q2hpbGQoQ291cnNlQ2xhc3NEaWFsb2cpIGNsYXNzRGlhbG9nOiBDb3Vyc2VDbGFzc0RpYWxvZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmhlYWRlciA9IFNDSEVEVUxFUl9IRUFERVI7XG4gICAgICAgIHRoaXMuZGF0ZVV0aWxzID0gIG5ldyBEYXRlVXRpbHMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHsgIFxuICAgICAgICB2YXIgbm93ID0gIG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gW107XG4gICAgICAgIHRoaXMuYXBwcm92YWxUaWNrZXRzID0gW107XG4gICAgICAgIEJhc2VNb2RlbFxuICAgICAgICAuYnVsa19zZWFyY2godGhpcyxcbiAgICAgICAgICAgIEV4YW0uX19hcGlfX2xpc3RCeVN1cGVydmlzb3JBbmREYXRlKHRoaXMuQ29udGV4dFVzZXIuaWQsdGhpcy5kYXRlVXRpbHMuZmlyc3REYXRlT2ZNb250aChub3cpLHRoaXMuZGF0ZVV0aWxzLmxhc3REYXRlT2ZNb250aChub3cpKSxcbiAgICAgICAgICAgIENvdXJzZUNsYXNzLl9fYXBpX19saXN0QnlTdXBlcnZpc29yQW5kRGF0ZSh0aGlzLkNvbnRleHRVc2VyLmlkLHRoaXMuZGF0ZVV0aWxzLmZpcnN0RGF0ZU9mTW9udGgobm93KSx0aGlzLmRhdGVVdGlscy5sYXN0RGF0ZU9mTW9udGgobm93KSksXG4gICAgICAgICAgICBUaWNrZXQuX19hcGlfX2xpc3RQZW5kaW5nQnlBcHByb3ZlVXNlcih0aGlzLkNvbnRleHRVc2VyLmlkKSlcbiAgICAgICAgLnN1YnNjcmliZShqc29uQXJyPT4ge1xuICAgICAgICAgICAgdGhpcy5leGFtcyA9IF8uZmlsdGVyKEV4YW0udG9BcnJheShqc29uQXJyWzBdKSwgKGV4YW06RXhhbSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4YW0uSXNBdmFpbGFibGU7XG4gICAgICAgICAgICAgIH0pIDtcbiAgICAgICAgICAgIHZhciBleGFtRXZlbnRzID0gIF8ubWFwKHRoaXMuZXhhbXMsIChleGFtOkV4YW0pPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBleGFtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBleGFtLnN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGV4YW0uZW5kLFxuICAgICAgICAgICAgICAgICAgICBpZDogRXhhbS5Nb2RlbCsnOicrZXhhbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgYWxsRGF5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NlcyA9IF8uZmlsdGVyKENvdXJzZUNsYXNzLnRvQXJyYXkoanNvbkFyclsxXSksIChjbHo6Q291cnNlQ2xhc3MpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbHouSXNBdmFpbGFibGU7XG4gICAgICAgICAgICAgIH0pIDtcbiAgICAgICAgICAgIHZhciBjbGFzc0V2ZW50cyA9ICBfLm1hcCh0aGlzLmNsYXNzZXMsIChjbGF6ejpDb3Vyc2VDbGFzcyk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGNsYXp6Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBjbGF6ei5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBjbGF6ei5lbmQsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBDb3Vyc2VDbGFzcy5Nb2RlbCsnOicrY2xhenouaWQsXG4gICAgICAgICAgICAgICAgICAgIGFsbERheTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cyA9IHRoaXMuZXZlbnRzLmNvbmNhdChleGFtRXZlbnRzKS5jb25jYXQoY2xhc3NFdmVudHMpO1xuICAgICAgICAgICAgdGhpcy5hcHByb3ZhbFRpY2tldHMgPSAgVGlja2V0LnRvQXJyYXkoanNvbkFyclsyXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRXZlbnRDbGljayhldmVudCkge1xuICAgICAgICB2YXIgZXZlbnRJZCA9IGV2ZW50LmNhbEV2ZW50LmlkO1xuICAgICAgICB2YXIgbW9kZWwgPSBldmVudElkLnNwbGl0KCc6JylbMF07XG4gICAgICAgIHZhciBpZCA9IGV2ZW50SWQuc3BsaXQoJzonKVsxXTtcbiAgICAgICAgaWYgKG1vZGVsID09IEV4YW0uTW9kZWwpIHtcbiAgICAgICAgICAgIHZhciBleGFtID0gXy5maW5kKHRoaXMuZXhhbXMsIChleGFtKT0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhhbS5pZCA9PSBpZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5leGFtRGlhbG9nLnNob3coZXhhbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vZGVsID09IENvdXJzZUNsYXNzLk1vZGVsKSB7XG4gICAgICAgICAgICB2YXIgY2xhenogPSBfLmZpbmQodGhpcy5jbGFzc2VzLCAoY2xheno6Q291cnNlQ2xhc3MpPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGF6ei5pZCA9PSBpZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jbGFzc0RpYWxvZy5zaG93KGNsYXp6KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcHJvdmVUaWNrZXQodGlja2V0OiBUaWNrZXQpIHtcbiAgICAgICAgaWYgKHRpY2tldC5zdGF0dXMgPT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLndvcmtmbG93U2VydmljZS5hcHByb3ZlVGlja2V0KHRoaXMsIHRpY2tldC5pZCkuc3Vic2NyaWJlKCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mbyh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnVGlja2V0IGFwcHJvdmVkJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwcm92YWxUaWNrZXRzID0gXy5yZWplY3QodGhpcy5hcHByb3ZhbFRpY2tldHMsIChvYmo6VGlja2V0KT0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iai5pZCA9PSB0aWNrZXQuaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlamVjdFRpY2tldCh0aWNrZXQ6IFRpY2tldCkge1xuICAgICAgICBpZiAodGlja2V0LnN0YXR1cyA9PSAncGVuZGluZycpIHtcbiAgICAgICAgICAgIHRoaXMud29ya2Zsb3dTZXJ2aWNlLnJlamVjdFRpY2tldCh0aGlzLCB0aWNrZXQuaWQpLnN1YnNjcmliZSgoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZm8odGhpcy50cmFuc2xhdGVTZXJ2aWNlLmluc3RhbnQoJ1RpY2tldCByZWplY3RlZCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcHJvdmFsVGlja2V0cyA9IF8ucmVqZWN0KHRoaXMuYXBwcm92YWxUaWNrZXRzLCAob2JqOlRpY2tldCk9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmouaWQgPT0gdGlja2V0LmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4iXX0=
