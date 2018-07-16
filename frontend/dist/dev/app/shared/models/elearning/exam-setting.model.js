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
var base_model_1 = require("../base.model");
var decorator_1 = require("../decorator");
var search_read_api_1 = require("../../services/api/search-read.api");
var ExamSetting = (function (_super) {
    __extends(ExamSetting, _super);
    function ExamSetting() {
        var _this = _super.call(this) || this;
        _this.max_attempt = undefined;
        _this.allow_navigation = undefined;
        _this.take_picture_on_submit = undefined;
        _this.scale = undefined;
        _this.exam_id = undefined;
        return _this;
    }
    ExamSetting_1 = ExamSetting;
    ExamSetting.__api__byExam = function (examId) {
        return new search_read_api_1.SearchReadAPI(ExamSetting_1.Model, [], "[('exam_id','='," + examId + ")]");
    };
    ExamSetting.byExam = function (context, examId) {
        return ExamSetting_1.single(context, [], "[('exam_id','='," + examId + ")]");
    };
    var ExamSetting_1;
    ExamSetting = ExamSetting_1 = __decorate([
        decorator_1.Model('etraining.exam_setting'),
        __metadata("design:paramtypes", [])
    ], ExamSetting);
    return ExamSetting;
}(base_model_1.BaseModel));
exports.ExamSetting = ExamSetting;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9leGFtLXNldHRpbmcubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTBDO0FBRTFDLDBDQUFxQztBQUdyQyxzRUFBbUU7QUFHbkU7SUFBaUMsK0JBQVM7SUFHdEM7UUFBQSxZQUNJLGlCQUFPLFNBT2I7UUFMQSxLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUM7UUFDbEMsS0FBSSxDQUFDLEtBQUssR0FBSSxTQUFTLENBQUM7UUFDeEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7O0lBQ2hDLENBQUM7b0JBWFcsV0FBVztJQW1CYix5QkFBYSxHQUFwQixVQUFxQixNQUFjO1FBQy9CLE9BQU8sSUFBSSwrQkFBYSxDQUFDLGFBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLGtCQUFrQixHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBR00sa0JBQU0sR0FBYixVQUFlLE9BQWtCLEVBQUUsTUFBYztRQUM3QyxPQUFPLGFBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDekUsQ0FBQzs7SUExQlEsV0FBVztRQUR2QixpQkFBSyxDQUFDLHdCQUF3QixDQUFDOztPQUNuQixXQUFXLENBMkJ2QjtJQUFELGtCQUFDO0NBM0JELEFBMkJDLENBM0JnQyxzQkFBUyxHQTJCekM7QUEzQlksa0NBQVciLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tc2V0dGluZy5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCB9IGZyb20gJy4uL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi9kZWNvcmF0b3InO1xuaW1wb3J0IHsgQVBJQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NhY2hlLnV0aWxzJztcbmltcG9ydCB7IFNlYXJjaFJlYWRBUEkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkvc2VhcmNoLXJlYWQuYXBpJztcblxuQE1vZGVsKCdldHJhaW5pbmcuZXhhbV9zZXR0aW5nJylcbmV4cG9ydCBjbGFzcyBFeGFtU2V0dGluZyBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcblx0XHRcblx0XHR0aGlzLm1heF9hdHRlbXB0ID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuYWxsb3dfbmF2aWdhdGlvbiA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnRha2VfcGljdHVyZV9vbl9zdWJtaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmV4YW1faWQgPSB1bmRlZmluZWQ7XG5cdH1cblxuICAgIHNjYWxlOiBudW1iZXI7XG4gICAgZXhhbV9pZDogbnVtYmVyO1xuICAgIG1heF9hdHRlbXB0OiBudW1iZXI7XG4gICAgYWxsb3dfbmF2aWdhdGlvbjogYm9vbGVhbjtcbiAgICB0YWtlX3BpY3R1cmVfb25fc3VibWl0OiBib29sZWFuO1xuXG4gICAgc3RhdGljIF9fYXBpX19ieUV4YW0oZXhhbUlkOiBudW1iZXIpOiBTZWFyY2hSZWFkQVBJIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hSZWFkQVBJKEV4YW1TZXR0aW5nLk1vZGVsLCBbXSxcIlsoJ2V4YW1faWQnLCc9JyxcIitleGFtSWQrXCIpXVwiKTtcbiAgICB9XG4gICAgXG5cbiAgICBzdGF0aWMgYnlFeGFtKCBjb250ZXh0OkFQSUNvbnRleHQsIGV4YW1JZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIEV4YW1TZXR0aW5nLnNpbmdsZShjb250ZXh0LFtdLFwiWygnZXhhbV9pZCcsJz0nLFwiK2V4YW1JZCtcIildXCIpO1xuICAgIH1cbn1cbiJdfQ==
