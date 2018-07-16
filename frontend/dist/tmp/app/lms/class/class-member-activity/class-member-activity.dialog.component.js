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
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var course_member_activity_chart_component_1 = require("../../../analysis/chart/course-member-activity-chart/course-member-activity-chart.component");
var ClassMemberActivityDialog = (function (_super) {
    __extends(ClassMemberActivityDialog, _super);
    function ClassMemberActivityDialog() {
        return _super.call(this) || this;
    }
    ClassMemberActivityDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            _this.chart.drawChart(object, 30);
        });
    };
    __decorate([
        core_1.ViewChild(course_member_activity_chart_component_1.CourseMemberActivityChartComponent),
        __metadata("design:type", course_member_activity_chart_component_1.CourseMemberActivityChartComponent)
    ], ClassMemberActivityDialog.prototype, "chart", void 0);
    ClassMemberActivityDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'class-member-activity-dialog',
            template: "  <p-dialog header=\"{{'Course member activity'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"1000\" [responsive]=\"true\" [positionTop]=\"20\"     appendTo=\"body\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <div class=\"card\">     <div style=\"overflow:auto\">       <p-radioButton name=\"monitor_window\" label=\"{{'Last 7 days'|translate}}\" value=\"7\" inputId=\"opt1\" (onClick)=\"chart.drawChart(object,7)\"></p-radioButton>       <p-radioButton name=\"monitor_window\" label=\"{{'Last 14 days'|translate}}\" value=\"14\" inputId=\"opt2\" (onClick)=\"chart.drawChart(object,14)\"></p-radioButton>       <p-radioButton name=\"monitor_window\" label=\"{{'Last 30 days'|translate}}\" value=\"30\" inputId=\"opt3\" (onClick)=\"chart.drawChart(object,30)\"></p-radioButton>       <course-member-activity-chart></course-member-activity-chart>     </div>   </div>     <p-footer>       <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>     </p-footer>   </p-dialog>",
            styles: [".form-group{max-height:450px}.mb25{margin-bottom:25px}"],
        }),
        __metadata("design:paramtypes", [])
    ], ClassMemberActivityDialog);
    return ClassMemberActivityDialog;
}(base_dialog_1.BaseDialog));
exports.ClassMemberActivityDialog = ClassMemberActivityDialog;
