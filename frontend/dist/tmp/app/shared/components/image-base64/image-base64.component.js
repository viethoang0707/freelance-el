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
            template: "<div align='center'> \t<div style=\"width:'50%'\"> \t\t<p-fileUpload name=\"logo\" mode=\"basic\" chooseLabel=\"{{'Select file'|translate}}'\" (onSelect)=\"changeListner($event)\" accept=\"image/*\" maxFileSize=\"1024*16\" showUploadButton=\"false\" >\t \t\t</p-fileUpload> \t</div> \t<img width=\"100%\" height=\"100%\" [src]='src64?sanitizer.bypassSecurityTrustUrl(\"data:image/png;base64,\"+src64):\"assets/images/slider/slider-2.png\"' library=\"serenity-layout\" > \t </div>",
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, platform_browser_1.DomSanitizer])
    ], ImageBase64Component);
    return ImageBase64Component;
}());
exports.ImageBase64Component = ImageBase64Component;
