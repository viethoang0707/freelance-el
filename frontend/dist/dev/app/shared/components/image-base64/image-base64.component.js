"use strict";
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
var platform_browser_1 = require("@angular/platform-browser");
var ImageBase64Component = (function () {
    function ImageBase64Component(element, renderer, sanitizer) {
        this.element = element;
        this.renderer = renderer;
        this.sanitizer = sanitizer;
        this.disabled = false;
        this.src64Change = new core_1.EventEmitter();
        this.showControl = false;
    }
    ImageBase64Component.prototype.changeListner = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var srcEncode = btoa(e.target.result);
            _this.src64Change.emit(srcEncode);
        };
        reader.readAsBinaryString(event.files[0]);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageBase64Component.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ImageBase64Component.prototype, "src64", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ImageBase64Component.prototype, "src64Change", void 0);
    ImageBase64Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'image-base64',
            templateUrl: 'image-base64.component.html',
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, platform_browser_1.DomSanitizer])
    ], ImageBase64Component);
    return ImageBase64Component;
}());
exports.ImageBase64Component = ImageBase64Component;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy9pbWFnZS1iYXNlNjQvaW1hZ2UtYmFzZTY0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF1SDtBQUN2SCw4REFBeUQ7QUFTekQ7SUFDSSw4QkFBb0IsT0FBbUIsRUFBVSxRQUFrQixFQUFVLFNBQXVCO1FBQWhGLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUczRixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGdCQUFXLEdBQXlCLElBQUksbUJBQVksRUFBVSxDQUFDO1FBSnJFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFPRCw0Q0FBYSxHQUFiLFVBQWMsS0FBVTtRQUF4QixpQkFTQztRQVJHLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFFOUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFDLENBQU07WUFDbkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBZlE7UUFBUixZQUFLLEVBQUU7OzBEQUFrQjtJQUNqQjtRQUFSLFlBQUssRUFBRTs7dURBQWU7SUFDYjtRQUFULGFBQU0sRUFBRTtrQ0FBYyxtQkFBWTs2REFBc0M7SUFOaEUsb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDZCQUE2QjtTQUM3QyxDQUFDO3lDQUcrQixpQkFBVSxFQUFvQixlQUFRLEVBQXFCLCtCQUFZO09BRDNGLG9CQUFvQixDQXNCaEM7SUFBRCwyQkFBQztDQXRCRCxBQXNCQyxJQUFBO0FBdEJZLG9EQUFvQiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvaW1hZ2UtYmFzZTY0L2ltYWdlLWJhc2U2NC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdpbWFnZS1iYXNlNjQnLFxuICAgIHRlbXBsYXRlVXJsOiAnaW1hZ2UtYmFzZTY0LmNvbXBvbmVudC5odG1sJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBJbWFnZUJhc2U2NENvbXBvbmVudCAge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsICkge1xuICAgICAgICB0aGlzLnNob3dDb250cm9sID0gZmFsc2U7XG4gICAgfVxuICAgIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgc3JjNjQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgc3JjNjRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICBzaG93Q29udHJvbDogYm9vbGVhbjtcblxuICAgIGNoYW5nZUxpc3RuZXIoZXZlbnQ6IGFueSkge1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gKGU6IGFueSk9PiB7XG4gICAgICAgICAgICB2YXIgc3JjRW5jb2RlID0gYnRvYShlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgdGhpcy5zcmM2NENoYW5nZS5lbWl0KHNyY0VuY29kZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyhldmVudC5maWxlc1swXSk7XG4gICAgfVxuXG4gICBcbn1cbiJdfQ==
