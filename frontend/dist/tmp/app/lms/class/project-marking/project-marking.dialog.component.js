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
var ProjectMarkingDialog = (function (_super) {
    __extends(ProjectMarkingDialog, _super);
    function ProjectMarkingDialog() {
        var _this = _super.call(this) || this;
        _this.display = false;
        return _this;
    }
    ProjectMarkingDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-marking-dialog',
            template: "<p-dialog header=\"{{'Marking project' | translate}}\" [(visible)]=\"display\" modal=\"true\" width=\"960\" [responsive]=\"true\" appendTo=\"body\">   <div class=\"spinner\" [hidden]=\"!loading\"></div>   <form novalidate (ngSubmit)=\"f.form.valid && save()\" #f=\"ngForm\" autocomplete=\"off\">     <div class=\"ui-g-6\">       <span>           {{'Submit date'|translate}} :{{object.date_submit | date : \"dd/MM/yyyy\"}}         </span>     </div>     <div class=\"ui-g-6\">       <a href=\"{{object.file_url}}\" target=\"_blank\" >{{object.filename}}</a>     </div>     <div class=\"ui-g-6\">       <label>{{'Score'|translate}}</label>       <p-spinner size=\"30\" [(ngModel)]=\"object.score\" [min]=\"0\"  name=\"score\" ></p-spinner>     </div>   </form>   <p-footer>     <button type=\"button\" pButton icon=\"fa-check\" label=\"{{'Save'|translate}}\" (click)=\"f.ngSubmit.emit()\"></button>     <button type=\"button\" pButton icon=\"fa-close\" (click)=\"hide()\" label=\"{{'Close'|translate}}\"></button>   </p-footer> </p-dialog>",
        }),
        __metadata("design:paramtypes", [])
    ], ProjectMarkingDialog);
    return ProjectMarkingDialog;
}(base_dialog_1.BaseDialog));
exports.ProjectMarkingDialog = ProjectMarkingDialog;
