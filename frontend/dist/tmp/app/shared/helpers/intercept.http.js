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
