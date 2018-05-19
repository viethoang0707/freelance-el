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
import { Course } from '../models/elearning/course.model';
import { Question } from '../models/elearning/question.model';
import { CourseMember } from '../models/elearning/course-member.model';
import { Exam } from '../models/elearning/exam.model';
import * as _ from 'underscore';
import * as moment from 'moment';
import { USER_STATUS, SERVER_DATETIME_FORMAT, COURSE_MODE, COURSE_STATUS } from '..//models/constants';

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
            groupCache.updateCache(record, method, this);
        }
        if (record.Model == User.Model) {
            var userCache = new UserCache();
            userCache.updateCache(record, method, this);
        }
        if (record.Model == Course.Model) {
            var courseCache = new CourseCache();
            courseCache.updateCache(record, method, this);
        }
        if (record.Model == Question.Model) {
            var questionCache = new QuestionCache();
            questionCache.updateCache(record, method, this);
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
    updateCache(record:T, method:string, cacheService: CacheService)
}

export class GroupCache implements ICache<Group> {
    updateCache(record: Group, method:string, cacheService: CacheService) {
        if (record.category == 'organization') {
            if (cacheService.hit('USER_GROUP')) {
                var groups = cacheService.load('USER_GROUP');
                if (method == 'CREATE')
                    groups.push(record);
                if (method == 'DELETE')
                    groups = _.reject(groups, (group:Group)=> {
                        return group.id == record.id;
                    });
            }
        }
        if (record.category == 'question') {
            if (cacheService.hit('QUESTION_GROUP')) {
                var groups = cacheService.load('QUESTION_GROUP');
                if (method == 'CREATE')
                    groups.push(record);
                if (method == 'DELETE')
                    groups = _.reject(groups, (group:Group)=> {
                        return group.id == record.id;
                    }));
            }
        }
        if (record.category == 'course') {
            if (cacheService.hit('COURSE_GROUP')) {
                var groups = cacheService.load('COURSE_GROUP');
                if (method == 'CREATE')
                    groups.push(record);
                if (method == 'DELETE')
                    groups = _.reject(groups, (group:Group)=> {
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
    updateCache(record: User, method:string, cacheService: CacheService) {
        if (cacheService.hit('USER')) {
            var users = cacheService.load('USER');
            if (method == 'CREATE')
                users.push(record);
            if (method == 'DELETE') {
                users = _.reject(users, (user:User)=> {
                    return user.id == record.id;
                });
                cacheService.save('USER',users);
            }
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
                return users = _.filter(users, (user:User)=> {
                    return user.is_admin;
                });
            });
        return User.search(context,[],"[('is_admin','=',True)]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                users = _.filter(users, (user:User)=> {
                    return user.group_id == groupId;
                });
            });
        return User.search(context,[], "[('group_id','=',"+groupId+")]");
    }

    static listByPermission(context:APIContext, permissionId):Observable<any> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                users = _.filter(users, (user:User)=> {
                    return user.permission_id == permissionId;
                });
            });
        return User.search(context,[], "[('permission_id','=',"+permissionId+")]");
    }
}



export class CourseCache implements ICache<Course> {
    updateCache(record: Course, method:string, cacheService: CacheService) {
        if (cacheService.hit('COURSE')) {
            var courses = cacheService.load('COURSE');
            if (method == 'CREATE')
                courses.push(record);
            if (method == 'DELETE') {
                courses = _.reject(courses, (course:Course)=> {
                    return course.id == record.id;
                });
                cacheService.save('COURSE',courses);
            }
        }
    }

    static all( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('COURSE'))
            return Observable.of(context.cacheService.load('COURSE'));
        return Course.search(context,[],'[]').do(courses=> {
            context.cacheService.save('COURSE',courses);
        });
    }

    static listByAuthor(context:APIContext, authorId):Observable<any> {
        if (context.cacheService.hit('COURSE'))
            return Observable.of(context.cacheService.load('COURSE')).map(courses=> {
                courses = _.filter(courses, (course:Course)=> {
                    return course.author_id == authorId;
                });
            });
        return Course.search(context,[], "[('author_id','=',"+authorId+")]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (context.cacheService.hit('COURSE'))
            return Observable.of(context.cacheService.load('COURSE')).map(courses=> {
                courses = _.filter(courses, (course:Course)=> {
                    return course.group_id == groupId;
                });
            });
        return Course.search(context,[], "[('group_id','=',"+groupId+")]");
    }

    static listByGroupAndMode(context:APIContext, groupId, mode):Observable<any> {
        if (context.cacheService.hit('COURSE'))
            return Observable.of(context.cacheService.load('COURSE')).map(courses=> {
                courses = _.filter(courses, (course:Course)=> {
                    return course.group_id == groupId && course.mode == mode;
                });
            });
        return Course.search(context,[], "[('group_id','=',"+groupId+"),('mode','=','"+mode+"')]");
    }

    static searchByDate(context:APIContext, start:Date, end:Date):Observable<any> {
        if (context.cacheService.hit('COURSE'))
            return Observable.of(context.cacheService.load('COURSE')).map(courses=> {
                courses = _.filter(courses, (course:Course)=> {
                    return course.create_date.getTime() >= start.getTime() && course.create_date.getTime() <= end.getTime();
                });
            });
        var startDateStr = moment(start).format(SERVER_DATETIME_FORMAT);
        var endDateStr = moment(end).format(SERVER_DATETIME_FORMAT);
        return Course.search(context,[],"[('create_date','>=','"+startDateStr+"'),('create_date','<=','"+endDateStr+"')]" );
    }
}

export class QuestionCache implements ICache<Question> {
    updateCache(record: Question, method:string, cacheService: CacheService) {
        if (cacheService.hit('QUESTION')) {
            var questions = cacheService.load('QUESTION');
            if (method == 'CREATE')
                questions.push(record);
            if (method == 'DELETE') {
                questions = _.reject(questions, (q:Question)=> {
                    return q.id == record.id;
                });
                cacheService.save('QUESTION',questions);
            }
        }
    }

    static all( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('QUESTION'))
            return Observable.of(context.cacheService.load('QUESTION'));
        return Question.search(context,[],'[]').do(questions=> {
            context.cacheService.save('QUESTION',questions);
        });
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (context.cacheService.hit('QUESTION'))
            return Observable.of(context.cacheService.load('QUESTION')).map(questions=> {
                questions = _.filter(questions, (q:Question)=> {
                    return q.group_id == groupId;
                });
            });
        return Question.search(context,[], "[('group_id','=',"+groupId+")]");
    }
}

export class ExamCache implements ICache<Exam> {
    updateCache(record: Exam, method:string, cacheService: CacheService) {
        if (cacheService.hit('EXAM')) {
            var exams = cacheService.load('EXAM');
            if (method == 'CREATE')
                exams.push(record);
            if (method == 'DELETE') {
                exams = _.reject(exams, (exam:Exam)=> {
                    return exam.id == record.id;
                });
                cacheService.save('EXAM',exams);
            }
        }
    }

    static all( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('EXAM'))
            return Observable.of(context.cacheService.load('EXAM'));
        return Exam.search(context,[],'[]').do(exams=> {
            context.cacheService.save('EXAM',exams);
        });
    }

}