import { Observable, Subject } from 'rxjs/Rx'
import { CourseUnit } from '../models/course-unit.model';
import * as _ from 'underscore';
import { Injectable } from '@angular/core';

@Injectable()
export class SyllabusUtils {

  constructor() {
  }

  buildTree(units: CourseUnit[]) {
    return this.buildSubTree(null, units);
  }

  getSubGroup(units: CourseUnit[], parentId: number) {
    var subUnits = _.filter(units, (unit) => {
      return this.isSubUnit(units, unit, parentId);
    });
  }

  private isSubUnit(units: CourseUnit[], target: CourseUnit, parentId: number) {
    while (target) {
      if (target.id == parentId)
        return true;
      if (target.parent_id)
        target = _.find(units, (unit) => {
          return unit.id == target.parent_id;
        });
    }
    return false;
  }

  private buildSubTree(parentUnit: CourseUnit, units: CourseUnit[]) {
    var subTrees = [];
    var directChilds = [];
    if (!parentUnit)
      directChilds = _.filter(units, (unit) => {
        return !unit.parent_id;
      });
    else {
      directChilds = _.filter(units, (unit) => {
        return parentUnit.id == unit.parent_id;
      });
    }
    _.each(directChilds, (unit) => {
      var children = this.buildSubTree(unit, units);
      children = _.sortBy(children, (obj) => { return obj.data.order });
      subTrees.push(
        {
          data: unit,
          label: unit.name,
          icon: unit.icon,
          children: children
        });
    });
    subTrees = _.sortBy(subTrees, (obj) => { return obj.data.order });
    return subTrees;
  }

  public moveUp(tree, node) {
    var siblings = [];
    if (!node.parent_id) {
      siblings = tree;
    } else {
      var parentNode = this.findTreeNode(tree, node.parent_id);
      siblings = parentNode.children;
    }
    var curIndex = _.findIndex(siblings, (obj) => {return obj.data.id == node.data.id});
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
  }

  public moveDown(tree, node) {
    var siblings = [];
    if (!node.parent_id) {
      siblings = tree;
    } else {
      var parentNode = this.findTreeNode(tree, node.parent_id);
      siblings = parentNode.children;
    }
    var curIndex = _.findIndex(siblings, (obj) => {return obj.data.id == node.data.id});
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
  }

  public addRootNode(tree, unit) {
    tree.push(
      {
        data: unit,
        label: unit.name,
        icon: unit.icon,
        children: []
      });
  }


  public addChildNode(parentNode, unit) {
    parentNode.children.push(
      {
        data: unit,
        label: unit.name,
        icon: unit.icon,
        children: []
      });
  }

  findTreeNode(tree, unitId) {
    for (var i = 0; i < tree.length; i++) {
      var node = tree[i];
      var found = this.findTreeSubNode(node, unitId);
      if (found)
        return found;
    }
    return null;
  }

  private findTreeSubNode(node, unitId) {
    if (node.data.id == unitId)
      return node;
    for (var i = 0; i < node.children.length; i++) {
      var childNode = node.children[i];
      var found = this.findTreeSubNode(childNode, unitId);
      if (found)
        return found;
    }
    return null;
  }
}
