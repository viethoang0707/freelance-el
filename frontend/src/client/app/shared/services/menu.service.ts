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

  protected onShowSettingReceiver: Subject<any> = new Subject();
  onShowSetting: Observable<any> = this.onShowSettingReceiver.asObservable();

  private ADMIN_MENU = [
    { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard/admin'], code: 'DASHBOARD', visible: true },
    { label: '', separator: true, styleClass: 'menu-separator' },
    {
      label: 'Course', icon: 'school', code: 'SCHOOL', visible: true,
      items: [
        { label: 'Course', routerLink: ['/course/list'], code: 'SCHOOL-COURSE', visible: true },
        { label: 'Enrollment', routerLink: ['/course/enrollments'], code: 'SCHOOL-ENROLLMENT', visible: true },
        { label: 'Course group', routerLink: ['/course/groups'], code: 'SCHOOL-GROUP', visible: true },
      ]
    },
    {
      label: 'Assessment', icon: 'grade', code: 'ASSESSMENT', visible: true,
      items: [
        { label: 'Question banks', routerLink: ['/assessment/questions'], code: 'ASSESSMENT-QUESTION', visible: true },
        { label: 'Question category', routerLink: ['/assessment/groups'], code: 'ASSESSMENT-QUESTION_GROUP', visible: true },
        { label: '', separator: true, styleClass: 'menu-separator' },
        { label: 'Exams', routerLink: ['/assessment/exams'], code: 'ASSESSMENT-EXAMS', visible: true },
        { label: 'Exam enrollments', routerLink: ['/assessment/exams/enrollment'], code: 'ASSESSMENT-EXAM_ENROLLMENTS', visible: true },
        { label: 'Question sheet templates', routerLink: ['/assessment/exams/sheets'], code: 'ASSESSMENT-EXAM_SHEET', visible: true },
        { label: '', separator: true, styleClass: 'menu-separator' },
        { label: 'Surveys', routerLink: ['/assessment/surveys'], code: 'ASSESSMENT-SURVEYS', visible: true },
        { label: 'Survey enrollments', routerLink: ['/assessment/surveys/enrollment'], code: 'ASSESSMENT-SURVEY_ENROLLMENTS', visible: true },
        { label: 'Survey sheet templates', routerLink: ['/assessment/surveys/sheets'], code: 'ASSESSMENT-SURVEY_SHEET', visible: true },
      ]
    },
    {
      label: 'Competency', icon: 'linear_scale', code: 'COMPETENCY', visible: true,
      items: [
        { label: 'Competency', routerLink: ['/competency/list'], code: 'COMPETENCY-LIST', visible: true },
        { label: 'Category', routerLink: ['/competency/groups'], code: 'COMPETENCY-GROUP', visible: true },
        { label: 'Competency matrix', routerLink: ['/competency/matrix'], code: 'COMPETENCY-MATRIX', visible: true },
      ]
    },
    {
      label: 'Analysis', icon: 'pie_chart', code: 'ANALYSIS', visible: true,
      items: [
        { label: 'Report', routerLink: ['/analysis/reports'], code: 'ANALYSIS-REPORT', visible: true },
        { label: 'Chart', routerLink: ['/analysis/charts'], code: 'ANALYSIS-CHART', visible: true },
      ]
    },
    {
      label: 'Workflow', icon: 'widgets', code: 'WORKFLOW', visible: true,
      items: [
        { label: 'Ticket', routerLink: ['/workflow/tickets'], code: 'WORKFLOW-TICKET', visible: true },
        { label: 'Hierachy', routerLink: ['/workflow/hierachy'], code: 'WORKFLOW-TREE', visible: true }
      ]
    },
    {
      label: 'Accounts', icon: 'people', code: 'ACCOUNT', visible: true,
      items: [
        { label: 'User', routerLink: ['/account/users'], code: 'ACCOUNT-USER', visible: true },
        { label: 'Group', routerLink: ['/account/groups'], code: 'ACCOUNT-USER_GROUP', visible: true },
        { label: 'Permission', routerLink: ['/account/permissions'], code: 'ACCOUNT-PERMISSION', visible: true },
      ]
    },
    {
      label: 'Settings', icon: 'settings', code: 'SETTING', visible: true,
      items: [
        {
          label: 'System', code: 'SETTING-SYSTEM', command: () => {
            this.onShowSettingReceiver.next()
          }, visible: true
        },
        { label: 'Mail templates', routerLink: ['/settings/mails'], code: 'SETTING-MAIL', visible: true },
      ]
    }
  ];

  private USER_MENU = [
    { label: 'Dashboard', icon: 'dashboard', routerLink: ['/dashboard/lms'], visible: true },
    { label: '', separator: true, styleClass: 'menu-separator', visible: true }
    { label: 'My courses', icon: 'school', routerLink: ['/lms/courses'], visible: true },
    { label: 'My exams', icon: 'alarm_add', routerLink: ['/lms/exams'], visible: true },
    { label: 'My surveys', icon: 'question_answer', routerLink: ['/lms/surveys'], visible: true },
    { label: 'My conference', icon: 'perm_phone_msg', routerLink: ['/lms/meetings'], visible: true },
    { label: '', separator: true, styleClass: 'menu-separator', visible: true },
    { label: 'Course search', icon: 'search', routerLink: ['/lms/courses/search'], visible: true },
    { label: 'Course recommend', icon: 'stars', routerLink: ['/lms/courses/recommend'], visible: true },
  ];


  constructor(private authService: AuthService) {
  }

  menuToTree(menu) {
    var tree = [];
    _.each(menu, ((menuItem: MenuItem) => {
      if (!menuItem.separator) {
        var node = this.convertMenuNodeToTreeNode(menuItem);
        node.expanded = true;
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
    _.each(menuItem.items, (menuSubItem: MenuItem) => {
      if (!menuSubItem.separator) {
        var subNode = this.convertMenuNodeToTreeNode(menuSubItem);
        node["children"].push(subNode);
      }
    });
    return node;
  }


  adminMenu() {
    if (this.authService.UserProfile.IsSuperAdmin)
      return this.ADMIN_MENU;
    var menuCodes = []
    if (this.authService.UserPermission && this.authService.UserPermission.menu_access)
      menuCodes = JSON.parse(this.authService.UserPermission.menu_access);
    _.each(this.ADMIN_MENU, (menuItem: MenuItem) => {
      if (menuItem.separator || _.contains(menuCodes, menuItem["code"]))
        menuItem.visible = true;
      else {
        menuItem.visible = false;
        for (var i = 0; i < menuItem.items.length; i++) {
          var subMenuItem = menuItem.items[i];
          if (subMenuItem["separator"] || _.contains(menuCodes, subMenuItem["code"])) {
            menuItem.visible = true;
            subMenuItem["visible"] = true;
          } else {
            subMenuItem["visible"] = false;
          }
        }
      }
    });
    return this.ADMIN_MENU;
  }


  userMenu() {
    return this.USER_MENU;
  }

}
