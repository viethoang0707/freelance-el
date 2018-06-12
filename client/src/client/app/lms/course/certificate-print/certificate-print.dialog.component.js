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
require("rxjs/add/observable/timer");
var CertificatePrintDialog = (function (_super) {
    __extends(CertificatePrintDialog, _super);
    function CertificatePrintDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        return _this;
    }
    CertificatePrintDialog.prototype.show = function (certificate) {
        this.certificate = certificate;
        this.display = true;
    };
    CertificatePrintDialog.prototype.hide = function () {
        this.display = false;
    };
    CertificatePrintDialog.prototype.print = function () {
        var printContents, popupWin;
        printContents = this.printSection.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n          <html>\n            <head>\n                <title>Exam paper</title>\n                <style>\n                  //........Customized style.......\n                    .header{\n                    }\n                    .name-c{\n                        float: left;\n                        width: 55%;\n                    }\n\n                    .name-e{\n                        height: 40px;\n                    }\n\n                    .name-c, .name-e{\n                        text-align: center; \n                        text-transform: uppercase; \n                        font-weight: bold; \n                        margin-bottom: 10px;\n                    }\n                    \n                    .label{\n                        float: left;\n                        font-weight: bold;\n                        \n                    }\n\n                    .title{\n                        text-transform: uppercase;\n                        float: left;\n                        margin-right:40px;\n                    }\n\n                    .ins p{\n                        text-indent: 25px;\n                    }\n\n                    .f-print{\n                        border:none;\n                        padding: 0;\n                        margin-top: -10px;\n                    }\n                    \n                    .f-print ul{\n                        padding-left: 10px;\n                    }\n\n                    .l-question{\n                        padding-bottom: 0;\n                        margin-bottom: 0;\n                    }\n\n                    .l-question li{\n                        list-style-type: decimal;\n                    }\n\n                    .bold{\n                        font-weight: bold;\n                    }\n\n                    .student{\n                        float: left;\n                        margin-right:100px;\n                    }\n\n                    .radio{\n                        float: left;\n                        padding-right: 5px;\n                    }\n                </style>\n            </head>\n            <body onload=\"window.print();window.close()\">" + printContents + "</body>\n          </html>");
        popupWin.document.close();
    };
    __decorate([
        core_1.ViewChild('printSection'),
        __metadata("design:type", Object)
    ], CertificatePrintDialog.prototype, "printSection", void 0);
    CertificatePrintDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'certificate-print-dialog',
            templateUrl: 'certificate-print.dialog.component.html',
            styleUrls: ['certificate-print.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CertificatePrintDialog);
    return CertificatePrintDialog;
}(base_component_1.BaseComponent));
exports.CertificatePrintDialog = CertificatePrintDialog;
//# sourceMappingURL=certificate-print.dialog.component.js.map