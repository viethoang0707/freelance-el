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
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var base_component_1 = require("../base/base.component");
var BaseDialog = (function (_super) {
    __extends(BaseDialog, _super);
    function BaseDialog() {
        var _this = _super.call(this) || this;
        _this.onCreateCompleteReceiver = new Rx_1.Subject();
        _this.onUpdateCompleteReceiver = new Rx_1.Subject();
        _this.onShowReceiver = new Rx_1.Subject();
        _this.onHideReceiver = new Rx_1.Subject();
        _this.onCreateComplete = _this.onCreateCompleteReceiver.asObservable();
        _this.onUpdateComplete = _this.onUpdateCompleteReceiver.asObservable();
        _this.onShow = _this.onShowReceiver.asObservable();
        _this.onHide = _this.onHideReceiver.asObservable();
        _this.display = false;
        _this.object = {};
        return _this;
    }
    BaseDialog.prototype.show = function (object) {
        this.object = object;
        this.originalObject = {};
        Object.assign(this.originalObject, this.object);
        this.display = true;
        this.onShowReceiver.next(object);
    };
    BaseDialog.prototype.cancel = function () {
        Object.assign(this.object, this.originalObject);
        this.hide();
    };
    BaseDialog.prototype.hide = function () {
        this.display = false;
        this.onHideReceiver.next();
    };
    BaseDialog.prototype.save = function () {
        var _this = this;
        if (!this.object.id) {
            this.object.save(this).subscribe(function () {
                _this.hide();
                _this.onCreateCompleteReceiver.next(_this.object);
                _this.success('Object created successfully.');
            }, function () {
                _this.error('Permission denied');
            });
        }
        else {
            this.object.save(this).subscribe(function () {
                _this.onUpdateCompleteReceiver.next(_this.object);
                _this.success('Object saved successfully.');
                _this.hide();
            }, function () {
                _this.error('Permission denied');
            });
        }
    };
    return BaseDialog;
}(base_component_1.BaseComponent));
exports.BaseDialog = BaseDialog;
