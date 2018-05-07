import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { CacheService } from './cache.service'
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/primeng';
import * as _ from 'underscore';

@Injectable()
export class MenuService {

    constructor() {
    }

    adminMenuTree() {
       var menu = this.adminMenu();
       var tree = [];
       _.each(menu, ((menuItem:MenuItem)=> {
         if (!menuItem.separator) {
           var node = this.convertMenuNodeToTreeNode(menuItem);
           tree.push(node);
         }
       }));
       return tree;
    }

    findMenuTreeNode(tree, code:string) {
      for (var i =0;i < tree.length;i++) {
        var node = this.findSubTreeNode(tree[i], code);
        if (node)
          return node;
      }
      return null;
    }

    private findSubTreeNode(node, code:string) {
      if (node["data"] == code)
        return node;
      for (var i =0;i < node.children.length;i++) {
        var subNode = this.findSubTreeNode(node.children[i], code);
        if (subNode)
          return subNode;
      }
    }

    private convertMenuNodeToTreeNode(menuItem) {
      var node = menuItem;
      node["data"] =  menuItem["code"];
      node["children"] = [];
      _.each(menuItem.items, ((menuSubItem:MenuItem)=> {
        if (!menuSubItem.separator) {
           var subNode = this.convertMenuNodeToTreeNode(menuSubItem);
           node["children"].push(subNode);
         }
      }));
      return node;
    }

    adminMenu() {
        return [
                { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'] , code:'DASHBOARD'},
                { label: '', separator: true, styleClass: 'menu-separator' },
                {
                    label: 'Syllabus', icon: 'school', code:'SCHOOL',
                    items: [
                        { label: 'Course', routerLink: ['/course/courses'] ,code:'SCHOOL-COURSE'}, 
                        { label: 'Course group', routerLink: ['/course/groups'] ,code:'SCHOOL-GROUP'},
                    ]
                },
                {
                    label: 'Assessment', icon: 'grade',code:'ASSESSMENT',
                    items: [
                        { label: 'Question banks', routerLink: ['/assessment/questions'],code:'ASSESSMENT-QUESTION' },
                        { label: 'Question category', routerLink: ['/assessment/groups'],code:'ASSESSMENT-QUESTION_GROUP' },
                        { label: 'Exam', routerLink: ['/assessment/exams'] ,code:'ASSESSMENT-EXAM'}
                    ]
                },
                {
                    label: 'Analysis', icon: 'pie_chart',code:'ANALYSIS',
                    items: [
                        { label: 'Report', routerLink: ['/analysis/reports'],code:'ANALYSIS-REPORT' },
                        { label: 'Chart', routerLink: ['/analysis/charts'],code:'ANALYSIS-CHART' },
                    ]
                },
                {
                    label: 'Accounts', icon: 'people',code:'ACCOUNT',
                    items: [
                        { label: 'User', routerLink: ['/account/users'],code:'ACCOUNT-USER' },
                        { label: 'Group', routerLink: ['/account/groups'],code:'ACCOUNT-USER_GROUP' },
                        { label: 'Permission', routerLink: ['/account/permissions'],code:'ACCOUNT-PERMISSION' }
                    ]
                }
            ];
    }

    userMenu() {
        return [
                { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'] },
                { label: '', separator: true, styleClass: 'menu-separator' },
                { label: 'My course', icon: 'school', routerLink: ['/lms/courses'] },
                { label: 'My exam', icon: 'alarm_add', routerLink: ['/lms/exams'] },
                { label: 'Conference', icon: 'perm_phone_msg', routerLink: ['/lms/meetings'] },
            ];
    }

}
