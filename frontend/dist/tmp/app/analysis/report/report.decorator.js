"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReportRegister = (function () {
    function ReportRegister() {
        this.registry = {};
    }
    Object.defineProperty(ReportRegister, "Instance", {
        get: function () {
            return this._instance || (this._instance = new ReportRegister());
        },
        enumerable: true,
        configurable: true
    });
    ReportRegister.prototype.register = function (category, title, ctor) {
        if (!this.registry[category])
            this.registry[category] = [];
        this.registry[category].push({ title: title, component: ctor });
    };
    ReportRegister.prototype.lookup = function (category) {
        return this.registry[category];
    };
    return ReportRegister;
}());
exports.ReportRegister = ReportRegister;
function Report(args) {
    return function (ctor) {
        ReportRegister.Instance.register(args.category, args.title, ctor);
    };
}
exports.Report = Report;
