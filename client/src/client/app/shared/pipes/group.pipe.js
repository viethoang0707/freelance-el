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
//# sourceMappingURL=group.pipe.js.map