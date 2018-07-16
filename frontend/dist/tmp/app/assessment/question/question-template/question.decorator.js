"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionRegister = (function () {
    function QuestionRegister() {
        this.registry = {};
    }
    Object.defineProperty(QuestionRegister, "Instance", {
        get: function () {
            return this._instance || (this._instance = new QuestionRegister());
        },
        enumerable: true,
        configurable: true
    });
    QuestionRegister.prototype.register = function (type, ctor) {
        this.registry[type] = ctor;
    };
    QuestionRegister.prototype.lookup = function (type) {
        return this.registry[type];
    };
    return QuestionRegister;
}());
exports.QuestionRegister = QuestionRegister;
function QuestionTemplate(args) {
    return function (ctor) {
        QuestionRegister.Instance.register(args.type, ctor);
    };
}
exports.QuestionTemplate = QuestionTemplate;
