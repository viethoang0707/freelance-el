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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var InterceptHttp = (function (_super) {
    __extends(InterceptHttp, _super);
    function InterceptHttp(backend, defaultOptions) {
        return _super.call(this, backend, defaultOptions) || this;
    }
    InterceptHttp.prototype.post = function (url, data, options) {
        return _super.prototype.post.call(this, url, data, options).catch(function (error) {
            if (error.status >= 400) {
                console.log(error);
            }
            return Observable_1.Observable.throw(error);
        });
    };
    return InterceptHttp;
}(http_1.Http));
exports.InterceptHttp = InterceptHttp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvaGVscGVycy9pbnRlcmNlcHQuaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQSxzQ0FBZ0g7QUFDaEgsOENBQTZDO0FBQzdDLG1DQUFpQztBQUNqQyxxQ0FBbUM7QUFHbkM7SUFBbUMsaUNBQUk7SUFFbkMsdUJBQVksT0FBbUIsRUFBRSxjQUE4QjtlQUMzRCxrQkFBTSxPQUFPLEVBQUUsY0FBYyxDQUFDO0lBQ2xDLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssR0FBVyxFQUFHLElBQVksRUFBRSxPQUF1QjtRQUNwRCxPQUFPLGlCQUFNLElBQUksWUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQWU7WUFDeEQsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFHLEdBQUcsRUFBRztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtZQUNELE9BQU8sdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQWZBLEFBZUMsQ0Fma0MsV0FBSSxHQWV0QztBQWZZLHNDQUFhIiwiZmlsZSI6ImFwcC9zaGFyZWQvaGVscGVycy9pbnRlcmNlcHQuaHR0cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBYSFJCYWNrZW5kLCBSZXF1ZXN0T3B0aW9ucywgUmVzcG9uc2UsIEh0dHAsIFJlcXVlc3RPcHRpb25zQXJncywgSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY2F0Y2gnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcblxuXG5leHBvcnQgY2xhc3MgSW50ZXJjZXB0SHR0cCBleHRlbmRzIEh0dHAge1xuXG4gICAgY29uc3RydWN0b3IoYmFja2VuZDogWEhSQmFja2VuZCwgZGVmYXVsdE9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKGJhY2tlbmQsIGRlZmF1bHRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwb3N0KHVybDogc3RyaW5nICwgZGF0YTogc3RyaW5nLCBvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnBvc3QodXJsLCBkYXRhLCBvcHRpb25zKS5jYXRjaCgoZXJyb3I6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID49NDAwICkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
