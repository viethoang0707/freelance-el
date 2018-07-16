"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GroupsPipe = (function () {
    function GroupsPipe() {
    }
    GroupsPipe.prototype.transform = function (items, filterGroups) {
        if (!items) {
            return [];
        }
        else if (!filterGroups || filterGroups.length == 0) {
            return items;
        }
        else {
            var result = items.filter(function (item) {
                var found = filterGroups.find(function (element) {
                    return element.data.id == item.group_id;
                });
                return found;
            });
            return result;
        }
    };
    GroupsPipe = __decorate([
        core_1.Pipe({ name: 'groups', pure: false })
    ], GroupsPipe);
    return GroupsPipe;
}());
exports.GroupsPipe = GroupsPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvcGlwZXMvZ3JvdXAucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFvRDtBQUlwRDtJQUFBO0lBZ0NBLENBQUM7SUEvQkMsOEJBQVMsR0FBVCxVQUFVLEtBQVksRUFBRSxZQUFtQjtRQUN6QyxJQUFHLENBQUMsS0FBSyxFQUNUO1lBQ0UsT0FBTyxFQUFFLENBQUM7U0FDWDthQUNJLElBQUcsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQy9DO1lBQ0UsT0FBTyxLQUFLLENBQUM7U0FDZDthQUVEO1lBQ0UsSUFBSSxNQUFNLEdBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBRSxVQUFBLElBQUk7Z0JBVzVCLElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBUyxPQUFPO29CQUM1QyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sS0FBSyxDQUFDO1lBRWYsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLE1BQU0sQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQS9CVSxVQUFVO1FBRnRCLFdBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO09BRTFCLFVBQVUsQ0FnQ3RCO0lBQUQsaUJBQUM7Q0FoQ0QsQUFnQ0MsSUFBQTtBQWhDWSxnQ0FBVSIsImZpbGUiOiJhcHAvc2hhcmVkL3BpcGVzL2dyb3VwLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHsgbmFtZTogJ2dyb3VwcycsICBwdXJlOiBmYWxzZSB9KVxuXG5leHBvcnQgY2xhc3MgR3JvdXBzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaXRlbXM6IGFueVtdLCBmaWx0ZXJHcm91cHM6IGFueVtdKTogYW55IHtcbiAgICBpZighaXRlbXMpIFxuICAgIHsgXG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGVsc2UgaWYoIWZpbHRlckdyb3VwcyB8fCBmaWx0ZXJHcm91cHMubGVuZ3RoPT0wKSBcbiAgICB7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICB2YXIgcmVzdWx0PSBpdGVtcy5maWx0ZXIoIGl0ZW0gPT5cbiAgICAgIHsgICAgICBcbiAgICAgICAgLy8gZm9yKHZhciBpPTA7IGkgPCBmaWx0ZXJHcm91cHMubGVuZ3RoOyBpKyspXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBpZihmaWx0ZXJHcm91cHNbaV0uZGF0YS5pZCA9PSBpdGVtLmdyb3VwX2lkKVxuICAgICAgICAvLyAgIHtcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSBcbiAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciBmb3VuZCA9IGZpbHRlckdyb3Vwcy5maW5kKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgIHJldHVybiBlbGVtZW50LmRhdGEuaWQgPT0gaXRlbS5ncm91cF9pZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmb3VuZDtcblxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gXG4gIH1cbn1cblxuXG4vLyBleHBvcnQgY2xhc3MgR3JvdXBzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuLy8gICB0cmFuc2Zvcm0oaXRlbXM6IGFueVtdLCBpZDogbnVtYmVyKTogYW55W10ge1xuLy8gICAgIGlmKCFpdGVtcykgcmV0dXJuIFtdO1xuLy8gICAgIGlmKCFpZCkgcmV0dXJuIGl0ZW1zO1xuLy8gICAgIHJldHVybiBpdGVtcy5maWx0ZXIoZnVuY3Rpb24oaGVybyl7XG4vLyAgICAgICByZXR1cm4gaGVyby5ncm91cF9pZCA9PSBpZDtcbi8vICAgICB9KTtcbi8vICAgIH1cbi8vIH1cblxuLy8gZXhwb3J0IGNsYXNzIEdyb3Vwc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbi8vICAgdHJhbnNmb3JtKG9iamVjdDogYW55W10sIGFyZ3M6IGFueVtdID0gbnVsbCk6IGFueSB7XG4vLyAgICAgY29uc29sZS5sb2cob2JqZWN0KTtcbi8vICAgICByZXR1cm4gb2JqZWN0O1xuXG4vLyAgIH1cbi8vIH0iXX0=
