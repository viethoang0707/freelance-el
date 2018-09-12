import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import { Observable, Subject } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { AppEventManager } from './app-event-manager.service';
import { SettingService } from './setting.service';
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
import { Token } from '../models/cloud/token.model';
import { APIContext } from '../models/context';
import { ExamRecord } from '../models/elearning/exam-record.model';

@Injectable()
export class LMSProfileService {

  private myCourseMembers: CourseMember[];
  private myClassMembers: CourseMember[];
  private myExamMembers: ExamMember[];
  private mySurveyMembers: SurveyMember[];
  private myConferenceMembers: ConferenceMember[];
  private myExamRecords: ExamRecord[];
  private myProjectSubmits: ProjectSubmission[];
  private myExamSubmits: Submission[];
  private myCertificates: Certificate[];
  private courseContent: any;
  private classContent: any;
  private initialized: boolean;
  private context: APIContext;

  constructor(private settingService: SettingService, private appEvent: AppEventManager) {
    this.settingService.viewModeEvents.subscribe(() => {
      this.invalidateAll();
    });
    this.appEvent.onLogin.subscribe(() => {
      this.invalidateAll();
    });
    this.appEvent.onLogout.subscribe(() => {
      this.invalidateAll();
    });
    this.appEvent.onTokenExpired.subscribe(() => {
      this.invalidateAll();
    });
    this.invalidateAll();
  }

  invalidateAll() {
    this.initialized = false;
    this.courseContent = {};
    this.classContent = {};
  }


  init(context: APIContext): Observable<any> {
    this.context = context;
    if (this.initialized)
      return Observable.of([]);
    var user = context.authService.UserProfile;
    return user.populate(context).flatMap(() => {
      return BaseModel.bulk_search(context,
        User.__api__listCourseMembers(user.id),
        User.__api__listExamMembers(user.id),
        User.__api__listConferenceMembers(user.id),
        User.__api__listSurveyMembers(user.id),
        User.__api__listCertificates(user.id),
        User.__api__listExamRecords(user.id),
        User.__api__listSubmissions(user.id),
        User.__api__listProjectSubmissions(user.id)
      ).map(jsonArray => {
        this.myCourseMembers = _.filter(CourseMember.toArray(jsonArray[0]), (member: CourseMember) => {
          return isFinite(parseInt(member.course_id + "")) && member.status == 'active' && member.course_review_state == 'approved';
        });
        this.myClassMembers = _.filter(this.myCourseMembers, (member: CourseMember) => {
          return isFinite(parseInt(member.class_id + ""));
        });
        this.myExamMembers = _.filter(ExamMember.toArray(jsonArray[1]), (member: ExamMember) => {
          return isFinite(parseInt(member.exam_id + "")) && member.status == 'active' && member.exam_review_state == 'approved';
        });
        this.myConferenceMembers = _.filter(ConferenceMember.toArray(jsonArray[2]), (member: ConferenceMember) => {
          return isFinite(parseInt(member.conference_id + "")) && member.conference_status == 'open' && member.is_active;
        });
        this.mySurveyMembers = _.filter(SurveyMember.toArray(jsonArray[3]), (member: SurveyMember) => {
          return isFinite(parseInt(member.survey_id + "")) && member.survey_review_state == 'approved';
        });
        this.myCertificates = Certificate.toArray(jsonArray[4]);
        this.myExamRecords = ExamRecord.toArray(jsonArray[5]);
        this.myExamSubmits = Submission.toArray(jsonArray[6]);
        this.myProjectSubmits = ProjectSubmission.toArray(jsonArray[7]);
        this.initialized = true;
      });
    })

  }

  get MyCourseMembers() {
    return this.myCourseMembers;
  }

  get MyCourseIds() {
    var courseIds = _.pluck(this.myCourseMembers, 'course_id');
    courseIds = _.uniq(courseIds, id => {
      return id;
    });
    return courseIds
  }

  get MyClassIds() {
    var classIds = _.pluck(this.myClassMembers, 'class_id');
    classIds = _.uniq(classIds, id => {
      return id;
    });
    return classIds
  }

  get MyExamMembers() {
    return this.myExamMembers;
  }

  get MyExamIds() {
    var examIds = _.pluck(this.myExamMembers, 'exam_id');
    examIds = _.uniq(examIds, id => {
      return id;
    });
    return examIds
  }

  get MySurveyMembers() {
    return this.mySurveyMembers;
  }

  get MySurveyIds() {
    var surveyIds = _.pluck(this.mySurveyMembers, 'survey_id');
    surveyIds = _.uniq(surveyIds, id => {
      return id;
    });
    return surveyIds
  }

  get MyConferenceMembers() {
    return this.myConferenceMembers;
  }


  get MyExamRecords() {
    return this.myExamRecords;
  }

  courseMemberById(id: number) {
    return _.find(this.myCourseMembers, (member: CourseMember) => {
      return member.id == id;
    });
  }

  examMemberById(id: number) {
    return _.find(this.myExamMembers, (member: ExamMember) => {
      return member.id == id;
    });
  }

  classMembersByCourseId(courseId: number) {
    return _.filter(this.myClassMembers, (member: CourseMember) => {
      return member.course_id == courseId;
    });
  }

  surveyMembersByClassId(classId: number) {
    return _.filter(this.mySurveyMembers, (member: SurveyMember) => {
      return member.class_id == classId;
    });
  }

  surveyMemberById(id: number) {
    return _.find(this.mySurveyMembers, (member: SurveyMember) => {
      return member.id == id;
    });
  }

  examMembersByClassId(classId: number) {
    return _.filter(this.myExamMembers, (member: ExamMember) => {
      return member.class_id == classId;
    });
  }

  conferenceMemberByClassId(classId: number) {
    return _.find(this.myConferenceMembers, (member: ConferenceMember) => {
      return member.class_id == classId;
    });
  }

  examRecordsByMember(memberId: number) {
    return _.filter(this.myExamRecords, (record: ExamRecord) => {
      return record.member_id == memberId;
    });
  }

  projectSubmitsByMember(memberId: number) {
    return _.filter(this.myProjectSubmits, (submit: ProjectSubmission) => {
      return submit.member_id == memberId;
    });
  }

  examSubmitsByMember(memberId: number) {
    return _.filter(this.myExamSubmits, (submit: Submission) => {
      return submit.member_id == memberId;
    });
  }

  certificateByMember(memberId: number) {
    return _.find(this.myCertificates, (cert: Certificate) => {
      return cert.member_id == memberId;
    });
  }

  getCourseMemberByRole(role: string, courseId: number) {
    return _.find(this.myCourseMembers, (member: CourseMember) => {
      return member.role == role && member.course_id == courseId;
    });
  }

  getCourseMemberRoles(courseId: number) {
    var members =  _.filter(this.myCourseMembers, (member: CourseMember) => {
      return member.course_id == courseId;
    });
    return _.pluck(members, 'role');
  }

  getClassMemberByRole(role: string, classId: number) {
    return _.find(this.myClassMembers, (member: CourseMember) => {
      return member.role == role && member.class_id == classId;
    });
  }

  getClassMemberRoles(classId: number) {
    var members =  _.filter(this.myClassMembers, (member: CourseMember) => {
      return member.class_id == classId;
    });
    return _.pluck(members, 'role');
  }

  getExamMemberByRole(role: string, examId: number) {
    return _.find(this.myExamMembers, (member: ExamMember) => {
      return member.role == role && member.exam_id == examId;
    });
  }

  getExamMemberRoles(examId: number) {
    var members =  _.filter(this.myExamMembers, (member: ExamMember) => {
      return member.exam_id == examId;
    });
    return _.pluck(members, 'role');
  }

  getSurveyMemberByRole(role: string, surveyId: number) {
    return _.find(this.mySurveyMembers, (member: SurveyMember) => {
      return member.role == role && member.survey_id == surveyId;
    });
  }

  getSurveyMemberRoles(surveyId: number) {
    var members =  _.filter(this.mySurveyMembers, (member: SurveyMember) => {
      return member.survey_id == surveyId;
    });
    return _.pluck(members, 'role');
  }

  getConferenceMemberByRole(role: string, conferenceId: number) {
    return _.find(this.myConferenceMembers, (member: ConferenceMember) => {
      return member.role == role && member.conference_id == conferenceId;
    });
  }

  getConferenceMemberRoles(conferenceId: number) {
    var members =  _.filter(this.myConferenceMembers, (member: ConferenceMember) => {
      return member.conference_id == conferenceId;
    });
    return _.pluck(members, 'role');
  }

}