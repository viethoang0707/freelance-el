import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { CloudAccount } from '../models/cloud/cloud-account.model';
import { MapUtils } from '../helpers/map.utils';
import { SettingService } from '../../shared/services/setting.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseModel } from '../models/base.model';
import { APIContext } from '../models/context';
import { Group } from '../models/elearning/group.model';

const CACHE_TIMEOUT = 1000 * 60 * 5;

@Injectable()
export class CacheService {

    inlineStorage: any;

    constructor() {
        this.inlineStorage = {};
    }

    objectChage(record, method) {
        if (record.Model == Group.Model) {
            var groupCache = new GroupCache();
            groupCache.updateCache(record, method);
        }
    }


    save(key:string, val:any) {
          this.inlineStorage[key] =  {val:val, timestamp:new Date()};
    }

    load(key:string): any {
        if (key in this.inlineStorage)
            return this.inlineStorage[key]["val"];
        return null;
    }

    hit(key:string):boolean {
      if (key in this.inlineStorage) {
          var now = new Date();
          let timestamp:Date = this.inlineStorage[key]["timestamp"];
          var success =  (now.getTime() - timestamp.getTime()) <= CACHE_TIMEOUT;
          if (!success)
              this.invalidate(key);
          return success;
      }
      return false;
    }

    invalidate(key:string) {
        delete this.inlineStorage[key];
    }

    invalidateAll() {
        this.inlineStorage = [];
    }

}

export interface ICache<T extends BaseModel> {
    updateCache(record:T, method:string):boolean
}

export class GroupCache implements ICache<Group> {
    updateCache(record: Group, method) {
        if (record.category == 'organization') {
            if (context.cacheService.hit('USER_GROUP')) {
                var groups = context.cacheService.load('USER_GROUP');
                if (method == 'CREATE')
                    groups.push(record);
                if (method == 'DELETE')
                    groups = _.reject(groups, (group=> {
                        return group.id == record.id;
                    }));
            }
        }
        if (record.category == 'question') {
            if (context.cacheService.hit('QUESTION_GROUP')) {
                var groups = context.cacheService.load('QUESTION_GROUP');
                if (method == 'CREATE')
                    groups.push(record);
                if (method == 'DELETE')
                    groups = _.reject(groups, (group=> {
                        return group.id == record.id;
                    }));
            }
        }
        if (record.category == 'course') {
            if (context.cacheService.hit('COURSE_GROUP')) {
                var groups = context.cacheService.load('COURSE_GROUP');
                if (method == 'CREATE')
                    groups.push(record);
                if (method == 'DELETE')
                    groups = _.reject(groups, (group=> {
                        return group.id == record.id;
                    }));
            }
        }
    }

    static listUserGroup(context:APIContext):Observable<any> {
        if (context.cacheService.hit('USER_GROUP'))
            return Observable.of(context.cacheService.load('USER_GROUP'));
        return Group.search(context,[], "[('category','=','organization')]").do(groups=> {
            context.cacheService.save('USER_GROUP', groups);
        });
    }

    static listQuestionGroup(context:APIContext):Observable<any> {
        if (context.cacheService.hit('QUESTION_GROUP'))
            return Observable.of(context.cacheService.load('QUESTION_GROUP'));
        return Group.search(context,[], "[('category','=','question')]").do(groups=> {
            context.cacheService.save('QUESTION_GROUP', groups);
        });
    }

    static listCourseGroup(context:APIContext):Observable<any> {
        if (context.cacheService.hit('COURSE_GROUP'))
            return Observable.of(context.cacheService.load('COURSE_GROUP'));
        return Group.search(context,[], "[('category','=','course')]").do(groups=> {
            context.cacheService.save('COURSE_GROUP', groups);
        });
    }

}


export class UserCache implements ICache<User> {
    updateCache(record: User, method) {
        if (context.cacheService.hit('USER')) {
            var users = context.cacheService.load('USER');
            if (method == 'CREATE')
                users.push(record);
            if (method == 'DELETE')
                users = _.reject(users, (user=> {
                    return user.id == record.id;
                }));
        }
    }

    static all( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER'));
        return User.search(context,[],"[('login','!=','admin')]").do(users=> {
            context.cacheService.save('USER',users);
        });
    }

    static allAdmin( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                users = _.filter(users, user=> {
                    return user.is_admin;
                });
            });
        return User.search(context,[],"[('is_admin','=',True)]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                users = _.filter(users, user=> {
                    return user.group_id == groupId;
                });
            });
        return User.search(context,[], "[('group_id','=',"+groupId+")]");
    }

    static listByPermission(context:APIContext, permissionId):Observable<any> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                users = _.filter(users, user=> {
                    return user.permission_id == permissionId;
                });
            });
        return User.search(context,[], "[('permission_id','=',"+permissionId+")]");
    }


}