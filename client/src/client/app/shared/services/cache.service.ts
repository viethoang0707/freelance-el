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
import { ExamSetting } from '../models/elearning/exam-setting.model';
import { ExamGrade } from '../models/elearning/exam-grade.model';
import * as _ from 'underscore';
import * as moment from 'moment';
import { Competency } from '../models/elearning/competency.model';
import { CompetencyLevel } from '../models/elearning/competency-level.model';
import { USER_STATUS, SERVER_DATETIME_FORMAT, COURSE_MODE, CONTENT_STATUS } from '..//models/constants';

const CACHE_TIMEOUT = 1000 * 60 * 5;

@Injectable()
export class CacheService {

    private inlineStorage: any;

    constructor() {
        this.inlineStorage = {};
    }

    objectChage(record, method) {
        var cache = null;
        if (record.Model == Group.Model) 
            cache = new GroupCache();
        if (record.Model == User.Model) 
            cache = new UserCache();
        if (record.Model == Course.Model) 
            cache = new CourseCache();
        if (record.Model == Question.Model) 
            cache = new QuestionCache();
        if (record.Model == Exam.Model) 
            cache = new ExamCache();
        if (record.Model == Competency.Model) 
            cache = new CompetencyCache();
        if (record.Model == CompetencyLevel.Model) 
            cache = new CompetencyLevelCache();
        if (cache)
            cache.updateCache(record, method, this);
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
                cacheService.save('USER_GROUP',groups);
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
                    });
                cacheService.save('QUESTION_GROUP',groups);
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
                    });
                cacheService.save('COURSE_GROUP',groups);
            }
        }
        if (record.category == 'competency') {
            if (cacheService.hit('COMPETENCY_GROUP')) {
                var groups = cacheService.load('COMPETENCY_GROUP');
                if (method == 'CREATE')
                    groups.push(record);
                if (method == 'DELETE')
                    groups = _.reject(groups, (group:Group)=> {
                        return group.id == record.id;
                    });
                cacheService.save('COMPETENCY_GROUP',groups);
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

    static listCompetencyGroup(context:APIContext):Observable<any> {
        if (context.cacheService.hit('COMPETENCY_GROUP'))
            return Observable.of(context.cacheService.load('COMPETENCY_GROUP'));
        return Group.search(context,[], "[('category','=','competency')]").do(groups=> {
            context.cacheService.save('COMPETENCY_GROUP', groups);
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

    static countAll( context:APIContext): Observable<any> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER').length);
        return User.count(context,"[('login','!=','admin')]");
    }

    static allAdmin( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                return  _.filter(users, (user:User)=> {
                    return user.is_admin;
                });
            });
        return User.search(context,[],"[('is_admin','=',True)]");
    }

    static countAllAdmin( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                users = _.filter(users, (user:User)=> {
                    return user.is_admin;
                });
                return users.length;
            });
        return User.count(context,"[('is_admin','=',True)]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                users = _.filter(users, (user:User)=> {
                    return user.group_id == groupId;
                });
                return users;
            });
        return User.search(context,[], "[('group_id','=',"+groupId+")]");
    }

    static listByPermission(context:APIContext, permissionId):Observable<any> {
        if (context.cacheService.hit('USER'))
            return Observable.of(context.cacheService.load('USER')).map(users=> {
                users = _.filter(users, (user:User)=> {
                    return user.permission_id == permissionId;
                });
                return users;
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
                return courses;
            });
        return Course.search(context,[], "[('author_id','=',"+authorId+")]");
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (context.cacheService.hit('COURSE'))
            return Observable.of(context.cacheService.load('COURSE')).map(courses=> {
                courses = _.filter(courses, (course:Course)=> {
                    return course.group_id == groupId;
                });
                return courses;
            });
        return Course.search(context,[], "[('group_id','=',"+groupId+")]");
    }

    static listByGroupAndMode(context:APIContext, groupId, mode):Observable<any> {
        if (context.cacheService.hit('COURSE'))
            return Observable.of(context.cacheService.load('COURSE')).map(courses=> {
                courses = _.filter(courses, (course:Course)=> {
                    return course.group_id == groupId && course.mode == mode;
                });
                return courses;
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
                return questions;
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

export class ExamSettingCache implements ICache<ExamSetting> {
    
    updateCache(record: ExamSetting, method:string, cacheService: CacheService) {
        if (cacheService.hit('EXAM_SETTING')) {
            var settings = cacheService.load('EXAM_SETTING');
            if (method == 'CREATE')
                settings.push(record);
            if (method == 'DELETE') {
                settings = _.reject(settings, (setting:ExamSetting)=> {
                    return setting.id == record.id;
                });
                cacheService.save('EXAM_SETTING',settings);
            }
        }
    }

    static all( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('EXAM_SETTING'))
            return Observable.of(context.cacheService.load('EXAM_SETTING'));
        return ExamSetting.search(context,[],'[]').do(settings=> {
            context.cacheService.save('EXAM_SETTING',settings);
        });
    }

}

export class ExamGradeCache implements ICache<ExamGrade> {
    
    updateCache(record: ExamGrade, method:string, cacheService: CacheService) {
        if (cacheService.hit('EXAM_GRADE')) {
            var grades = cacheService.load('EXAM_GRADE');
            if (method == 'CREATE')
                grades.push(record);
            if (method == 'DELETE') {
                grades = _.reject(grades, (grade:ExamGrade)=> {
                    return grade.id == record.id;
                });
                cacheService.save('EXAM_GRADE',grades);
            }
        }
    }

    static all( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('EXAM_GRADE'))
            return Observable.of(context.cacheService.load('EXAM_GRADE'));
        return ExamGrade.search(context,[],'[]').do(grades=> {
            context.cacheService.save('EXAM_GRADE',grades);
        });
    }

}

export class CompetencyCache implements ICache<Competency> {
    
    updateCache(record: CompetencyCache, method:string, cacheService: CacheService) {
        if (cacheService.hit('COMPETENCY')) {
            var competencies = cacheService.load('COMPETENCY');
            if (method == 'CREATE')
                competencies.push(record);
            if (method == 'DELETE') {
                competencies = _.reject(competencies, (competency:Competency)=> {
                    return competency.id == record.id;
                });
                cacheService.save('COMPETENCY',competencies);
            }
        }
    }

    static all( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('COMPETENCY'))
            return Observable.of(context.cacheService.load('COMPETENCY'));
        return Competency.search(context,[],'[]').do(competencies=> {
            context.cacheService.save('COMPETENCY',competencies);
        });
    }

    static listByGroup(context:APIContext, groupId):Observable<any> {
        if (context.cacheService.hit('COMPETENCY'))
            return Observable.of(context.cacheService.load('COMPETENCY')).map(competencies=> {
                competencies = _.filter(competencies, (c:Competency)=> {
                    return c.group_id == groupId;
                });
                return competencies;
            });
        return Competency.search(context,[], "[('group_id','=',"+groupId+")]");
    }

}

export class CompetencyLevelCache implements ICache<CompetencyLevel> {
    
    updateCache(record: CompetencyLevel, method:string, cacheService: CacheService) {
        if (cacheService.hit('COMPETENCY_LEVEL')) {
            var levels = cacheService.load('COMPETENCY_LEVEL');
            if (method == 'CREATE')
                levels.push(record);
            if (method == 'DELETE') {
                levels = _.reject(levels, (level:CompetencyLevel)=> {
                    return level.id == record.id;
                });
                cacheService.save('COMPETENCY_LEVEL',levels);
            }
        }
    }

    static all( context:APIContext): Observable<any[]> {
        if (context.cacheService.hit('COMPETENCY_LEVEL'))
            return Observable.of(context.cacheService.load('COMPETENCY_LEVEL'));
        return CompetencyLevel.search(context,[],'[]').do(levels=> {
            context.cacheService.save('COMPETENCY_LEVEL',levels);
        });
    }

    static listByCompetency(context:APIContext, competencyId):Observable<any> {
        if (context.cacheService.hit('COMPETENCY_LEVEL'))
            return Observable.of(context.cacheService.load('COMPETENCY_LEVEL')).map(levels=> {
                levels = _.filter(levels, (l:CompetencyLevel)=> {
                    return l.competency_id == competencyId;
                });
                return levels;
            });
        return CompetencyLevel.search(context,[], "[('competency_id','=',"+competencyId+")]");
    }

}