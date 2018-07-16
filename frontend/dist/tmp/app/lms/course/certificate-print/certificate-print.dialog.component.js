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
var CertificatePrintDialog = (function (_super) {
    __extends(CertificatePrintDialog, _super);
    function CertificatePrintDialog() {
        return _super.call(this) || this;
    }
    CertificatePrintDialog.prototype.print = function () {
        var printContents, popupWin;
        printContents = this.printSection.nativeElement.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n          <html>\n            <head>\n                <title>Exam paper</title>\n                $(PRINT_DIALOG_STYLE)\n            </head>\n            <body onload=\"window.print();window.close()\">" + printContents + "</body>\n          </html>");
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
            template: "<p-dialog header=\"{{'Certificate'|translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"718\" height=\"100%\" [responsive]=\"true\" appendTo=\"body\">   <p-scrollPanel [style]=\"{width: '100%', height: '480px'}\">     <div class=\"spinner\" [hidden]=\"!loading\"></div>     <img src=\"assets/images/certificate.jpg\" height=\"480px\">     <div class=\"certificate-print\">       <p class=\"member-name\">{{object.member_name}}</p>       <div class=\"summary\">       \t<p>Congratulation you did finish <strong>{{object.name}}</strong> course!</p>       \t<p>{{'Ranking: '|translate}} <strong>{{object.qualification}}</strong></p>       \t<span>{{object.summary}}</span>       </div>       <p class=\"date\">{{object.date_issue | date : \"dd/MM/yyyy\"}}</p>     </div>   </p-scrollPanel>   <p-footer>     <button type=\"button\" pButton icon=\"ui-icon-print\" (click)=\"print()\" label=\"{{'Print'|translate}}\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer>    </p-dialog>",
            styles: [".name-c,.name-e{text-align:center;text-transform:uppercase;font-weight:700}.bold,.label{font-weight:700}.title{text-transform:uppercase}.ins{text-indent:50px}.ans-print{margin-bottom:20px}.date{position:absolute;top:390px;left:90px}.member-name{position:absolute;top:185px;left:140px;font-size:32px;font-family:Mr De Haviland;margin:0}.summary{position:absolute;top:225px;left:20px;text-align:center}"],
        }),
        __metadata("design:paramtypes", [])
    ], CertificatePrintDialog);
    return CertificatePrintDialog;
}(base_dialog_1.BaseDialog));
exports.CertificatePrintDialog = CertificatePrintDialog;
