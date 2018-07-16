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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hbmFseXNpcy9yZXBvcnQvcmVwb3J0LmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBS0k7UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsc0JBQWtCLDBCQUFRO2FBQTFCO1lBR0ksT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDckUsQ0FBQzs7O09BQUE7SUFFTSxpQ0FBUSxHQUFmLFVBQWdCLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSTtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFFO0lBQ2pFLENBQUM7SUFFSSwrQkFBTSxHQUFiLFVBQWMsUUFBUTtRQUNsQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNQLHFCQUFDO0FBQUQsQ0F6QkEsQUF5QkMsSUFBQTtBQXpCWSx3Q0FBYztBQTRCM0IsZ0JBQXdCLElBQVM7SUFDN0IsT0FBTyxVQUFDLElBQWM7UUFDbEIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFKRCx3QkFJQyIsImZpbGUiOiJhcHAvYW5hbHlzaXMvcmVwb3J0L3JlcG9ydC5kZWNvcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUmVwb3J0UmVnaXN0ZXJcbntcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFJlcG9ydFJlZ2lzdGVyO1xuICAgIHByaXZhdGUgcmVnaXN0cnk6IGFueTtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5yZWdpc3RyeSA9IHt9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKClcbiAgICB7XG4gICAgICAgIC8vIERvIHlvdSBuZWVkIGFyZ3VtZW50cz8gTWFrZSBpdCBhIHJlZ3VsYXIgbWV0aG9kIGluc3RlYWQuXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgUmVwb3J0UmVnaXN0ZXIoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyKGNhdGVnb3J5LCB0aXRsZSwgY3Rvcikge1xuICAgICAgICBpZiAoIXRoaXMucmVnaXN0cnlbY2F0ZWdvcnldKVxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyeVtjYXRlZ29yeV0gPSBbXTtcbiAgICAgICAgdGhpcy5yZWdpc3RyeVtjYXRlZ29yeV0ucHVzaCh7dGl0bGU6IHRpdGxlLCBjb21wb25lbnQ6IGN0b3J9KSA7XG4gICAgICB9XG5cbiAgICBwdWJsaWMgbG9va3VwKGNhdGVnb3J5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W2NhdGVnb3J5XTtcbiAgICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gUmVwb3J0KCBhcmdzOiBhbnkpIHtcbiAgICByZXR1cm4gKGN0b3I6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgIFJlcG9ydFJlZ2lzdGVyLkluc3RhbmNlLnJlZ2lzdGVyKGFyZ3MuY2F0ZWdvcnksIGFyZ3MudGl0bGUsY3Rvcik7XG4gICAgfVxufVxuXG4iXX0=
