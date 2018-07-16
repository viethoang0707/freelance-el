"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var SyllabusUtils = (function () {
    function SyllabusUtils() {
    }
    SyllabusUtils.prototype.buildGroupTree = function (units) {
        return this.buildSubTree(null, units);
    };
    SyllabusUtils.prototype.getSubGroup = function (units, parentId) {
        var _this = this;
        var subUnits = _.filter(units, function (unit) {
            return _this.isSubUnit(units, unit, parentId);
        });
    };
    SyllabusUtils.prototype.flattenTree = function (tree) {
        var nodeList = [];
        for (var i = 0; i < tree.length; i++)
            nodeList = nodeList.concat(this.flattenNode(tree[i]));
        return nodeList;
    };
    SyllabusUtils.prototype.flattenNode = function (treeNode) {
        var nodeList = [treeNode];
        for (var i = 0; i < treeNode.children.length; i++)
            nodeList = nodeList.concat(this.flattenNode(treeNode.children[i]));
        return nodeList;
    };
    SyllabusUtils.prototype.isSubUnit = function (units, target, parentId) {
        while (target) {
            if (target.id == parentId)
                return true;
            if (target.parent_id)
                target = _.find(units, function (unit) {
                    return unit.id == target.parent_id;
                });
            else
                target = null;
        }
        return false;
    };
    SyllabusUtils.prototype.buildSubTree = function (parentUnit, units) {
        var _this = this;
        var subTrees = [];
        var directChilds = [];
        if (!parentUnit)
            directChilds = _.filter(units, function (unit) {
                return !unit.parent_id;
            });
        else {
            directChilds = _.filter(units, function (unit) {
                return parentUnit.id == unit.parent_id;
            });
        }
        _.each(directChilds, function (unit) {
            var children = _this.buildSubTree(unit, units);
            children = _.sortBy(children, function (obj) { return obj.data.order; });
            subTrees.push({
                data: unit,
                label: unit.name,
                icon: unit.icon,
                expanded: true,
                children: children
            });
        });
        subTrees = _.sortBy(subTrees, function (obj) { return obj.data.order; });
        return subTrees;
    };
    SyllabusUtils.prototype.moveUp = function (tree, node) {
        var siblings = [];
        if (!node.parent) {
            siblings = tree;
        }
        else {
            var parentNode = this.findTreeNode(tree, node.parent.data.id);
            siblings = parentNode.children;
        }
        var curIndex = _.findIndex(siblings, function (obj) { return obj.data.id == node.data.id; });
        if (curIndex > 0) {
            var prevNode = siblings[curIndex - 1];
            var prevData = prevNode.data;
            var currentData = node.data;
            var tmp = prevData.order;
            prevData.order = currentData.order;
            currentData.order = tmp;
            siblings[curIndex] = prevNode;
            siblings[curIndex - 1] = node;
        }
    };
    SyllabusUtils.prototype.moveDown = function (tree, node) {
        var siblings = [];
        if (!node.parent) {
            siblings = tree;
        }
        else {
            var parentNode = this.findTreeNode(tree, node.parent.data.id);
            siblings = parentNode.children;
        }
        var curIndex = _.findIndex(siblings, function (obj) { return obj.data.id == node.data.id; });
        if (curIndex < siblings.length - 1) {
            var nextNode = siblings[curIndex + 1];
            var nextData = nextNode.data;
            var currentData = node.data;
            var tmp = nextData.order;
            nextData.order = currentData.order;
            currentData.order = tmp;
            siblings[curIndex] = nextNode;
            siblings[curIndex + 1] = node;
        }
    };
    SyllabusUtils.prototype.addRootNode = function (tree, unit) {
        tree.push({
            data: unit,
            label: unit.name,
            icon: unit.icon,
            children: []
        });
    };
    SyllabusUtils.prototype.addChildNode = function (parentNode, unit) {
        parentNode.children.push({
            data: unit,
            label: unit.name,
            icon: unit.icon,
            children: []
        });
    };
    SyllabusUtils.prototype.findTreeNode = function (tree, unitId) {
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            var found = this.findTreeSubNode(node, unitId);
            if (found)
                return found;
        }
        return null;
    };
    SyllabusUtils.prototype.findTreeSubNode = function (node, unitId) {
        if (node.data.id == unitId)
            return node;
        for (var i = 0; i < node.children.length; i++) {
            var childNode = node.children[i];
            var found = this.findTreeSubNode(childNode, unitId);
            if (found)
                return found;
        }
        return null;
    };
    return SyllabusUtils;
}());
exports.SyllabusUtils = SyllabusUtils;
