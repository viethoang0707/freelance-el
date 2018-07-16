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
            templateUrl: 'certificate-print.dialog.component.html',
            styleUrls: ['certificate-print.dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], CertificatePrintDialog);
    return CertificatePrintDialog;
}(base_dialog_1.BaseDialog));
exports.CertificatePrintDialog = CertificatePrintDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sbXMvY291cnNlL2NlcnRpZmljYXRlLXByaW50L2NlcnRpZmljYXRlLXByaW50LmRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXVIO0FBbUJ2SCwyRUFBeUU7QUFRekU7SUFBNEMsMENBQXVCO0lBSy9EO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBR0Qsc0NBQUssR0FBTDtRQUNJLElBQUksYUFBYSxFQUFFLFFBQVEsQ0FBQztRQUM1QixhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQzFELFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUscUNBQXFDLENBQUMsQ0FBQztRQUM1RSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLCtNQU0yQixhQUFhLCtCQUN0RCxDQUNULENBQUM7UUFDRixRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLENBQUM7SUF0QjBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDOztnRUFBYztJQUgvQixzQkFBc0I7UUFObEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFdBQVcsRUFBRSx5Q0FBeUM7WUFDdEQsU0FBUyxFQUFFLENBQUMsd0NBQXdDLENBQUM7U0FDeEQsQ0FBQzs7T0FDVyxzQkFBc0IsQ0EwQmxDO0lBQUQsNkJBQUM7Q0ExQkQsQUEwQkMsQ0ExQjJDLHdCQUFVLEdBMEJyRDtBQTFCWSx3REFBc0IiLCJmaWxlIjoiYXBwL2xtcy9jb3Vyc2UvY2VydGlmaWNhdGUtcHJpbnQvY2VydGlmaWNhdGUtcHJpbnQuZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vZGVsQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkvbW9kZWwtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXhhbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0ubW9kZWwnO1xuaW1wb3J0IHsgRXhhbVF1ZXN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvZXhhbS1xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDZXJ0aWZpY2F0ZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2NvdXJzZS1jZXJ0aWZpY2F0ZS5tb2RlbCc7XG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY2xvdWQvdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgU3VibWlzc2lvbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL3N1Ym1pc3Npb24ubW9kZWwnO1xuaW1wb3J0IHsgUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvbW9kZWxzL2VsZWFybmluZy9xdWVzdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBRdWVzdGlvblNoZWV0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZGVscy9lbGVhcm5pbmcvcXVlc3Rpb24tc2hlZXQubW9kZWwnO1xuaW1wb3J0IHsgRXhhbU1lbWJlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvZWxlYXJuaW5nL2V4YW0tbWVtYmVyLm1vZGVsJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBRdWVzdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uL2Fzc2Vzc21lbnQvcXVlc3Rpb24vcXVlc3Rpb24tdGVtcGxhdGUvcXVlc3Rpb24tY29udGFpbmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBJUXVlc3Rpb24gfSBmcm9tICcuLi8uLi8uLi9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBRdWVzdGlvblJlZ2lzdGVyIH0gZnJvbSAnLi4vLi4vLi4vYXNzZXNzbWVudC9xdWVzdGlvbi9xdWVzdGlvbi10ZW1wbGF0ZS9xdWVzdGlvbi5kZWNvcmF0b3InO1xuaW1wb3J0IHsgR1JPVVBfQ0FURUdPUlksIFBSSU5UX0RJQUxPR19TVFlMRSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2RlbHMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgQmFzZURpYWxvZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Jhc2UvYmFzZS5kaWFsb2cnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnY2VydGlmaWNhdGUtcHJpbnQtZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2NlcnRpZmljYXRlLXByaW50LmRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJ2NlcnRpZmljYXRlLXByaW50LmRpYWxvZy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENlcnRpZmljYXRlUHJpbnREaWFsb2cgZXh0ZW5kcyBCYXNlRGlhbG9nPENlcnRpZmljYXRlPiB7XG4gICAgXG5cbiAgICBAVmlld0NoaWxkKCdwcmludFNlY3Rpb24nKSBwcmludFNlY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cblxuICAgIHByaW50KCkge1xuICAgICAgICBsZXQgcHJpbnRDb250ZW50cywgcG9wdXBXaW47XG4gICAgICAgIHByaW50Q29udGVudHMgPSB0aGlzLnByaW50U2VjdGlvbi5uYXRpdmVFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgcG9wdXBXaW4gPSB3aW5kb3cub3BlbignJywgJ19ibGFuaycsICd0b3A9MCxsZWZ0PTAsaGVpZ2h0PTEwMCUsd2lkdGg9YXV0bycpO1xuICAgICAgICBwb3B1cFdpbi5kb2N1bWVudC5vcGVuKCk7XG4gICAgICAgIHBvcHVwV2luLmRvY3VtZW50LndyaXRlKGBcbiAgICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgIDx0aXRsZT5FeGFtIHBhcGVyPC90aXRsZT5cbiAgICAgICAgICAgICAgICAkKFBSSU5UX0RJQUxPR19TVFlMRSlcbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5IG9ubG9hZD1cIndpbmRvdy5wcmludCgpO3dpbmRvdy5jbG9zZSgpXCI+JHtwcmludENvbnRlbnRzfTwvYm9keT5cbiAgICAgICAgICA8L2h0bWw+YFxuICAgICAgICApO1xuICAgICAgICBwb3B1cFdpbi5kb2N1bWVudC5jbG9zZSgpO1xuICAgIH1cbn1cblxuXG5cbiJdfQ==
