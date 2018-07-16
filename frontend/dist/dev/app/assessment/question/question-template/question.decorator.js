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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBS0k7UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsc0JBQWtCLDRCQUFRO2FBQTFCO1lBR0ksT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDOzs7T0FBQTtJQUVNLG1DQUFRLEdBQWYsVUFBZ0IsSUFBSSxFQUFFLElBQUk7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUU7SUFDNUIsQ0FBQztJQUVJLGlDQUFNLEdBQWIsVUFBYyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDUCx1QkFBQztBQUFELENBdkJBLEFBdUJDLElBQUE7QUF2QlksNENBQWdCO0FBMEI3QiwwQkFBa0MsSUFBUztJQUN2QyxPQUFPLFVBQUMsSUFBYztRQUNsQixnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUpELDRDQUlDIiwiZmlsZSI6ImFwcC9hc3Nlc3NtZW50L3F1ZXN0aW9uL3F1ZXN0aW9uLXRlbXBsYXRlL3F1ZXN0aW9uLmRlY29yYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBRdWVzdGlvblJlZ2lzdGVyXG57XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBRdWVzdGlvblJlZ2lzdGVyO1xuICAgIHByaXZhdGUgcmVnaXN0cnk6IGFueTtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5yZWdpc3RyeSA9IHt9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKClcbiAgICB7XG4gICAgICAgIC8vIERvIHlvdSBuZWVkIGFyZ3VtZW50cz8gTWFrZSBpdCBhIHJlZ3VsYXIgbWV0aG9kIGluc3RlYWQuXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgUXVlc3Rpb25SZWdpc3RlcigpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXIodHlwZSwgY3Rvcikge1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5W3R5cGVdPWN0b3IgO1xuICAgICAgfVxuXG4gICAgcHVibGljIGxvb2t1cCh0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W3R5cGVdO1xuICAgICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBRdWVzdGlvblRlbXBsYXRlKCBhcmdzOiBhbnkpIHtcbiAgICByZXR1cm4gKGN0b3I6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgIFF1ZXN0aW9uUmVnaXN0ZXIuSW5zdGFuY2UucmVnaXN0ZXIoIGFyZ3MudHlwZSxjdG9yKTtcbiAgICB9O1xufVxuXG4iXX0=
