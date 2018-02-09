import { Observable, Subject } from 'rxjs/Rx'
import { Group } from '../models/group.model';
import * as _ from 'underscore';
import { Injectable } from '@angular/core';

@Injectable()
export class TreeUtils {

  constructor() {
  }

  buildTree(groups: Group[]) {
    return this.buildSubTree(null, groups);
  }

  getSubGroup(groups:Group[], parentId:number) {
    var self = this;
    var subGroups = _.filter(groups, function(group) {
        return self.isSubGroup(groups, group, parentId);
      });
  }

  private isSubGroup(groups:Group, target: Group, parentId:number) {
    while (target) {
      if (target.id == parentId)
        return true;
      if (target.parent_id)
        target = _.find(groups, function(group) {
        return group.id == target.parent_id;
      });
    }
    return false;
  }

  private buildSubTree(parentGroup: Group, groups: Group[]) {
    var subTrees = [];
    var self = this;
    var directChilds = [];
    if (!parentGroup)
      directChilds = _.filter(groups, function(group) {
        return !group.parent_id;
      });
    else {
      directChilds = _.filter(groups, function(group) {
        return parentGroup.id == group.parent_id;
      });
    }
    _.each(directChilds, function(group) {
      subTrees.push(
        {
          data: group,
          label: group.name,
          expanded: true,
          expandedIcon: "ui-icon-folder-open",
          collapsedIcon: "ui-icon-folder",
          children: self.buildSubTree(group, groups)
        });
    });
    return subTrees;
  }

  findTreeNode(tree, groupId) {
    var self = this;
    for (var i = 0; i < tree.length; i++) {
      var node = tree[i];
      var found = self.findTreeSubNode(node, groupId);
      if (found)
        return found;
    }
    return null;
  }

  private findTreeSubNode(node, groupId) {
    var self = this;
    if (node.data.id == groupId)
      return node;
    for (var i = 0; i < node.children.length; i++) {
      var childNode = node.children[i];
      var found = self.findTreeSubNode(childNode, groupId);
      if (found)
        return found;
    }
    return null;
  }
}
