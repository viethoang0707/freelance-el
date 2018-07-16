"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../helpers/reflect");
var MethodRegister = (function () {
    function MethodRegister() {
        this.registry = {};
    }
    Object.defineProperty(MethodRegister, "Instance", {
        get: function () {
            return this._instance || (this._instance = new MethodRegister());
        },
        enumerable: true,
        configurable: true
    });
    MethodRegister.prototype.register = function (method, ctor) {
        this.registry[method] = ctor;
    };
    MethodRegister.prototype.lookup = function (method) {
        return this.registry[method];
    };
    MethodRegister.prototype.instantiateObject = function (method) {
        var ctor = this.registry[method];
        return ctor ? new ctor() : null;
    };
    return MethodRegister;
}());
exports.MethodRegister = MethodRegister;
exports.METHOD_METADATA_KEY = Symbol("method");
function Method(model) {
    return function (ctor) {
        MethodRegister.Instance.register(model, ctor);
        Reflect.defineMetadata(exports.METHOD_METADATA_KEY, model, ctor);
    };
}
exports.Method = Method;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUErQjtBQUUvQjtJQUtJO1FBRUksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHNCQUFrQiwwQkFBUTthQUExQjtZQUdJLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBRU0saUNBQVEsR0FBZixVQUFnQixNQUFNLEVBQUUsSUFBSTtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUksK0JBQU0sR0FBYixVQUFjLE1BQU07UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFSywwQ0FBaUIsR0FBeEIsVUFBeUIsTUFBTTtRQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUNQLHFCQUFDO0FBQUQsQ0E1QkEsQUE0QkMsSUFBQTtBQTVCWSx3Q0FBYztBQWdDZCxRQUFBLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVwRCxnQkFBd0IsS0FBYTtJQUNqQyxPQUFPLFVBQUMsSUFBYztRQUNsQixjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLGNBQWMsQ0FBQywyQkFBbUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQUxELHdCQUtDIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvYXBpL2RlY29yYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vaGVscGVycy9yZWZsZWN0JztcblxuZXhwb3J0IGNsYXNzIE1ldGhvZFJlZ2lzdGVyXG57XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNZXRob2RSZWdpc3RlcjtcbiAgICBwcml2YXRlIHJlZ2lzdHJ5OiBhbnk7XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMucmVnaXN0cnkgPSB7fTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpXG4gICAge1xuICAgICAgICAvLyBEbyB5b3UgbmVlZCBhcmd1bWVudHM/IE1ha2UgaXQgYSByZWd1bGFyIG1ldGhvZCBpbnN0ZWFkLlxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IE1ldGhvZFJlZ2lzdGVyKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlcihtZXRob2QsIGN0b3IpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RyeVttZXRob2RdID0gY3RvcjtcbiAgICAgIH1cblxuICAgIHB1YmxpYyBsb29rdXAobWV0aG9kKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W21ldGhvZF07XG4gICAgICB9XG5cbiAgICAgcHVibGljIGluc3RhbnRpYXRlT2JqZWN0KG1ldGhvZCk6YW55IHtcbiAgICAgICAgdmFyIGN0b3IgPSB0aGlzLnJlZ2lzdHJ5W21ldGhvZF07XG4gICAgICAgIHJldHVybiBjdG9yID8gbmV3IGN0b3IoKSA6IG51bGw7XG4gICAgICB9XG59XG5cblxuLyogTW9kZWwgZGVjb3JhdG9yICovXG5leHBvcnQgY29uc3QgTUVUSE9EX01FVEFEQVRBX0tFWSA9IFN5bWJvbChcIm1ldGhvZFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIE1ldGhvZCggbW9kZWw6IHN0cmluZykge1xuICAgIHJldHVybiAoY3RvcjogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgTWV0aG9kUmVnaXN0ZXIuSW5zdGFuY2UucmVnaXN0ZXIobW9kZWwsY3Rvcik7XG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoTUVUSE9EX01FVEFEQVRBX0tFWSwgbW9kZWwsIGN0b3IpO1xuICAgIH1cbn0iXX0=
