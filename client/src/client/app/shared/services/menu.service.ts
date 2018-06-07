import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { AuthService } from './auth.service'
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/primeng';
import * as _ from 'underscore';

@Injectable()
export class MenuService {

  private ADMIN_MENU = [
    { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'], code: 'DASHBOARD' },
    { label: '', separator: true, styleClass: 'menu-separator' },
    {
      label: 'Syllabus', icon: 'school', code: 'SCHOOL',
      items: [
        { label: 'Course', routerLink: ['/course/courses'], code: 'SCHOOL-COURSE' },
        { label: 'Course group', routerLink: ['/course/groups'], code: 'SCHOOL-GROUP' },
      ]
    },
    {
      label: 'Assessment', icon: 'grade', code: 'ASSESSMENT',
      items: [
        { label: 'Question banks', routerLink: ['/assessment/questions'], code: 'ASSESSMENT-QUESTION' },
        { label: 'Question category', routerLink: ['/assessment/groups'], code: 'ASSESSMENT-QUESTION_GROUP' },
        { label: 'Exam', routerLink: ['/assessment/exams'], code: 'ASSESSMENT-EXAM' },
        { label: 'Question sheets', routerLink: ['/assessment/question-sheets'], code: 'ASSESSMENT-QUESTION_SHEET' },
      ]
    },
    {
      label: 'Competency', icon: 'linear_scale', code: 'COMPETENCY',
      items: [
        { label: 'Competency', routerLink: ['/competency/list'], code: 'COMPETENCY-LIST' },
        { label: 'Category', routerLink: ['/competency/groups'], code: 'COMPETENCY-GROUP' },
        { label: 'Competency matrix', routerLink: ['/competency/matrix'], code: 'COMPETENCY-MATRIX' },
      ]
    },
    {
      label: 'Analysis', icon: 'pie_chart', code: 'ANALYSIS',
      items: [
        { label: 'Report', routerLink: ['/analysis/reports'], code: 'ANALYSIS-REPORT' },
        { label: 'Chart', routerLink: ['/analysis/charts'], code: 'ANALYSIS-CHART' },
      ]
    },
    {
      label: 'Workflow', icon: 'widgets', code: 'WORKFLOW',
      items: [
        { label: 'Ticket', routerLink: ['/workflow/tickets'], code: 'WORKFLOW-TICKET' },
        { label: 'Hierachy', routerLink: ['/workflow/hierachy'], code: 'WORKFLOW-TREE' }
      ]
    },
    {
      label: 'Accounts', icon: 'people', code: 'ACCOUNT',
      items: [
        { label: 'User', routerLink: ['/account/users'], code: 'ACCOUNT-USER' },
        { label: 'Group', routerLink: ['/account/groups'], code: 'ACCOUNT-USER_GROUP' },
        { label: 'Permission', routerLink: ['/account/permissions'], code: 'ACCOUNT-PERMISSION' },
      ]
    },
    {
      label: 'Settings', icon: 'settings', code: 'SETTING',
      items: [
        { label: 'Exam', routerLink: ['/setting/exam'], code: 'SETTING-EXAM' },
      ]
    }
  ];

  private USER_MENU = [
    { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard'] },
    { label: '', separator: true, styleClass: 'menu-separator' },
    { label: 'My course', icon: 'school', routerLink: ['/lms/courses'] },
    { label: 'My exam', icon: 'alarm_add', routerLink: ['/lms/exams'] },
    { label: 'Conference', icon: 'perm_phone_msg', routerLink: ['/lms/meetings'] },
  ];

  constructor(private authService: AuthService) {
  }

  menuToTree(menu) {
    var tree = [];
    _.each(menu, ((menuItem: MenuItem) => {
      if (!menuItem.separator) {
        var node = this.convertMenuNodeToTreeNode(menuItem);
        tree.push(node);
      }
    }));
    return tree;
  }

  findMenuTreeNode(tree, code: string) {
    for (var i = 0; i < tree.length; i++) {
      var node = this.findSubMenuTreeNode(tree[i], code);
      if (node)
        return node;
    }
    return null;
  }

  private findSubMenuTreeNode(node, code: string) {
    if (node["data"] == code)
      return node;
    for (var i = 0; i < node.children.length; i++) {
      var subNode = this.findSubMenuTreeNode(node.children[i], code);
      if (subNode)
        return subNode;
    }
  }

  private convertMenuNodeToTreeNode(menuItem) {
    var node = menuItem;
    node["data"] = menuItem["code"];
    node["children"] = [];
    _.each(menuItem.items, ((menuSubItem: MenuItem) => {
      if (!menuSubItem.separator) {
        var subNode = this.convertMenuNodeToTreeNode(menuSubItem);
        node["children"].push(subNode);
      }
    }));
    return node;
  }

  adminMenu() {
    if (this.authService.UserProfile.IsSuperAdmin)
      return this.ADMIN_MENU;
    var menuCodes = []
    if (this.authService.UserPermission.menu_access)
      menuCodes = JSON.parse(this.authService.UserPermission.menu_access);
    var menu = [];
    _.each(this.ADMIN_MENU, ((menuItem: MenuItem) => {
      var allow = this.isAllowTowViewAdminMenu(menuItem, menuCodes);
      if (allow)
        menu.push(menuItem);
    }));
    return menu;
  }

  isAllowTowViewAdminMenu(menuItem, menuCodes): boolean {
    if (menuItem.separator || !menuItem["code"])
      return true;
    return _.contains(menuCodes, menuItem["code"]);
  }

  userMenu() {
    return this.USER_MENU;
  }

}
