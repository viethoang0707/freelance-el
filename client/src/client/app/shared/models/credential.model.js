"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cloud_account_model_1 = require("./cloud/cloud-account.model");
var Credential = (function () {
    function Credential() {
        this.username = undefined;
        this.password = undefined;
        this.cloud_account = new cloud_account_model_1.CloudAccount();
    }
    return Credential;
}());
exports.Credential = Credential;
//# sourceMappingURL=credential.model.js.map