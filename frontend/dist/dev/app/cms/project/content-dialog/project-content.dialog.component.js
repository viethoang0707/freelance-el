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
var http_1 = require("@angular/http");
var constants_1 = require("../../../shared/models/constants");
var ProjectContentDialog = (function (_super) {
    __extends(ProjectContentDialog, _super);
    function ProjectContentDialog(http, ngZone) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.ngZone = ngZone;
        _this.locale = constants_1.DEFAULT_DATE_LOCALE;
        return _this;
    }
    ProjectContentDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            if (object.start && object.end) {
                _this.rangeDates = [object.start, object.end];
            }
            var lang = _this.translateService.currentLang;
            _this.http.get("/assets/i18n/calendar." + lang + ".json")
                .subscribe(function (res) {
                _this.locale = res.json();
            });
        });
    };
    ProjectContentDialog.prototype.onDateSelect = function ($event) {
        if (this.rangeDates[0] && this.rangeDates[1]) {
            this.object.start = this.rangeDates[0];
            this.object.end = this.rangeDates[1];
        }
    };
    ProjectContentDialog.prototype.changeFile = function (event) {
        var file = event.files[0];
        this.uploadFile(file);
    };
    ProjectContentDialog.prototype.uploadFile = function (file) {
        var _this = this;
        this.fileApiService.upload(file, this.authService.LoginToken.cloud_id).subscribe(function (data) {
            if (data["result"]) {
                _this.ngZone.run(function () {
                    _this.object.file_url = data["url"];
                    _this.object.filename = data["filename"];
                });
            }
        }, function () {
        });
    };
    ProjectContentDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-content-dialog',
            templateUrl: 'project-content.dialog.component.html',
        }),
        __metadata("design:paramtypes", [http_1.Http, core_1.NgZone])
    ], ProjectContentDialog);
    return ProjectContentDialog;
}(base_dialog_1.BaseDialog));
exports.ProjectContentDialog = ProjectContentDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvcHJvamVjdC9jb250ZW50LWRpYWxvZy9wcm9qZWN0LWNvbnRlbnQuZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEU7QUFNMUUsMkVBQXlFO0FBR3pFLHNDQUErQztBQUMvQyw4REFBNEc7QUFVNUc7SUFBMEMsd0NBQW1CO0lBTXpELDhCQUFvQixJQUFVLEVBQVUsTUFBYztRQUF0RCxZQUNJLGlCQUFPLFNBRVY7UUFIbUIsVUFBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFlBQU0sR0FBTixNQUFNLENBQVE7UUFFbEQsS0FBSSxDQUFDLE1BQU0sR0FBRywrQkFBbUIsQ0FBQzs7SUFDdEMsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN4QixJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDNUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztZQUM3QyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywyQkFBeUIsSUFBSSxVQUFPLENBQUM7aUJBQ2xELFNBQVMsQ0FBQyxVQUFDLEdBQWE7Z0JBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkNBQVksR0FBWixVQUFhLE1BQU07UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLEtBQVU7UUFDakIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsSUFBSTtRQUFmLGlCQWFDO1FBWkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDNUUsVUFBQSxJQUFJO1lBQ0EsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2hCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUNaLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxFQUNEO1FBQ0EsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBakRRLG9CQUFvQjtRQUxoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsV0FBVyxFQUFFLHVDQUF1QztTQUN2RCxDQUFDO3lDQU80QixXQUFJLEVBQWtCLGFBQU07T0FON0Msb0JBQW9CLENBbURoQztJQUFELDJCQUFDO0NBbkRELEFBbURDLENBbkR5Qyx3QkFBVSxHQW1EbkQ7QUFuRFksb0RBQW9CIiwiZmlsZSI6ImFwcC9jbXMvcHJvamVjdC9jb250ZW50LWRpYWxvZy9wcm9qZWN0LWNvbnRlbnQuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCxWaWV3Q2hpbGQsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlfSAgICAgZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQmFzZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3Byb2plY3QubW9kZWwnO1xuaW1wb3J0IHsgUHJvamVjdFN1Ym1pc3Npb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9wcm9qZWN0LXN1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IERFRkFVTFRfREFURV9MT0NBTEUsIEVYQU1fTUVNQkVSX1JPTEUsIEVYQU1fTUVNQkVSX1NUQVRVUyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHtTZWxlY3RJdGVtLCBNZW51SXRlbX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFNlbGVjdFVzZXJzRGlhbG9nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvc2VsZWN0LXVzZXItZGlhbG9nL3NlbGVjdC11c2VyLWRpYWxvZy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAncHJvamVjdC1jb250ZW50LWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICdwcm9qZWN0LWNvbnRlbnQuZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbnRlbnREaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPFByb2plY3Q+IHtcblxuICAgIHByaXZhdGUgbG9jYWxlOmFueTtcbiAgICBwcml2YXRlIHByb2plY3RTdGF0dXM6IFNlbGVjdEl0ZW1bXTtcbiAgICBwcml2YXRlIHJhbmdlRGF0ZXM6IERhdGVbXTsgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSBERUZBVUxUX0RBVEVfTE9DQUxFO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm9uU2hvdy5zdWJzY3JpYmUob2JqZWN0ID0+IHtcbiAgICAgICAgICAgIGlmIChvYmplY3Quc3RhcnQgJiYgb2JqZWN0LmVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VEYXRlcyA9IFtvYmplY3Quc3RhcnQsb2JqZWN0LmVuZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGFuZyA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5jdXJyZW50TGFuZztcbiAgICAgICAgICAgIHRoaXMuaHR0cC5nZXQoYC9hc3NldHMvaTE4bi9jYWxlbmRhci4ke2xhbmd9Lmpzb25gKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzOiBSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlID0gcmVzLmpzb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTsgIFxuICAgIH1cblxuICAgIG9uRGF0ZVNlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VEYXRlc1swXSAmJiB0aGlzLnJhbmdlRGF0ZXNbMV0pIHtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnN0YXJ0ID0gdGhpcy5yYW5nZURhdGVzWzBdO1xuICAgICAgICAgICAgdGhpcy5vYmplY3QuZW5kID0gdGhpcy5yYW5nZURhdGVzWzFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlRmlsZShldmVudDogYW55KSB7XG4gICAgICAgIGxldCBmaWxlID0gZXZlbnQuZmlsZXNbMF07XG4gICAgICAgIHRoaXMudXBsb2FkRmlsZShmaWxlKTtcbiAgICB9XG5cbiAgICB1cGxvYWRGaWxlKGZpbGUpIHtcbiAgICAgICAgdGhpcy5maWxlQXBpU2VydmljZS51cGxvYWQoZmlsZSwgdGhpcy5hdXRoU2VydmljZS5Mb2dpblRva2VuLmNsb3VkX2lkKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtcInJlc3VsdFwiXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC5maWxlX3VybCA9IGRhdGFbXCJ1cmxcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC5maWxlbmFtZSA9IGRhdGFbXCJmaWxlbmFtZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbn1cblxuXG4iXX0=
