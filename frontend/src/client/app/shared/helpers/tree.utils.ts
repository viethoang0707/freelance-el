import { Observable, Subject } from 'rxjs/Rx'
import { Group } from '../models/elearning/group.model';
import { User } from '../models/elearning/user.model';
import * as _ from 'underscore';
import { Injectable } from '@angular/core';

export class TreeUtils {

  constructor() {
  }

  getAncestorGroup(groups: Group[], groupId: number): any {
    let group:Group = _.find(groups, (obj:Group)=> {
      return obj.id == groupId;
    });
    while (group.parent_id != null) {
      let parent:Group = _.find(groups, (obj:Group)=> {
        return obj.id == group.parent_id;
      });
      group = parent;
    }
    return group;
  }

  getSubGroup(groups: Group[], parentId: number): any[] {
    return _.filter(groups, (group: Group) => {
      return this.isSubGroup(groups, group, parentId);
    });
  }

  private isSubGroup(groups: Group[], target: Group, parentId: number): boolean {
    while (target) {
      if (target.id == parentId)
        return true;
      if (target.parent_id)
        target = _.find(groups, (group) => {
          return group.id == target.parent_id;
        });
      else
        target = null;
    }
    return false;
  }

  buildGroupTree(groups: Group[],count?:boolean): any[] {
    return this.buildSubGroupTree(null, groups,count);
  }

  private buildSubGroupTree(parentGroup: Group, groups: Group[], count?:boolean): any[] {
    var groupIds = _.pluck(groups, 'id');
    var subTrees = [];
    var directChilds = [];
    if (!parentGroup)
      directChilds = _.filter(groups, (group) => {
        return !group.parent_id || groupIds.includes(group.parent_id);
      });
    else {
      directChilds = _.filter(groups, (group) => {
        return parentGroup.id == group.parent_id;
      });
    }
    _.each(directChilds, (group) => {
      subTrees.push(
        {
          data: group,
          id: group.id,
          label: group.treeLabel(count),
          expanded: true,
          expandedIcon: "ui-icon-folder-open",
          collapsedIcon: "ui-icon-folder",
          children: this.buildSubGroupTree(group, groups)
        });
    });
    return subTrees;
  }

  buildApprovalTree(users: User[]): any[] {
    var tree=  this.buildSubApprovalTree(null, users);
    return [{
      label:'Administration',
      type:'department',
      expanded: true,
      children: tree
    }]
  }

  private buildSubApprovalTree(parentUser: User, users: User[]): any[] {
    var subTrees = [];
    var directChilds = [];
    if (!parentUser)
      directChilds = _.filter(users, (user) => {
        return !user.supervisor_id;
      });
    else {
      directChilds = _.filter(users, (user) => {
        return parentUser.id == user.supervisor_id;
      });
    }
    _.each(directChilds, (user) => {
      subTrees.push(
        {
          data: user,
          label: user.name,
          expanded: true,
          type: 'person',
          children: this.buildSubApprovalTree(user, users)
        });
    });
    return subTrees;
  }

  disableTree(tree): any {
    for (var i = 0; i < tree.length; i++) {
      var node = tree[i];
      node.selectable = false;
      this.disableTree(node);
    }
  }

  findTreeNode(tree, id): any {
    for (var i = 0; i < tree.length; i++) {
      var node = tree[i];
      var found = this.findTreeSubNode(node, id);
      if (found)
        return found;
    }
    return null;
  }

  private findTreeSubNode(node, id): any {
    if (node.data && node.data.id == id)
      return node;
    for (var i = 0; i < node.children.length; i++) {
      var childNode = node.children[i];
      var found = this.findTreeSubNode(childNode, id);
      if (found)
        return found;
    }
    return null;
  }
}
