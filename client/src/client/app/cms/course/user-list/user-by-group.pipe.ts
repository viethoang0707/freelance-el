import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Group } from '../../../shared/models/group.model';
import * as _ from 'underscore';

@Pipe({name: 'countUserInGroup', pure: false})
export class CountUserByGroupPipe implements PipeTransform {
  transform(group: Group, users: User[]): number {
    return _.filter(users, function(user) {
    	return !group.id || user.ui_access_group == group.id;
    }).length;
  }
}