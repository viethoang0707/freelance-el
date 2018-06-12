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
var group_model_1 = require("../../../shared/models/elearning/group.model");
var course_member_model_1 = require("../../../shared/models/elearning/course-member.model");
var course_certificate_model_1 = require("../../../shared/models/elearning/course-certificate.model");
var base_dialog_1 = require("../../../shared/components/base/base.dialog");
var _ = require("underscore");
var tree_utils_1 = require("../../../shared/helpers/tree.utils");
var constants_1 = require("../../../shared/models/constants");
var certificate_print_dialog_component_1 = require("../../../lms/course/certificate-print/certificate-print.dialog.component");
var base_model_1 = require("../../../shared/models/base.model");
var UserProfileDialog = (function (_super) {
    __extends(UserProfileDialog, _super);
    function UserProfileDialog() {
        var _this = _super.call(this) || this;
        _this.COURSE_MEMBER_ENROLL_STATUS = constants_1.COURSE_MEMBER_ENROLL_STATUS;
        _this.treeUtils = new tree_utils_1.TreeUtils();
        _this.members = [];
        _this.currentUser = _this.authService.UserProfile;
        return _this;
    }
    UserProfileDialog.prototype.nodeSelect = function (event) {
        if (this.selectedNode) {
            this.object.group_id = this.selectedNode.data.id;
        }
    };
    UserProfileDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.onShow.subscribe(function (object) {
            base_model_1.BaseModel
                .bulk_search(_this, group_model_1.Group.__api__listUserGroup(), course_member_model_1.CourseMember.__api__listByUser(object.id), course_certificate_model_1.Certificate.__api__listByUser(object.id))
                .subscribe(function (jsonArr) {
                _this.groups = group_model_1.Group.toArray(jsonArr[0]);
                _this.members = course_member_model_1.CourseMember.toArray(jsonArr[1]);
                _this.certificates = course_certificate_model_1.Certificate.toArray(jsonArr[2]);
                _this.displayGroupTree();
                _this.displayCourseHistory();
            });
        });
    };
    UserProfileDialog.prototype.displayGroupTree = function () {
        this.tree = this.treeUtils.buildGroupTree(this.groups);
        if (this.object.group_id) {
            this.selectedNode = this.treeUtils.findTreeNode(this.tree, this.object.group_id);
        }
    };
    UserProfileDialog.prototype.displayCourseHistory = function () {
        var _this = this;
        this.members = _.filter(this.members, function (member) {
            return member.role == 'student';
        });
        _.each(this.members, function (member) {
            member["certificate"] = _.find(_this.certificates, function (cert) {
                return cert.member_id == member.id;
            });
        });
    };
    UserProfileDialog.prototype.printCertificate = function (certificate) {
        this.certPrintDialog.show(certificate);
    };
    __decorate([
        core_1.ViewChild(certificate_print_dialog_component_1.CertificatePrintDialog),
        __metadata("design:type", certificate_print_dialog_component_1.CertificatePrintDialog)
    ], UserProfileDialog.prototype, "certPrintDialog", void 0);
    UserProfileDialog = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-profile-dialog',
            templateUrl: 'profile-dialog.component.html',
            styleUrls: ['profile-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], UserProfileDialog);
    return UserProfileDialog;
}(base_dialog_1.BaseDialog));
exports.UserProfileDialog = UserProfileDialog;
//# sourceMappingURL=profile-dialog.component.js.map