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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9jaGFydC9jaGFydC5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUtJO1FBRUksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHNCQUFrQix5QkFBUTthQUExQjtZQUdJLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7OztPQUFBO0lBRU0sZ0NBQVEsR0FBZixVQUFnQixLQUFLLEVBQUUsSUFBSTtRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUU7SUFDdkQsQ0FBQztJQUVJLCtCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNQLG9CQUFDO0FBQUQsQ0F2QkEsQUF1QkMsSUFBQTtBQXZCWSxzQ0FBYTtBQTBCMUIsZUFBdUIsSUFBUztJQUM1QixPQUFPLFVBQUMsSUFBYztRQUNsQixhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBRSxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQTtBQUNMLENBQUM7QUFKRCxzQkFJQyIsImZpbGUiOiJhcHAvYW5hbHlzaXMvY2hhcnQvY2hhcnQuZGVjb3JhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENoYXJ0UmVnaXN0ZXJcbntcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IENoYXJ0UmVnaXN0ZXI7XG4gICAgcHJpdmF0ZSByZWdpc3RyeTogYW55O1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5ID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKVxuICAgIHtcbiAgICAgICAgLy8gRG8geW91IG5lZWQgYXJndW1lbnRzPyBNYWtlIGl0IGEgcmVndWxhciBtZXRob2QgaW5zdGVhZC5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyBDaGFydFJlZ2lzdGVyKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlcih0aXRsZSwgY3Rvcikge1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5LnB1c2goe3RpdGxlOiB0aXRsZSwgY29tcG9uZW50OiBjdG9yfSkgO1xuICAgICAgfVxuXG4gICAgcHVibGljIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5O1xuICAgICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBDaGFydCggYXJnczogYW55KSB7XG4gICAgcmV0dXJuIChjdG9yOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICBDaGFydFJlZ2lzdGVyLkluc3RhbmNlLnJlZ2lzdGVyKCBhcmdzLnRpdGxlLGN0b3IpO1xuICAgIH1cbn1cblxuIl19
