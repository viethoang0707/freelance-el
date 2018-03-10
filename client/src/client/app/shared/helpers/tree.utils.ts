import { Observable, Subject } from 'rxjs/Rx'
import { Group } from '../models/group.model';
import * as _ from 'underscore';
import { Injectable } from '@angular/core';

@Injectable()
export class TreeUtils {

  constructor() {
  }

  buildTree(groups: Group[]):any[] {
    return this.buildSubTree(null, groups);
  }

  getSubGroup(groups:Group[], parentId:number):any[] {
    return _.filter(groups, (group:Group)=> {
        return this.isSubGroup(groups, group, parentId);
      });
  }

  private isSubGroup(groups:Group[], target: Group, parentId:number):boolean {
    while (target) {
      if (target.id == parentId)
        return true;
      if (target.parent_id)
        target = _.find(groups, (group)=> {
        return group.id == target.parent_id;
      });
    }
    return false;
  }

  private buildSubTree(parentGroup: Group, groups: Group[]):any[] {
    var subTrees = [];
    var directChilds = [];
    if (!parentGroup)
      directChilds = _.filter(groups, (group)=> {
        return !group.parent_id;
      });
    else {
      directChilds = _.filter(groups, (group)=> {
        return parentGroup.id == group.parent_id;
      });
    }
    _.each(directChilds, (group)=> {
      subTrees.push(
        {
          data: group,
          label: group.name,
          expanded: true,
          expandedIcon: "ui-icon-folder-open",
          collapsedIcon: "ui-icon-folder",
          children: this.buildSubTree(group, groups)
        });
    });
    return subTrees;
  }

  findTreeNode(tree, groupId):any {
    for (var i = 0; i < tree.length; i++) {
      var node = tree[i];
      var found = this.findTreeSubNode(node, groupId);
      if (found)
        return found;
    }
    return null;
  }

  private findTreeSubNode(node, groupId):any {
    if (node.data.id == groupId)
      return node;
    for (var i = 0; i < node.children.length; i++) {
      var childNode = node.children[i];
      var found = this.findTreeSubNode(childNode, groupId);
      if (found)
        return found;
    }
    return null;
  }
}
