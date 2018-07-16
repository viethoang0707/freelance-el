"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("underscore");
var SumPipe = (function () {
    function SumPipe() {
    }
    SumPipe.prototype.transform = function (questions) {
        return _.reduce(questions, function (memo, q) { return memo + +q.score; }, 0);
    };
    SumPipe = __decorate([
        core_1.Pipe({ name: 'sum', pure: false })
    ], SumPipe);
    return SumPipe;
}());
exports.SumPipe = SumPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jbXMvcHJvamVjdC9zdW0ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFvRDtBQUNwRCw4QkFBZ0M7QUFHaEM7SUFBQTtJQU1BLENBQUM7SUFKQywyQkFBUyxHQUFULFVBQVUsU0FBZ0I7UUFDekIsT0FBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFDLElBQUksRUFBRSxDQUFDLElBQUssT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhFLENBQUM7SUFMVSxPQUFPO1FBRG5CLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO09BQ3ZCLE9BQU8sQ0FNbkI7SUFBRCxjQUFDO0NBTkQsQUFNQyxJQUFBO0FBTlksMEJBQU8iLCJmaWxlIjoiYXBwL2Ntcy9wcm9qZWN0L3N1bS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnc3VtJywgIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgU3VtUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXHQvLyByZXR1cm4gdHJ1ZSBpZiB2YWxpZGF0aW9uIGZhaWxlZFxuICB0cmFuc2Zvcm0ocXVlc3Rpb25zOiBhbnlbXSk6IGFueSB7XG4gIFx0cmV0dXJuICBfLnJlZHVjZShxdWVzdGlvbnMsIChtZW1vLCBxKT0+eyByZXR1cm4gbWVtbyArICtxLnNjb3JlOyB9LCAwKTtcbiAgICBcbiAgfVxufSJdfQ==
