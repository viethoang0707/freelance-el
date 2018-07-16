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
var ImageBase64Pipe = (function () {
    function ImageBase64Pipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ImageBase64Pipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return value ? this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64," + value) : "";
    };
    ImageBase64Pipe = __decorate([
        core_1.Pipe({ name: 'imageBase64', pure: true }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], ImageBase64Pipe);
    return ImageBase64Pipe;
}());
exports.ImageBase64Pipe = ImageBase64Pipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvaW1hZ2UtYmFzZTY0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0Q7QUFDcEQsOERBQXlEO0FBR3pEO0lBQ0MseUJBQXFCLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDO0lBQy9DLG1DQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsSUFBa0I7UUFBbEIscUJBQUEsRUFBQSxXQUFrQjtRQUN0QyxPQUFPLEtBQUssQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsR0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFBO0lBQ3ZGLENBQUM7SUFKVSxlQUFlO1FBRDNCLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO3lDQUVWLCtCQUFZO09BRGhDLGVBQWUsQ0FLM0I7SUFBRCxzQkFBQztDQUxELEFBS0MsSUFBQTtBQUxZLDBDQUFlIiwiZmlsZSI6ImFwcC9zaGFyZWQvcGlwZXMvaW1hZ2UtYmFzZTY0LnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQFBpcGUoeyBuYW1lOiAnaW1hZ2VCYXNlNjQnLCAgcHVyZTogdHJ1ZSB9KVxuZXhwb3J0IGNsYXNzIEltYWdlQmFzZTY0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXHRjb25zdHJ1Y3RvciggcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcil7IH1cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M6IGFueVtdID0gbnVsbCk6IGFueSB7XG4gICAgcmV0dXJuIHZhbHVlP3RoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsXCIrdmFsdWUpOlwiXCJcbiAgfVxufVxuXG4iXX0=
