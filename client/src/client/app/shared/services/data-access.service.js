"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/mergeMap");
var user_model_1 = require("../models/elearning/user.model");
var course_model_1 = require("../models/elearning/course.model");
var map_utils_1 = require("../helpers/map.utils");
var auth_service_1 = require("./auth.service");
var api_service_1 = require("./api.service");
var tree_utils_1 = require("../helpers/tree.utils");
var group_model_1 = require("../models/elearning/group.model");
var _ = require("underscore");
var search_read_api_1 = require("./api/search-read.api");
var DataAccessService = (function () {
    function DataAccessService(authService, apiService) {
        this.authService = authService;
        this.apiService = apiService;
        this.cacheUserGroups = [];
        this.cacheAdminUsers = [];
    }
    DataAccessService.prototype.filter = function (record, method) {
        var _this = this;
        if (this.authService.UserProfile.IsSuperAdmin)
            return Rx_1.Observable.of(true);
        if (record.Model == user_model_1.User.Model) {
            return this.getUserGroups().map(function (groups) {
                var userAccess = new UserAccess(_this.authService.UserPermission, groups);
                return userAccess.checkPermission(record, method);
            });
        }
        if (record.Model == group_model_1.Group.Model) {
            var groupAccess = new GroupAccess();
            return Rx_1.Observable.of(groupAccess.checkPermission(record, method));
        }
        if (record.Model == course_model_1.Course.Model) {
            return this.getAdminUsers().map(function (users) {
                var treeUtils = new tree_utils_1.TreeUtils();
                var adminTree = treeUtils.buildApprovalTree(users);
                var courseAccess = new CourseAccess(adminTree, _this.authService.UserProfile);
                return courseAccess.checkPermission(record, method);
            });
        }
        return Rx_1.Observable.of(true);
    };
    DataAccessService.prototype.getUserGroups = function () {
        var _this = this;
        if (this.cacheUserGroups.length)
            return Rx_1.Observable.of(this.cacheUserGroups);
        else {
            var model = group_model_1.Group.Model;
            var cloud_acc = this.authService.CloudAcc;
            return this.apiService.execute(new search_read_api_1.SearchReadAPI(model, [], "[('category','=','organization')]"), cloud_acc.id, cloud_acc.api_endpoint).map(function (items) {
                return _.map(items, function (item) {
                    _this.cacheUserGroups = map_utils_1.MapUtils.deserializeModel(model, item);
                    return _this.cacheUserGroups;
                });
            });
        }
    };
    DataAccessService.prototype.getAdminUsers = function () {
        var _this = this;
        if (this.cacheAdminUsers.length)
            return Rx_1.Observable.of(this.cacheAdminUsers);
        else {
            var model = user_model_1.User.Model;
            var cloud_acc = this.authService.CloudAcc;
            return this.apiService.execute(new search_read_api_1.SearchReadAPI(model, [], "[('is_admin','=',True)]"), cloud_acc.id, cloud_acc.api_endpoint).map(function (items) {
                return _.map(items, function (item) {
                    _this.cacheAdminUsers = map_utils_1.MapUtils.deserializeModel(model, item);
                    return _this.cacheAdminUsers;
                });
            });
        }
    };
    DataAccessService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService, api_service_1.APIService])
    ], DataAccessService);
    return DataAccessService;
}());
exports.DataAccessService = DataAccessService;
var UserAccess = (function () {
    function UserAccess(perm, groups) {
        this.perm = perm;
        this.groups = groups;
    }
    UserAccess.prototype.checkPermission = function (record, method) {
        if (!record.group_id)
            return true;
        if (!this.perm.user_group_id)
            return false;
        var userGroup = _.find(this.groups, (function (obj) {
            return obj.id == record.group_id;
        }));
        while (userGroup) {
            if (userGroup.id == this.perm.user_group_id)
                return true;
            userGroup = this.findParentGroup(userGroup);
        }
        return false;
    };
    UserAccess.prototype.findParentGroup = function (group) {
        if (!group.parent_id)
            return null;
        return _.find(this.groups, (function (obj) {
            return obj.id == group.parent_id;
        }));
    };
    return UserAccess;
}());
exports.UserAccess = UserAccess;
var GroupAccess = (function () {
    function GroupAccess() {
    }
    GroupAccess.prototype.checkPermission = function (record, method) {
        if (record.category == 'organization' && (method == 'SAVE' || method == 'DELETE')) {
            return false;
        }
        return true;
    };
    return GroupAccess;
}());
exports.GroupAccess = GroupAccess;
var CourseAccess = (function () {
    function CourseAccess(adminTree, user) {
        this.treeUtils = new tree_utils_1.TreeUtils();
        this.adminTree = adminTree;
        this.userNode = this.treeUtils.findTreeNode(this.adminTree, user.id);
    }
    CourseAccess.prototype.checkPermission = function (record, method) {
        if (!record.supervisor_id)
            return true;
        if (method == 'SAVE' || method == 'DELETE') {
            var courseAdminNode = this.treeUtils.findTreeNode(this.adminTree, record.supervisor_id);
            while (courseAdminNode) {
                if (courseAdminNode.data.id == this.userNode.data.id)
                    return true;
                courseAdminNode = this.treeUtils.findTreeNode(this.adminTree, courseAdminNode.data.supervisor_id);
            }
        }
        return true;
    };
    return CourseAccess;
}());
exports.CourseAccess = CourseAccess;
//# sourceMappingURL=data-access.service.js.map