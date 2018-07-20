import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { Token } from '../models/cloud/token.model';
import { MapUtils } from '../helpers/map.utils';
import { AuthService } from './auth.service'
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/primeng';
import * as _ from 'underscore';

@Injectable()
export class MenuService {

    private ADMIN_MENU = [
                { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard/admin'] , code:'DASHBOARD'},
                { label: '', separator: true, styleClass: 'menu-separator' },
                {
                    label: 'Course', icon: 'school', code:'SCHOOL',
                    items: [
                        { label: 'Course', routerLink: ['/course/courses'] ,code:'SCHOOL-COURSE'}, 
                        { label: 'Enrollment', routerLink: ['/course/enrollment'] ,code:'SCHOOL-ENROLLMENT'}, 
                        { label: 'Course group', routerLink: ['/course/groups'] ,code:'SCHOOL-GROUP'},
                    ]
                },
                {
                    label: 'Assessment', icon: 'grade',code:'ASSESSMENT',
                    items: [
                        { label: 'Question banks', routerLink: ['/assessment/questions'],code:'ASSESSMENT-QUESTION' },
                        { label: 'Question category', routerLink: ['/assessment/groups'],code:'ASSESSMENT-QUESTION_GROUP' },
                        { label: '', separator: true, styleClass: 'menu-separator' },
                        { label: 'Exams', routerLink: ['/assessment/exams'],code:'ASSESSMENT-EXAMS' },
                        { label: 'Exam enrollments', routerLink: ['/assessment/exam-enrollments'],code:'ASSESSMENT-EXAM_ENROLLMENTS' },
                        { label: 'Question sheet templates', routerLink: ['/assessment/question-sheets'],code:'ASSESSMENT-QUESTION_SHEET' },
                        { label: '', separator: true, styleClass: 'menu-separator' },
                        { label: 'Surveys', routerLink: ['/assessment/surveys'],code:'ASSESSMENT-SURVEYS' },
                        { label: 'Survey enrollments', routerLink: ['/assessment/survey-enrollments'],code:'ASSESSMENT-SURVEY_ENROLLMENTS' },
                        { label: 'Survey sheet templates', routerLink: ['/assessment/survey-sheets'],code:'ASSESSMENT-SURVEY_SHEET' },
                    ]
                },
                {
                    label: 'Competency', icon: 'linear_scale',code:'COMPETENCY',
                    items: [
                        { label: 'Competency', routerLink: ['/competency/list'],code:'COMPETENCY-LIST' },
                        { label: 'Category', routerLink: ['/competency/groups'],code:'COMPETENCY-GROUP' },
                        { label: 'Competency matrix', routerLink: ['/competency/matrix'] ,code:'COMPETENCY-MATRIX'},
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
                    label: 'Workflow', icon: 'widgets',code:'WORKFLOW',
                    items: [
                        { label: 'Ticket', routerLink: ['/workflow/tickets'],code:'WORKFLOW-TICKET' },
                        { label: 'Hierachy', routerLink: ['/workflow/hierachy'],code:'WORKFLOW-TREE' }
                    ]
                },
                {
                    label: 'Accounts', icon: 'people',code:'ACCOUNT',
                    items: [
                        { label: 'User', routerLink: ['/account/users'],code:'ACCOUNT-USER' },
                        { label: 'Group', routerLink: ['/account/groups'],code:'ACCOUNT-USER_GROUP' },
                        { label: 'Permission', routerLink: ['/account/permissions'],code:'ACCOUNT-PERMISSION' },
                    ]
                },
                {
                    label: 'Settings', icon: 'settings',code:'SETTING',
                }
            ];

    private USER_MENU = [
                { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard/lms'] },
                { label: '', separator: true, styleClass: 'menu-separator' },
                { label: 'My courses', icon: 'school', routerLink: ['/dashboard/courses'] },
                { label: 'My exams', icon: 'alarm_add', routerLink: ['/dashboard/exams'] },
                { label: 'My surveys', icon: 'question_answer', routerLink: ['/dashboard/surveys'] },
                { label: 'My conference', icon: 'perm_phone_msg', routerLink: ['/dashboard/meetings'] },
                 { label: '', separator: true, styleClass: 'menu-separator' },
                 { label: 'Course search', icon: 'search', routerLink: ['/dashboard/courses/search'] },
                 { label: 'Course recommend', icon: 'stars', routerLink: ['/dashboard/courses/recommend'] },
            ];


  constructor(private authService: AuthService) {
  }

  menuToTree(menu) {
    var tree = [];
    _.each(menu, ((menuItem: MenuItem) => {
      if (!menuItem.separator) {
        var node = this.convertMenuNodeToTreeNode(menuItem);
        node.expanded =  true;
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
    if (this.authService.UserPermission && this.authService.UserPermission.menu_access)
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
