import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import { AuthService } from './auth.service';
import { AppEventManager } from './app-event-manager.service';
import { SettingService } from './setting.service';
import { ModelAPIService } from './api/model-api.service';
import 'rxjs/add/operator/map';
import { BaseComponent } from '../components/base/base.component';
import { Course } from '../models/elearning/course.model';
import { User } from '../models/elearning/user.model';
import { CourseMember } from '../models/elearning/course-member.model';
import * as _ from 'underscore';
import { TreeUtils } from '../helpers/tree.utils';
import { TreeNode } from 'primeng/api';
import { ConferenceMember } from '../models/elearning/conference-member.model';
import { Conference } from '../models/elearning/conference.model'; import {
  SURVEY_STATUS, CONTENT_STATUS, COURSE_MODE, COURSE_MEMBER_ROLE, PROJECT_STATUS,
  COURSE_MEMBER_STATUS, COURSE_MEMBER_ENROLL_STATUS, COURSE_UNIT_TYPE, EXAM_STATUS
} from '../models/constants'
import { SelectUsersDialog } from '../components/select-user-dialog/select-user-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { CourseFaq } from '../models/elearning/course-faq.model';
import { CourseMaterial } from '../models/elearning/course-material.model';
import { CourseSyllabus } from '../models/elearning/course-syllabus.model';
import { SyllabusUtils } from '../helpers/syllabus.utils';
import { CourseUnit } from '../models/elearning/course-unit.model';
import { Submission } from '../models/elearning/submission.model';
import { CourseLog } from '../models/elearning/log.model';
import { SelectItem } from 'primeng/api';
import { Exam } from '../models/elearning/exam.model';
import { ExamMember } from '../models/elearning/exam-member.model';
import { ExamQuestion } from '../models/elearning/exam-question.model';
import { Group } from '../models/elearning/group.model';
import { ReportUtils } from '../helpers/report.utils';
import { Route, } from '@angular/router';
import { ClassExam } from '../models/elearning/class-exam.model';
import { Certificate } from '../models/elearning/course-certificate.model';
import { MeetingService } from '../services/meeting.service';
import { Project } from '../models/elearning/project.model';
import { ProjectSubmission } from '../models/elearning/project-submission.model';
import { CourseClass } from '../models/elearning/course-class.model';
import { BaseModel } from '../models/base.model';
import { Survey } from '../models/elearning/survey.model';
import { SurveyMember } from '../models/elearning/survey-member.model';
import { ClassSurvey } from '../models/elearning/class-survey.model';
import { ExamGrade } from '../models/elearning/exam-grade.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Token } from '../models/cloud/token.model';
import { APIContext } from '../models/context';
import * as _ from 'underscore';

@Injectable()
export class LMSService {

  private myCourseMembers: CourseMember[];
  private myClassMembers: CourseMember[];
  private __myCourseMembers__dirty: boolean;
  private __myCourseMembers__touch: boolean;
  private myExamMembers: ExamMember[];
  private __myExamMembers__dirty: boolean;
  private __myExamMembers__touch: boolean;
  private mySurveyMembers: SurveyMember[];
  private __mySurveyMembers__dirty: boolean;
  private __mySurveyMembers__touch: boolean;
  private myConferenceMembers: ConferenceMember[];
  private __myConferenceMembers__dirty: boolean;
  private __myConferenceMembers__touch: boolean;

  private initialized: boolean;

  constructor(private settingService: SettingService, private appEvent: AppEventManager) {
    this.settingService.viewModeEvents.subscribe(() => {
      this.clearAll();
    });
    this.appEvent.onLogin.subscribe(() => {
      this.clearAll();
    });
    this.appEvent.onLogout.subscribe(() => {
      this.clearAll();
    });
    this.appEvent.onTokenExpired.subscribe(() => {
      this.clearAll();
    });
    this.clearAll();
  }

  private clearAll() {
    this.initialized = false;
    this.myCourseMembers = [];
    this.myClassMembers = [];
    this.__myCourseMembers__dirty = false;
    this.__myCourseMembers__touch = false;
    this.myExamMembers = [];
    this.__myExamMembers__dirty = false;
    this.__myExamMembers__touch = false;
    this.mySurveyMembers = [];
    this.__mySurveyMembers__dirty = false;
    this.__mySurveyMembers__touch = false;
    this.mySurveyMembers = [];
    this.__mySurveyMembers__dirty = false;
    this.__mySurveyMembers__touch = false;
    this.myConferenceMembers = [];
    this.__myConferenceMembers__dirty = false;
    this.__myConferenceMembers__touch = false;
  }

  init(context: APIContext): Observable<any> {
    if (this.initialized)
      return Observable.of([]);
    var userId = context.authService.UserProfile.id;
    return BaseModel.bulk_search(context,
      CourseMember.__api__listByUser(userId),
      ExamMember.__api__listByUser(userId),
      ConferenceMember.__api__listByUser(userId),
      SurveyMember.__api__listByUser(userId)
    )
      .flatMap(jsonArray => {
        this.myCourseMembers = _.filter(CourseMember.toArray(jsonArray[0]), (member:CourseMember)=> {
            return isFinite(parseInt(member.course_id+"")) && member.status =='active';
        });
        this.myClassMembers = _.filter(this.myCourseMembers, (member:CourseMember)=> {
            return isFinite(parseInt(member.class_id+"");
        });
        this.myExamMembers = _.filter(ExamMember.toArray(jsonArray[1]), (member:ExamMember)=> {
            return isFinite(parseInt(member.exam_id+"")) && member.status =='active';
        });
        this.myConferenceMembers = _.filter(ConferenceMember.toArray(jsonArray[2]), (member:ConferenceMember)=> {
            return isFinite(parseInt(member.conference_id+"")) && member.conference_status == 'open' && member.is_active;
        });
        this.mySurveyMembers = _.filter(SurveyMember.toArray(jsonArray[3]), (member:SurveyMember)=> {
            return isFinite(parseInt(member.survey_id+"");
        });
        this.__myCourseMembers__touch = true;
        this.__myExamMembers__touch = true;
        this.__mySurveyMembers__touch = true;
        this.__myConferenceMembers__touch = true;
        if (this.myCourseMembers.length == 0 && this.myExamMembers.length == 0
          && this.mySurveyMembers.length == 0 && this.myConferenceMembers.length == 0) {
          this.initialized = true;
          return Observable.of([]);
        }
        var classIds = _.pluck(this.myClassMembers,'class_id');
        var courseIds = _.pluck(this.myCourseMembers,'course_id');
        var examIds = _.pluck(this.myExamMembers,'exam_id');
        var conferenceIds = _.pluck(this.myConferenceMembers,'conference_id');
        var surveyIds = _.pluck(this.mySurveyMembers,'survey_id');
        return BaseModel.bulk_list(context,
            Course.__api__get(courseIds),
            CourseClass.__api__get(classIds),
            Exam.__api__get(examIds),
            Conference.__api__get(conferenceIds),
            Survey.__api__get(surveyIds)
          ).do(jsonArr1=> {
            var courses = Course.toArray(jsonArr1[0]);
            _.each(this.myCourseMembers, (member:CourseMember)=> {
                member.course =  _.find(courses, (course:Course)=> {
                    return member.course_id == course.id;
                });
            });
            var classList = Course.toArray(jsonArr1[1]);
            _.each(this.myClassMembers, (member:CourseMember)=> {
                member.clazz =  _.find(classList, (clazz:CourseClass)=> {
                    return member.class_id == clazz.id;
                });
            });
            var exams = Exam.toArray(jsonArr1[2]);
            _.each(this.myExamMembers, (member:ExamMember)=> {
                member.exam =  _.find(exams, (exam:Exam)=> {
                    return member.exam_id == exam.id;
                });
            });
            var conferences = Conference.toArray(jsonArr1[3]);
            _.each(this.myConferenceMembers, (member:ConferenceMember)=> {
                member.conference =  _.find(conferences, (conf:Conference)=> {
                    return member.conference_id == conf.id;
                });
            });
            var surveys = Survey.toArray(jsonArr1[4]);
            _.each(this.mySurveyMembers, (member:SurveyMember)=> {
                member.survey =  _.find(surveys, (survey:Survey)=> {
                    return member.survey_id == survey.id;
                });
            });
            this.initialized = true;
          });
      });
  }

  get MyCourseMember() :CourseMember[] {
    return this.myCourseMembers;
  }

  get MyClassMember() : CourseMember[] {
    return this.myClassMembers;
  }

  get MyExamMember() : ExamMember[] {
    return this.myExamMembers;
  }

  get MyConferenceMember() : ConferenceMember[] {
    return this.myConferenceMembers;
  }

  get MySurveyMember(): SurveyMember[] {
    return this.mySurveyMembers;
  }

  get MyCourse(): Course[] {
    var courses = _.map(this.myCourseMembers, (member: CourseMember)=> {
      return member.course;
    });
    return _.uniq(courses, (course:Course)=> {
      return course.id;
    });
  }

  get MyClass(): CourseClass[] {
    var classes = _.map(this.myCourseMembers, (member: CourseMember)=> {
      return member.clazz;
    });
    return _.uniq(classes, (clazz:CourseClass)=> {
      return clazz.id;
    });
  }

  get MyConference(): Conference[] {
    var conferences = _.map(this.myConferenceMembers, (member: ConferenceMember)=> {
      return member.conference;
    });
    return _.uniq(conferences, (conf:Conference)=> {
      return conf.id;
    });
  }

  get MyExam(): Exam[] {
    var exams = _.map(this.myExamMembers, (member: ExamMember)=> {
      return member.exam;
    });
    return _.uniq(exams, (exam:Exam)=> {
      return exam.id;
    });
  }

  get MySurvey(): Survey[] {
    var surveys = _.map(this.mySurveyMembers, (member: SurveyMember)=> {
      return member.survey;
    });
    return _.uniq(surveys, (survey:Survey)=> {
      return survey.id;
    });
  }


  

}