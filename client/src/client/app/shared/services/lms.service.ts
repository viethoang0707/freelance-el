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
import { Certificate } from '../models/elearning/course-certificate.model';
import { MeetingService } from '../services/meeting.service';
import { Project } from '../models/elearning/project.model';
import { ProjectSubmission } from '../models/elearning/project-submission.model';
import { CourseClass } from '../models/elearning/course-class.model';
import { BaseModel } from '../models/base.model';
import { Survey } from '../models/elearning/survey.model';
import { SurveyMember } from '../models/elearning/survey-member.model';
import { ExamGrade } from '../models/elearning/exam-grade.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Token } from '../models/cloud/token.model';
import { APIContext } from '../models/context';

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
  private myClassExams: any;
  private __myClassExams__dirty: boolean;
  private __myClassExams__touch: boolean;
  private myClassSurveys: any;
  private __myClassSurveys__dirty: boolean;
  private __myClassSurveys__touch: boolean;
  private myProjects: any;
  private __myProjects__dirty: boolean;
  private __myProjects__touch: boolean;


  private mySyllabus: CourseSyllabus[];
  private myUnits: any;
  private myFaqs: any;
  private myMaterials: any;
  private __mySyllabus__dirty: boolean;
  private __mySyllabus__touch: boolean;

  private initialized: boolean;
  private syllabusInitialized: boolean;
  private classInitialized: boolean;
  private courseAnalyticInitialized: boolean;
  private examAnalyticInitialized: boolean;
  private courseLogInitialized: boolean;

  private reportUtils: ReportUtils;

  constructor(private settingService: SettingService, private appEvent: AppEventManager) {
    this.settingService.viewModeEvents.subscribe(() => {
      this.invalidateAllll();
    });
    this.appEvent.onLogin.subscribe(() => {
      this.invalidateAllll();
    });
    this.appEvent.onLogout.subscribe(() => {
      this.invalidateAllll();
    });
    this.appEvent.onTokenExpired.subscribe(() => {
      this.invalidateAllll();
    });
    this.invalidateAllll();
    this.reportUtils = new ReportUtils();
  }

  invalidateAllll() {
    this.initialized = false;
    this.courseAnalyticInitialized = false;
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

    this.invalidateCourseContent();
    this.invalidateClassContent();

  }

  invalidateCourseContent() {
    this.syllabusInitialized = false;
    this.mySyllabus = [];
    this.__mySyllabus__touch = false;
    this.__mySyllabus__dirty = false;
    this.myUnits = {};
    this.myFaqs = {};
    this.myMaterials = {};
    this.myCourseMembers = [];
    this.myClassMembers = [];
    this.__myCourseMembers__dirty = false;
    this.__myCourseMembers__touch = false;
  }

  invalidateClassContent() {
    this.classInitialized = false;
    this.myClassExams = {};
    this.__myClassExams__dirty = false;
    this.__myClassExams__touch = false;
    this.myProjects = {};
    this.__myProjects__dirty = false;
    this.__myProjects__touch = false;
    this.myClassSurveys = {};
    this.__myClassSurveys__dirty = false;
    this.__myClassSurveys__touch = false;
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
        this.myCourseMembers = _.filter(CourseMember.toArray(jsonArray[0]), (member: CourseMember) => {
          return isFinite(parseInt(member.course_id + "")) && member.status == 'active';
        });
        this.myClassMembers = _.filter(this.myCourseMembers, (member: CourseMember) => {
          return isFinite(parseInt(member.class_id + ""));
        });
        this.myExamMembers = _.filter(ExamMember.toArray(jsonArray[1]), (member: ExamMember) => {
          return isFinite(parseInt(member.exam_id + "")) && member.status == 'active';
        });
        this.myConferenceMembers = _.filter(ConferenceMember.toArray(jsonArray[2]), (member: ConferenceMember) => {
          return isFinite(parseInt(member.conference_id + "")) && member.conference_status == 'open' && member.is_active;
        });
        this.mySurveyMembers = _.filter(SurveyMember.toArray(jsonArray[3]), (member: SurveyMember) => {
          return isFinite(parseInt(member.survey_id + ""));
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
        var classIds = _.pluck(this.myClassMembers, 'class_id');
        var courseIds = _.pluck(this.myCourseMembers, 'course_id');
        var examIds = _.pluck(this.myExamMembers, 'exam_id');
        var conferenceIds = _.pluck(this.myConferenceMembers, 'conference_id');
        var surveyIds = _.pluck(this.mySurveyMembers, 'survey_id');
        return BaseModel.bulk_list(context,
          Course.__api__get(courseIds),
          CourseClass.__api__get(classIds),
          Exam.__api__get(examIds),
          Conference.__api__get(conferenceIds),
          Survey.__api__get(surveyIds)
        ).flatMap(jsonArr1 => {
          var courses = Course.toArray(jsonArr1[0]);
          _.each(this.myCourseMembers, (member: CourseMember) => {
            member.course = _.find(courses, (course: Course) => {
              return member.course_id == course.id;
            });
          });
          var classList = Course.toArray(jsonArr1[1]);
          _.each(this.myClassMembers, (member: CourseMember) => {
            member.clazz = _.find(classList, (clazz: CourseClass) => {
              return member.class_id == clazz.id;
            });
          });
          var exams = Exam.toArray(jsonArr1[2]);
          _.each(this.myExamMembers, (member: ExamMember) => {
            member.exam = _.find(exams, (exam: Exam) => {
              return member.exam_id == exam.id;
            });
          });
          var conferences = Conference.toArray(jsonArr1[3]);
          _.each(this.myConferenceMembers, (member: ConferenceMember) => {
            member.conference = _.find(conferences, (conf: Conference) => {
              return member.conference_id == conf.id;
            });
          });
          var surveys = Survey.toArray(jsonArr1[4]);
          _.each(this.mySurveyMembers, (member: SurveyMember) => {
            member.survey = _.find(surveys, (survey: Survey) => {
              return member.survey_id == survey.id;
            });
          });
          this.initialized = true;
          return Observable.of(null);
        });
      });
  }

  initCourseContent(context: APIContext): Observable<any> {
    if (this.syllabusInitialized)
      return Observable.of([]);
    if (!this.initialized)
      return Observable.throw('Must run initialize first');
    var courses = _.map(this.myCourseMembers, (member: CourseMember) => {
      return member.course;
    });
    courses = _.uniq(courses, (course: Course) => {
      return course.id;
    });
    var searchApiList = [];
    for (var i = 0; i < courses.length; i++) {
      searchApiList.push(CourseSyllabus.__api__byCourse(courses[i].id));
      searchApiList.push(CourseUnit.__api__listByCourse(courses[i].id));
      searchApiList.push(CourseFaq.__api__listByCourse(courses[i].id));
      searchApiList.push(CourseMaterial.__api__listByCourse(courses[i].id));
    }
    return BaseModel.bulk_search(context, ...searchApiList).do(jsonArr => {
      for (var i = 0; i < courses.length; i++) {
        var sylList = CourseSyllabus.toArray(jsonArr[4 * i]);
        var syllabus = sylList[0];
        var unitList = CourseUnit.toArray(jsonArr[4 * i + 1]);
        var faqList = CourseFaq.toArray(jsonArr[4 * i + 2]);
        var materialList = CourseMaterial.toArray(jsonArr[4 * i + 3]);
        this.mySyllabus.push(syllabus);
        this.myUnits[syllabus.id] = unitList;
        this.myFaqs[courses[i].id] = faqList;
        this.myMaterials[courses[i].id] = materialList;
      }
      this.syllabusInitialized = true;
    });
  }

  initClassContent(context: APIContext): Observable<any> {
    if (this.classInitialized)
      return Observable.of([]);
    if (!this.initialized)
      return Observable.throw('Must run initialize first');
    var apiList = [];
    var classList = this.MyClass;
    for (var i = 0; i < classList.length; i++) {
      apiList.push(Exam.__api__listByClass(classList[i].id));
      apiList.push(Project.__api__listByClass(classList[i].id));
      apiList.push(Survey.__api__listByClass(classList[i].id));
      apiList.push(Certificate.__api__listByClass(classList[i].id));
    };
    return BaseModel.bulk_search(context, ...apiList).do(jsonArr => {
      for (var i = 0; i < classList.length; i++) {
        var exams = Exam.toArray(jsonArr[3 * i]);
        this.myClassExams[classList[i].id] = exams;
        var projects = Project.toArray(jsonArr[3 * i + 1]);
        this.myProjects[classList[i].id] = projects;
        var surveys = Survey.toArray(jsonArr[3 * i + 2]);
      }
      this.classInitialized = true;
    });
  }

  initCourseAnalytic(context: APIContext): Observable<any> {
    if (this.courseAnalyticInitialized)
      return Observable.of([]);
    if (!this.initialized)
      return Observable.throw('Must run initialize first');
    var courses = _.map(this.myCourseMembers, (member: CourseMember) => {
      return member.course;
    });
    courses = _.uniq(courses, (course: Course) => {
      return course.id;
    });
    _.each(courses, (course: Course) => {
      course["courseMemberData"] = course["courseMemberData"] || {};
    });
    var searchApiList = [];
    for (var i = 0; i < courses.length; i++) {
      searchApiList.push(CourseMember.__api__listByCourse(courses[i].id))
    }
    return BaseModel.bulk_search(context, ...searchApiList).map(jsonArr => {
      for (var i = 0; i < courses.length; i++) {
        var members = CourseMember.toArray(jsonArr[i]);
        courses[i]["courseMemberData"] = this.reportUtils.analyseCourseMember(courses[i], members);
      };
      this.courseAnalyticInitialized = true;
    });
  }

  initExamAnalytic(context: APIContext): Observable<any> {
    if (this.examAnalyticInitialized)
      return Observable.of([]);
    if (!this.initialized)
      return Observable.throw('Must run initialize first');
    var exams = _.map(this.myExamMembers, (member: ExamMember) => {
      return member.exam;
    });
    exams = _.uniq(exams, (exam: Exam) => {
      return exam.id;
    });
    _.each(exams, (exam: Exam) => {
      exam["examMemberData"] = exam["examMemberData"] || {};
    });
    var countApi = _.map(exams, (exam: Exam) => {
      return ExamQuestion.__api__countByExam(exam.id);
    });
    var countSubscription = BaseModel.bulk_count(context, ...countApi)
      .map((jsonArray) => {
        return _.flatten(jsonArray);
      })
      .do(counts => {
        for (var i = 0; i < exams.length; i++) {
          exams[i]["question_count"] = counts[i];
        }
      });
    var listApi = _.map(exams, (exam: Exam) => {
      return ExamMember.__api__listByExam(exam.id);
    });
    var searchSubscription = BaseModel.bulk_search(context, ...listApi)
      .do(jsonArr => {
        for (var i = 0; i < exams.length; i++) {
          var members = ExamMember.toArray(jsonArr[i]);
          exams[i]["examMemberData"] = this.reportUtils.analyseExamMember(exams[i], members);
        }
      });
    return Observable.forkJoin(countSubscription, searchSubscription);
  }

  getCourse(courseId): Course {
    var courses = this.MyCourse;
    return _.find(courses, (course: Course) => {
      return course.id == courseId;
    });
  }

  getCourseMember(memberId): CourseMember {
    var members = this.MyCourseMember;
    return _.find(members, (member: CourseMember) => {
      return member.id == memberId;
    });
  }

  getSyllabusUnit(sylId: number): CourseUnit[] {
    return this.myUnits[sylId];
  }

  getCourseFaqs(courseId: number): CourseFaq[] {
    return this.myFaqs[courseId];
  }

  getCourseMaterials(courseId: number): CourseMaterial[] {
    return this.myMaterials[courseId];
  }

  getCourseSyllabusFromCourse(courseId: number): CourseSyllabus {
    return _.find(this.mySyllabus, (syl: CourseSyllabus) => {
      return syl.course_id == courseId;
    });
  }

  getCourseClass(classId: number): CourseClass {
    return _.find(this.MyClass, (clazz: CourseClass) => {
      return clazz.id == classId;
    });
  }

  getClassExamMember(courseMemberId: number) {
    return _.filter(this.myExamMembers, (examMember: ExamMember) => {
      return examMember.course_member_id == courseMemberId;
    });
  }

  getClassSurveyMember(courseMemberId: number) {
    return _.filter(this.mySurveyMembers, (surveyMember: SurveyMember) => {
      return surveyMember.course_member_id == courseMemberId;
    });
  }

  getClassConferenceMember(courseMemberId: number) {
    return _.find(this.myConferenceMembers, (confMember: ConferenceMember) => {
      return confMember.course_member_id == courseMemberId;
    });
  }

  getExam(examId: number): Exam {
    return _.find(this.MyExam, (exam: Exam) => {
      return exam.id == examId;
    });
  }

  getExamMember(memberId: number): ExamMember {
    return _.find(this.myExamMembers, (member: ExamMember) => {
      return member.id == memberId;
    });
  }


  get MyCourseSyllabus(): CourseSyllabus[] {
    return this.mySyllabus;
  }

  get MyCourseMember(): CourseMember[] {
    return this.myCourseMembers;
  }

  get MyClassMember(): CourseMember[] {
    return this.myClassMembers;
  }

  get MyExamMember(): ExamMember[] {
    return this.myExamMembers;
  }

  get MyConferenceMember(): ConferenceMember[] {
    return this.myConferenceMembers;
  }

  get MySurveyMember(): SurveyMember[] {
    return this.mySurveyMembers;
  }

  getClassExams(classId: number): Exam[] {
    return this.myClassExams[classId];
  }

  getClassSurveys(classId: number): Survey[] {
    return this.myClassSurveys[classId];
  }

  getClassProjects(classId: number): Project[] {
    return this.myProjects[classId];
  }


  get MyCourse(): Course[] {
    var courses = _.map(this.myCourseMembers, (member: CourseMember) => {
      return member.course;
    });
    courses = _.uniq(courses, (course: Course) => {
      return course.id;
    });
    _.each(courses, (course: Course) => {
      course["student"] = _.find(this.myCourseMembers, (member: CourseMember) => {
        return member.course_id == course.id && member.role == 'student';
      });
      course["teacher"] = _.find(this.myCourseMembers, (member: CourseMember) => {
        return member.course_id == course.id && member.role == 'teacher';
      });
      course["supervisor"] = _.find(this.myCourseMembers, (member: CourseMember) => {
        return member.course_id == course.id && member.role == 'supervisor';
      });
      course["editor"] = _.find(this.myCourseMembers, (member: CourseMember) => {
        return member.course_id == course.id && member.role == 'editor';
      });
      if (course["supervisor"])
        course["editor"] = course["teacher"] = course["supervisor"];
      course["courseMemberData"] = course["courseMemberData"] || {};
    });
    return courses;
  }


  get MyClass(): CourseClass[] {
    var classes = _.map(this.myClassMembers, (member: CourseMember) => {
      return member.clazz;
    });
    return _.uniq(classes, (clazz: CourseClass) => {
      return clazz.id;
    });
  }

  get MyConference(): Conference[] {
    var conferences = _.map(this.myConferenceMembers, (member: ConferenceMember) => {
      return member.conference;
    });
    return _.uniq(conferences, (conf: Conference) => {
      return conf.id;
    });
  }

  get MyExam(): Exam[] {
    var exams = _.map(this.myExamMembers, (member: ExamMember) => {
      return member.exam;
    });
    exams = _.uniq(exams, (exam: Exam) => {
      return exam.id;
    });
    _.each(exams, (exam: Exam) => {
      exam["candidate"] = _.find(this.myExamMembers, (member: ExamMember) => {
        return member.exam_id == exam.id && member.role == 'candidate';
      });
      exam["supervisor"] = _.find(this.myExamMembers, (member: ExamMember) => {
        return member.exam_id == exam.id && member.role == 'supervisor';
      });
      exam["editor"] = _.find(this.myExamMembers, (member: ExamMember) => {
        return member.exam_id == exam.id && (member.role == 'editor' || member.role == 'supervisor');
      });
      if (exam["supervisor"])
        exam["editor"] = exam["supervisor"];
      exam["examMemberData"] = exam["examMemberData"] || {};
    });
    return exams;
  }

  get MySurvey(): Survey[] {
    var surveys = _.map(this.mySurveyMembers, (member: SurveyMember) => {
      return member.survey;
    });
    surveys = _.uniq(surveys, (survey: Survey) => {
      return survey.id;
    });
    _.each(surveys, (survey: Survey) => {
      survey["candidate"] = _.find(this.myExamMembers, (member: SurveyMember) => {
        return member.survey_id == survey.id && member.role == 'candidate';
      });
      survey["supervisor"] = _.find(this.myExamMembers, (member: SurveyMember) => {
        return member.survey_id == survey.id && member.role == 'supervisor';
      });
      survey["editor"] = _.find(this.myExamMembers, (member: SurveyMember) => {
        return member.survey_id == survey.id && (member.role == 'editor' || member.role == 'supervisor');
      });
      if (survey["supervisor"])
        survey["editor"] = survey["supervisor"];
    });
    return surveys;
  }

  getLastCourseTimestamp(course: Course) {
    var timestamp = course.create_date.getTime();
    if (course["student"] && course["student"].create_date.getTime() < timestamp)
      timestamp = course["student"].create_date.getTime();
    if (course["teacher"] && course["teacher"].create_date.getTime() < timestamp)
      timestamp = course["teacher"].create_date.getTime();
    if (course["editor"] && course["editor"].create_date.getTime() < timestamp)
      timestamp = course["editor"].create_date.getTime();
    if (course["supervisor"] && course["supervisor"].create_date.getTime() < timestamp)
      timestamp = course["supervisor"].create_date.getTime();
    return timestamp;
  }


  getLastExamTimestamp(exam: Exam) {
    var timestamp = exam.create_date.getTime();
    if (exam["candidate"] && exam["candidate"].create_date.getTime() < timestamp)
      timestamp = exam["candidate"].create_date.getTime();
    if (exam["editor"] && exam["editor"].create_date.getTime() < timestamp)
      timestamp = exam["exam"].create_date.getTime();
    if (exam["supervisor"] && exam["supervisor"].create_date.getTime() < timestamp)
      timestamp = exam["supervisor"].create_date.getTime();
    return timestamp;
  }

  getLastSurveyTimestamp(survey: Survey) {
    var timestamp = survey.create_date.getTime();
    if (survey["candidate"] && survey["candidate"].create_date.getTime() < timestamp)
      timestamp = survey["candidate"].create_date.getTime();
    if (survey["editor"] && survey["editor"].create_date.getTime() < timestamp)
      timestamp = survey["exam"].create_date.getTime();
    if (survey["supervisor"] && survey["supervisor"].create_date.getTime() < timestamp)
      timestamp = survey["supervisor"].create_date.getTime();
    return timestamp;
  }


  getLastConferenceTimestamp(conf: Conference) {
    var timestamp = conf.create_date.getTime();
    if (conf["member"] && conf["member"].create_date.getTime() < timestamp)
      timestamp = conf["member"].create_date.getTime();
    return timestamp;
  }



}