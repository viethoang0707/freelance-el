"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_api_service_1 = require("../../services/api/model-api.service");
var account_api_service_1 = require("../../services/api/account-api.service");
var file_api_service_1 = require("../../services/api/file-api.service");
var auth_service_1 = require("../../services/auth.service");
var app_event_manager_service_1 = require("../../services/app-event-manager.service");
var messageservice_1 = require("primeng/components/common/messageservice");
var service_locator_1 = require("../../../service.locator");
var api_1 = require("primeng/api");
var core_1 = require("@ngx-translate/core");
var setting_service_1 = require("../../services/setting.service");
var workflow_service_1 = require("../../services/workflow.service");
var lms_profile_service_1 = require("../../services/lms-profile.service");
var BaseComponent = (function () {
    function BaseComponent() {
        var _this = this;
        this.apiService = service_locator_1.ServiceLocator.injector.get(model_api_service_1.ModelAPIService);
        this.fileApiService = service_locator_1.ServiceLocator.injector.get(file_api_service_1.FileAPIService);
        this.appEvent = service_locator_1.ServiceLocator.injector.get(app_event_manager_service_1.AppEventManager);
        this.accApiService = service_locator_1.ServiceLocator.injector.get(account_api_service_1.AccountAPIService);
        this.authService = service_locator_1.ServiceLocator.injector.get(auth_service_1.AuthService);
        this.messageService = service_locator_1.ServiceLocator.injector.get(messageservice_1.MessageService);
        this.confirmationService = service_locator_1.ServiceLocator.injector.get(api_1.ConfirmationService);
        this.translateService = service_locator_1.ServiceLocator.injector.get(core_1.TranslateService);
        this.settingService = service_locator_1.ServiceLocator.injector.get(setting_service_1.SettingService);
        this.workflowService = service_locator_1.ServiceLocator.injector.get(workflow_service_1.WorkflowService);
        this.lmsProfileService = service_locator_1.ServiceLocator.injector.get(lms_profile_service_1.LMSProfileService);
        this.appEvent.onStartHTTP.subscribe(function () {
            _this.loading = true;
        });
        this.appEvent.onFinishHTTP.subscribe(function () {
            _this.loading = false;
        });
    }
    Object.defineProperty(BaseComponent.prototype, "ContextUser", {
        get: function () {
            return this.authService.UserProfile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "ContextPermission", {
        get: function () {
            return this.authService.UserPermission;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.error = function (msg) {
        this.messageService.add({ severity: 'error', summary: this.translateService.instant('Error'), detail: this.translateService.instant(msg) });
    };
    BaseComponent.prototype.info = function (msg) {
        this.messageService.add({ severity: 'info', summary: this.translateService.instant('Info'), detail: this.translateService.instant(msg) });
    };
    BaseComponent.prototype.success = function (msg) {
        this.messageService.add({ severity: 'success', summary: this.translateService.instant('Success'), detail: this.translateService.instant(msg) });
    };
    BaseComponent.prototype.warn = function (msg) {
        this.messageService.add({ severity: 'warn', summary: this.translateService.instant('Warn'), detail: this.translateService.instant(msg) });
    };
    BaseComponent.prototype.confirm = function (prompt, callback) {
        this.confirmationService.confirm({
            message: this.translateService.instant(prompt),
            accept: function () {
                callback();
            }
        });
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
