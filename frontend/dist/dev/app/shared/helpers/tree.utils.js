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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvaGVscGVycy90cmVlLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsOEJBQWdDO0FBR2hDO0lBRUU7SUFDQSxDQUFDO0lBRUQsK0JBQVcsR0FBWCxVQUFZLE1BQWUsRUFBRSxRQUFnQjtRQUE3QyxpQkFJQztRQUhDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFZO1lBQ25DLE9BQU8sS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDhCQUFVLEdBQWxCLFVBQW1CLE1BQWUsRUFBRSxNQUFhLEVBQUUsUUFBZ0I7UUFDakUsT0FBTyxNQUFNLEVBQUU7WUFDYixJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksUUFBUTtnQkFDdkIsT0FBTyxJQUFJLENBQUM7WUFDZCxJQUFJLE1BQU0sQ0FBQyxTQUFTO2dCQUNsQixNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFLO29CQUM1QixPQUFPLEtBQUssQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLENBQUM7O2dCQUVILE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDakI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxrQ0FBYyxHQUFkLFVBQWUsTUFBZTtRQUM1QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLHFDQUFpQixHQUF6QixVQUEwQixXQUFrQixFQUFFLE1BQWU7UUFBN0QsaUJBd0JDO1FBdkJDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVc7WUFDZCxZQUFZ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LE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxLQUFLO2dCQUNQLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sbUNBQWUsR0FBdkIsVUFBd0IsSUFBSSxFQUFFLEVBQUU7UUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUM7UUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoRCxJQUFJLEtBQUs7Z0JBQ1AsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxnQkFBQztBQUFELENBdkhBLEFBdUhDLElBQUE7QUF2SFksOEJBQVMiLCJmaWxlIjoiYXBwL3NoYXJlZC9oZWxwZXJzL3RyZWUudXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcy9SeCdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy9ncm91cC5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL2VsZWFybmluZy91c2VyLm1vZGVsJztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlVXRpbHMge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgZ2V0U3ViR3JvdXAoZ3JvdXBzOiBHcm91cFtdLCBwYXJlbnRJZDogbnVtYmVyKTogYW55W10ge1xuICAgIHJldHVybiBfLmZpbHRlcihncm91cHMsIChncm91cDogR3JvdXApID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmlzU3ViR3JvdXAoZ3JvdXBzLCBncm91cCwgcGFyZW50SWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1N1Ykdyb3VwKGdyb3VwczogR3JvdXBbXSwgdGFyZ2V0OiBHcm91cCwgcGFyZW50SWQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHdoaWxlICh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQuaWQgPT0gcGFyZW50SWQpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHRhcmdldC5wYXJlbnRfaWQpXG4gICAgICAgIHRhcmdldCA9IF8uZmluZChncm91cHMsIChncm91cCkgPT4ge1xuICAgICAgICAgIHJldHVybiBncm91cC5pZCA9PSB0YXJnZXQucGFyZW50X2lkO1xuICAgICAgICB9KTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGFyZ2V0ID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYnVpbGRHcm91cFRyZWUoZ3JvdXBzOiBHcm91cFtdKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLmJ1aWxkU3ViR3JvdXBUcmVlKG51bGwsIGdyb3Vwcyk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU3ViR3JvdXBUcmVlKHBhcmVudEdyb3VwOiBHcm91cCwgZ3JvdXBzOiBHcm91cFtdKTogYW55W10ge1xuICAgIHZhciBzdWJUcmVlcyA9IFtdO1xuICAgIHZhciBkaXJlY3RDaGlsZHMgPSBbXTtcbiAgICBpZiAoIXBhcmVudEdyb3VwKVxuICAgICAgZGlyZWN0Q2hpbGRzID0gXy5maWx0ZXIoZ3JvdXBzLCAoZ3JvdXApID0+IHtcbiAgICAgICAgcmV0dXJuICFncm91cC5wYXJlbnRfaWQ7XG4gICAgICB9KTtcbiAgICBlbHNlIHtcbiAgICAgIGRpcmVjdENoaWxkcyA9IF8uZmlsdGVyKGdyb3VwcywgKGdyb3VwKSA9PiB7XG4gICAgICAgIHJldHVybiBwYXJlbnRHcm91cC5pZCA9PSBncm91cC5wYXJlbnRfaWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXy5lYWNoKGRpcmVjdENoaWxkcywgKGdyb3VwKSA9PiB7XG4gICAgICBzdWJUcmVlcy5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgZGF0YTogZ3JvdXAsXG4gICAgICAgICAgbGFiZWw6IGdyb3VwLm5hbWUsXG4gICAgICAgICAgZXhwYW5kZWQ6IHRydWUsXG4gICAgICAgICAgZXhwYW5kZWRJY29uOiBcInVpLWljb24tZm9sZGVyLW9wZW5cIixcbiAgICAgICAgICBjb2xsYXBzZWRJY29uOiBcInVpLWljb24tZm9sZGVyXCIsXG4gICAgICAgICAgY2hpbGRyZW46IHRoaXMuYnVpbGRTdWJHcm91cFRyZWUoZ3JvdXAsIGdyb3VwcylcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN1YlRyZWVzO1xuICB9XG5cbiAgYnVpbGRBcHByb3ZhbFRyZWUodXNlcnM6IFVzZXJbXSk6IGFueVtdIHtcbiAgICB2YXIgdHJlZT0gIHRoaXMuYnVpbGRTdWJBcHByb3ZhbFRyZWUobnVsbCwgdXNlcnMpO1xuICAgIHJldHVybiBbe1xuICAgICAgbGFiZWw6J0FkbWluaXN0cmF0aW9uJyxcbiAgICAgIHR5cGU6J2RlcGFydG1lbnQnLFxuICAgICAgZXhwYW5kZWQ6IHRydWUsXG4gICAgICBjaGlsZHJlbjogdHJlZVxuICAgIH1dXG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU3ViQXBwcm92YWxUcmVlKHBhcmVudFVzZXI6IFVzZXIsIHVzZXJzOiBVc2VyW10pOiBhbnlbXSB7XG4gICAgdmFyIHN1YlRyZWVzID0gW107XG4gICAgdmFyIGRpcmVjdENoaWxkcyA9IFtdO1xuICAgIGlmICghcGFyZW50VXNlcilcbiAgICAgIGRpcmVjdENoaWxkcyA9IF8uZmlsdGVyKHVzZXJzLCAodXNlcikgPT4ge1xuICAgICAgICByZXR1cm4gIXVzZXIuc3VwZXJ2aXNvcl9pZDtcbiAgICAgIH0pO1xuICAgIGVsc2Uge1xuICAgICAgZGlyZWN0Q2hpbGRzID0gXy5maWx0ZXIodXNlcnMsICh1c2VyKSA9PiB7XG4gICAgICAgIHJldHVybiBwYXJlbnRVc2VyLmlkID09IHVzZXIuc3VwZXJ2aXNvcl9pZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBfLmVhY2goZGlyZWN0Q2hpbGRzLCAodXNlcikgPT4ge1xuICAgICAgc3ViVHJlZXMucHVzaChcbiAgICAgICAge1xuICAgICAgICAgIGRhdGE6IHVzZXIsXG4gICAgICAgICAgbGFiZWw6IHVzZXIubmFtZSxcbiAgICAgICAgICBleHBhbmRlZDogdHJ1ZSxcbiAgICAgICAgICB0eXBlOiAncGVyc29uJyxcbiAgICAgICAgICBjaGlsZHJlbjogdGhpcy5idWlsZFN1YkFwcHJvdmFsVHJlZSh1c2VyLCB1c2VycylcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN1YlRyZWVzO1xuICB9XG5cbiAgZGlzYWJsZVRyZWUodHJlZSk6IGFueSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbm9kZSA9IHRyZWVbaV07XG4gICAgICBub2RlLnNlbGVjdGFibGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGlzYWJsZVRyZWUobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgZmluZFRyZWVOb2RlKHRyZWUsIGlkKTogYW55IHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBub2RlID0gdHJlZVtpXTtcbiAgICAgIHZhciBmb3VuZCA9IHRoaXMuZmluZFRyZWVTdWJOb2RlKG5vZGUsIGlkKTtcbiAgICAgIGlmIChmb3VuZClcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZmluZFRyZWVTdWJOb2RlKG5vZGUsIGlkKTogYW55IHtcbiAgICBpZiAobm9kZS5kYXRhICYmIG5vZGUuZGF0YS5pZCA9PSBpZClcbiAgICAgIHJldHVybiBub2RlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkTm9kZSA9IG5vZGUuY2hpbGRyZW5baV07XG4gICAgICB2YXIgZm91bmQgPSB0aGlzLmZpbmRUcmVlU3ViTm9kZShjaGlsZE5vZGUsIGlkKTtcbiAgICAgIGlmIChmb3VuZClcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19
