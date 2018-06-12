"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_service_1 = require("../../services/api.service");
var cloud_api_service_1 = require("../../services/cloud-api.service");
var auth_service_1 = require("../../services/auth.service");
var messageservice_1 = require("primeng/components/common/messageservice");
var service_locator_1 = require("../../../service.locator");
var api_1 = require("primeng/api");
var core_1 = require("@ngx-translate/core");
var setting_service_1 = require("../../services/setting.service");
var BaseComponent = (function () {
    function BaseComponent() {
        this.apiService = service_locator_1.ServiceLocator.injector.get(api_service_1.APIService);
        this.cloudApiService = service_locator_1.ServiceLocator.injector.get(cloud_api_service_1.CloudAPIService);
        this.authService = service_locator_1.ServiceLocator.injector.get(auth_service_1.AuthService);
        this.messageService = service_locator_1.ServiceLocator.injector.get(messageservice_1.MessageService);
        this.confirmationService = service_locator_1.ServiceLocator.injector.get(api_1.ConfirmationService);
        this.translateService = service_locator_1.ServiceLocator.injector.get(core_1.TranslateService);
        this.settingService = service_locator_1.ServiceLocator.injector.get(setting_service_1.SettingService);
    }
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
//# sourceMappingURL=base.component.js.map