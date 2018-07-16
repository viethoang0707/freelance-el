"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChartRegister = (function () {
    function ChartRegister() {
        this.registry = [];
    }
    Object.defineProperty(ChartRegister, "Instance", {
        get: function () {
            return this._instance || (this._instance = new ChartRegister());
        },
        enumerable: true,
        configurable: true
    });
    ChartRegister.prototype.register = function (title, ctor) {
        this.registry.push({ title: title, component: ctor });
    };
    ChartRegister.prototype.entries = function () {
        return this.registry;
    };
    return ChartRegister;
}());
exports.ChartRegister = ChartRegister;
function Chart(args) {
    return function (ctor) {
        ChartRegister.Instance.register(args.title, ctor);
    };
}
exports.Chart = Chart;
