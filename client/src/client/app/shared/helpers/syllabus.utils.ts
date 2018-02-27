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

  getSubGroup(units:CourseUnit[], parentId:number) {
    var subUnits = _.filter(units, (unit)=> {
        return this.isSubUnit(units, unit, parentId);
      });
  }

  private isSubUnit(units:CourseUnit[], target: CourseUnit, parentId:number) {
    while (target) {
      if (target.id == parentId)
        return true;
      if (target.parent_id)
        target = _.find(units, function(unit) {
        return unit.id == target.parent_id;
      });
    }
    return false;
  }

  private buildSubTree(parentUnit: CourseUnit, units: CourseUnit[]) {
    var subTrees = [];
    var directChilds = [];
    if (!parentUnit)
      directChilds = _.filter(units, function(unit) {
        return !unit.parent_id;
      });
    else {
      directChilds = _.filter(units, function(unit) {
        return parentUnit.id == unit.parent_id;
      });
    }
    _.each(directChilds, (unit)=> {
      subTrees.push(
        {
          data: unit,
          label: unit.name,
          icon: unit.icon,
          children: this.buildSubTree(unit, units)
        });
    });
    return subTrees;
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
