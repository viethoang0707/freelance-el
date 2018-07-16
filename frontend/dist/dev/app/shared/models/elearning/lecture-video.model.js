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
var VideoLecture = (function (_super) {
    __extends(VideoLecture, _super);
    function VideoLecture() {
        var _this = _super.call(this) || this;
        _this.transcript = undefined;
        _this.unit_id = undefined;
        _this.video_id = undefined;
        _this.video_url = undefined;
        return _this;
    }
    VideoLecture_1 = VideoLecture;
    VideoLecture.__api__byCourseUnit = function (unitId) {
        return new search_read_api_1.SearchReadAPI(VideoLecture_1.Model, [], "[('unit_id','='," + unitId + ")]");
    };
    VideoLecture.byCourseUnit = function (context, unitId) {
        return VideoLecture_1.single(context, [], "[('unit_id','='," + unitId + ")]");
    };
    var VideoLecture_1;
    VideoLecture = VideoLecture_1 = __decorate([
        decorator_1.Model('etraining.video_lecture'),
        __metadata("design:paramtypes", [])
    ], VideoLecture);
    return VideoLecture;
}(base_model_1.BaseModel));
exports.VideoLecture = VideoLecture;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9sZWN0dXJlLXZpZGVvLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEwQztBQUUxQywwQ0FBcUM7QUFFckMsc0VBQW1FO0FBR25FO0lBQWtDLGdDQUFTO0lBR3ZDO1FBQUEsWUFDSSxpQkFBTyxTQU1WO1FBSkcsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0lBQy9CLENBQUM7cUJBVlEsWUFBWTtJQWlCZCxnQ0FBbUIsR0FBMUIsVUFBMkIsTUFBYTtRQUNwQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxjQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVNLHlCQUFZLEdBQW5CLFVBQW9CLE9BQWtCLEVBQUUsTUFBYztRQUNsRCxPQUFPLGNBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxrQkFBa0IsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7SUF2QlEsWUFBWTtRQUR4QixpQkFBSyxDQUFDLHlCQUF5QixDQUFDOztPQUNwQixZQUFZLENBd0J4QjtJQUFELG1CQUFDO0NBeEJELEFBd0JDLENBeEJpQyxzQkFBUyxHQXdCMUM7QUF4Qlksb0NBQVkiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2xlY3R1cmUtdmlkZW8ubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvY2FjaGUudXRpbHMnO1xuaW1wb3J0IHsgQmFzZU1vZGVsIH0gZnJvbSAnLi4vYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uL2RlY29yYXRvcic7XG5pbXBvcnQgeyBBUElDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBTZWFyY2hSZWFkQVBJIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpL3NlYXJjaC1yZWFkLmFwaSc7XG5cbkBNb2RlbCgnZXRyYWluaW5nLnZpZGVvX2xlY3R1cmUnKVxuZXhwb3J0IGNsYXNzIFZpZGVvTGVjdHVyZSBleHRlbmRzIEJhc2VNb2RlbHtcblxuICAgIC8vIERlZmF1bHQgY29uc3RydWN0b3Igd2lsbCBiZSBjYWxsZWQgYnkgbWFwcGVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudHJhbnNjcmlwdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51bml0X2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZGVvX2lkID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZGVvX3VybCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2aWRlb19pZDogbnVtYmVyO1xuICAgIHRyYW5zY3JpcHQ6IHN0cmluZztcbiAgICB2aWRlb191cmw6IHN0cmluZztcbiAgICB1bml0X2lkOiBudW1iZXI7XG5cbiAgICBzdGF0aWMgX19hcGlfX2J5Q291cnNlVW5pdCh1bml0SWQ6bnVtYmVyKTogU2VhcmNoUmVhZEFQSSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoUmVhZEFQSShWaWRlb0xlY3R1cmUuTW9kZWwsIFtdLFwiWygndW5pdF9pZCcsJz0nLFwiK3VuaXRJZCtcIildXCIpO1xuICAgIH1cbiAgICBcbiAgICBzdGF0aWMgYnlDb3Vyc2VVbml0KGNvbnRleHQ6QVBJQ29udGV4dCwgdW5pdElkOiBudW1iZXIpOk9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBWaWRlb0xlY3R1cmUuc2luZ2xlKGNvbnRleHQsW10sXCJbKCd1bml0X2lkJywnPScsXCIrdW5pdElkK1wiKV1cIik7XG4gICAgfVxufVxuIl19
