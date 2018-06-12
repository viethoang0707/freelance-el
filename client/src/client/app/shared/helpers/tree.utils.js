"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var TreeUtils = (function () {
    function TreeUtils() {
    }
    TreeUtils.prototype.getSubGroup = function (groups, parentId) {
        var _this = this;
        return _.filter(groups, function (group) {
            return _this.isSubGroup(groups, group, parentId);
        });
    };
    TreeUtils.prototype.isSubGroup = function (groups, target, parentId) {
        while (target) {
            if (target.id == parentId)
                return true;
            if (target.parent_id)
                target = _.find(groups, function (group) {
                    return group.id == target.parent_id;
                });
            else
                target = null;
        }
        return false;
    };
    TreeUtils.prototype.buildGroupTree = function (groups) {
        return this.buildSubGroupTree(null, groups);
    };
    TreeUtils.prototype.buildSubGroupTree = function (parentGroup, groups) {
        var _this = this;
        var subTrees = [];
        var directChilds = [];
        if (!parentGroup)
            directChilds = _.filter(groups, function (group) {
                return !group.parent_id;
            });
        else {
            directChilds = _.filter(groups, function (group) {
                return parentGroup.id == group.parent_id;
            });
        }
        _.each(directChilds, function (group) {
            subTrees.push({
                data: group,
                label: group.name,
                expanded: true,
                expandedIcon: "ui-icon-folder-open",
                collapsedIcon: "ui-icon-folder",
                children: _this.buildSubGroupTree(group, groups)
            });
        });
        return subTrees;
    };
    TreeUtils.prototype.buildApprovalTree = function (users) {
        var tree = this.buildSubApprovalTree(null, users);
        return [{
                label: 'Administration',
                type: 'department',
                expanded: true,
                children: tree
            }];
    };
    TreeUtils.prototype.buildSubApprovalTree = function (parentUser, users) {
        var _this = this;
        var subTrees = [];
        var directChilds = [];
        if (!parentUser)
            directChilds = _.filter(users, function (user) {
                return !user.supervisor_id;
            });
        else {
            directChilds = _.filter(users, function (user) {
                return parentUser.id == user.supervisor_id;
            });
        }
        _.each(directChilds, function (user) {
            subTrees.push({
                data: user,
                label: user.name,
                expanded: true,
                type: 'person',
                children: _this.buildSubApprovalTree(user, users)
            });
        });
        return subTrees;
    };
    TreeUtils.prototype.disableTree = function (tree) {
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            node.selectable = false;
            this.disableTree(node);
        }
    };
    TreeUtils.prototype.findTreeNode = function (tree, id) {
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            var found = this.findTreeSubNode(node, id);
            if (found)
                return found;
        }
        return null;
    };
    TreeUtils.prototype.findTreeSubNode = function (node, id) {
        if (node.data && node.data.id == id)
            return node;
        for (var i = 0; i < node.children.length; i++) {
            var childNode = node.children[i];
            var found = this.findTreeSubNode(childNode, id);
            if (found)
                return found;
        }
        return null;
    };
    return TreeUtils;
}());
exports.TreeUtils = TreeUtils;
//# sourceMappingURL=tree.utils.js.map