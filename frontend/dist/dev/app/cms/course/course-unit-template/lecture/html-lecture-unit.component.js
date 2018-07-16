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
var lecture_html_model_1 = require("../../../../shared/models/elearning/lecture-html.model");
var base_component_1 = require("../../../../shared/components/base/base.component");
var unit_decorator_1 = require("../unit.decorator");
var HtmlLectureCourseUnitComponent = (function (_super) {
    __extends(HtmlLectureCourseUnitComponent, _super);
    function HtmlLectureCourseUnitComponent() {
        var _this = _super.call(this) || this;
        _this.lecture = new lecture_html_model_1.HtmlLecture();
        return _this;
    }
    HtmlLectureCourseUnitComponent.prototype.render = function (unit) {
        var _this = this;
        this.unit = unit;
        lecture_html_model_1.HtmlLecture.byCourseUnit(this, unit.id).subscribe(function (lecture) {
            if (lecture)
                _this.lecture = lecture;
            else {
                var lecture = new lecture_html_model_1.HtmlLecture();
                lecture.unit_id = _this.unit.id;
                _this.lecture = lecture;
            }
        });
    };
    HtmlLectureCourseUnitComponent.prototype.saveEditor = function () {
        return Rx_1.Observable.forkJoin(this.unit.save(this), this.lecture.save(this));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HtmlLectureCourseUnitComponent.prototype, "mode", void 0);
    HtmlLectureCourseUnitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'html-lecture-course-unit',
            templateUrl: 'html-lecture-unit.component.html',
        }),
        unit_decorator_1.CourseUnitTemplate({
            type: 'html'
        }),
        __metadata("design:paramtypes", [])
    ], HtmlLectureCourseUnitComponent);
    return HtmlLectureCourseUnitComponent;
}(base_component_1.BaseComponent));
exports.HtmlLectureCourseUnitComponent = HtmlLectureCourseUnitComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL2xlY3R1cmUvaHRtbC1sZWN0dXJlLXVuaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCw4QkFBOEM7QUFHOUMsNkZBQXFGO0FBQ3JGLG9GQUFrRjtBQUlsRixvREFBdUQ7QUFhdkQ7SUFBb0Qsa0RBQWE7SUFNaEU7UUFBQSxZQUNDLGlCQUFPLFNBRVA7UUFEQSxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZ0NBQVcsRUFBRSxDQUFDOztJQUNsQyxDQUFDO0lBRUQsK0NBQU0sR0FBTixVQUFPLElBQWU7UUFBdEIsaUJBV0M7UUFWQSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixnQ0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQW1CO1lBQ3JFLElBQUksT0FBTztnQkFDVixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztpQkFDbkI7Z0JBQ0osSUFBSSxPQUFPLEdBQUcsSUFBSSxnQ0FBVyxFQUFFLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxPQUFPLEdBQUksT0FBTyxDQUFDO2FBQ3hCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsbURBQVUsR0FBVjtRQUNDLE9BQU8sZUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUF4QlE7UUFBUixZQUFLLEVBQUU7O2dFQUFNO0lBRkYsOEJBQThCO1FBUjFDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxXQUFXLEVBQUUsa0NBQWtDO1NBQy9DLENBQUM7UUFDRCxtQ0FBa0IsQ0FBQztZQUNuQixJQUFJLEVBQUMsTUFBTTtTQUNYLENBQUM7O09BQ1csOEJBQThCLENBNEIxQztJQUFELHFDQUFDO0NBNUJELEFBNEJDLENBNUJtRCw4QkFBYSxHQTRCaEU7QUE1Qlksd0VBQThCIiwiZmlsZSI6ImFwcC9jbXMvY291cnNlL2NvdXJzZS11bml0LXRlbXBsYXRlL2xlY3R1cmUvaHRtbC1sZWN0dXJlLXVuaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBRdWVzdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3F1ZXN0aW9uLm1vZGVsJztcbmltcG9ydCB7IFF1ZXN0aW9uT3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvb3B0aW9uLm1vZGVsJztcbmltcG9ydCB7IEh0bWxMZWN0dXJlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvbGVjdHVyZS1odG1sLm1vZGVsJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9iYXNlL2Jhc2UuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBERUZBVUxUX1BBU1NXT1JELCBHUk9VUF9DQVRFR09SWSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ291cnNlVW5pdFRlbXBsYXRlIH0gZnJvbSAnLi4vdW5pdC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgSUNvdXJzZVVuaXQgfSBmcm9tICcuLi91bml0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb3Vyc2VVbml0IH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvY291cnNlLXVuaXQubW9kZWwnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZGVscy9iYXNlLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHNlbGVjdG9yOiAnaHRtbC1sZWN0dXJlLWNvdXJzZS11bml0Jyxcblx0dGVtcGxhdGVVcmw6ICdodG1sLWxlY3R1cmUtdW5pdC5jb21wb25lbnQuaHRtbCcsXG59KVxuQENvdXJzZVVuaXRUZW1wbGF0ZSh7XG5cdHR5cGU6J2h0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEh0bWxMZWN0dXJlQ291cnNlVW5pdENvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBJQ291cnNlVW5pdHtcblxuXHRASW5wdXQoKSBtb2RlO1xuXHRwcml2YXRlIHVuaXQ6IENvdXJzZVVuaXQ7XG5cdHByaXZhdGUgbGVjdHVyZTogSHRtbExlY3R1cmU7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLmxlY3R1cmUgPSBuZXcgSHRtbExlY3R1cmUoKTtcblx0fVxuXG5cdHJlbmRlcih1bml0OkNvdXJzZVVuaXQpIHtcblx0XHR0aGlzLnVuaXQgPSB1bml0O1xuXHRcdEh0bWxMZWN0dXJlLmJ5Q291cnNlVW5pdCh0aGlzLCB1bml0LmlkKS5zdWJzY3JpYmUoKGxlY3R1cmU6SHRtbExlY3R1cmUpID0+IHtcblx0XHRcdGlmIChsZWN0dXJlKVxuXHRcdFx0XHR0aGlzLmxlY3R1cmUgPSBsZWN0dXJlO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHZhciBsZWN0dXJlID0gbmV3IEh0bWxMZWN0dXJlKCk7XG5cdFx0XHRcdGxlY3R1cmUudW5pdF9pZCA9IHRoaXMudW5pdC5pZDtcblx0XHRcdFx0dGhpcy5sZWN0dXJlID0gIGxlY3R1cmU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzYXZlRWRpdG9yKCk6T2JzZXJ2YWJsZTxhbnk+IHtcblx0XHRyZXR1cm4gT2JzZXJ2YWJsZS5mb3JrSm9pbih0aGlzLnVuaXQuc2F2ZSh0aGlzKSwgdGhpcy5sZWN0dXJlLnNhdmUodGhpcykpO1xuXHR9XG5cbn1cblxuIl19
