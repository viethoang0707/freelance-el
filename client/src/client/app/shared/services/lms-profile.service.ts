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
  private myCourses: Course[];
  private myExams: Exam[];
  private myProjects: Project[];
  private myCourseClasses: CourseClass[];
  private mySurveys: Survey[];
  private myConferences: Conference[];
  private myCertificates: Certificate[];
  private courseContent: any;
  private initialized: boolean;


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
  }

  invalidateAllll() {
    this.initialized = false;
    this.courseContent = {};
  }


  init(context: APIContext): Observable<any> {
    if (this.initialized)
      return Observable.of([]);
    var userId = context.authService.UserProfile.id;
    return BaseModel.bulk_search(context,
      CourseMember.__api__listByUser(userId),
      ExamMember.__api__listByUser(userId),
      ConferenceMember.__api__listByUser(userId),
      SurveyMember.__api__listByUser(userId),
      Certificate.__api__listByUser(userId)
    )
      .flatMap(jsonArray => {
        this.myCourseMembers = _.filter(CourseMember.toArray(jsonArray[0]), (member: CourseMember) => {
          return isFinite(parseInt(member.course_id + "")) && member.status == 'active' && member.course_review_state =='approved';
        });
        this.myClassMembers = _.filter(this.myCourseMembers, (member: CourseMember) => {
          return isFinite(parseInt(member.class_id + ""));
        });
        this.myExamMembers = _.filter(ExamMember.toArray(jsonArray[1]), (member: ExamMember) => {
          return isFinite(parseInt(member.exam_id + "")) && member.status == 'active' && member.exam_review_state =='approved';
        });
        this.myConferenceMembers = _.filter(ConferenceMember.toArray(jsonArray[2]), (member: ConferenceMember) => {
          return isFinite(parseInt(member.conference_id + "")) && member.conference_status == 'open' && member.is_active;
        });
        this.mySurveyMembers = _.filter(SurveyMember.toArray(jsonArray[3]), (member: SurveyMember) => {
          return isFinite(parseInt(member.survey_id + "")) && member.role=='supervisor' && member.survey_review_state =='approved';
        });
        this.myCertificates = Certificate.toArray(jsonArray[4]);
        if (this.myCourseMembers.length == 0 && this.myExamMembers.length == 0
          && this.myConferenceMembers.length == 0 && this.mySurveyMembers.length == 0 
          && this.myCertificates.length == 0) {
          this.initialized = true;
          return Observable.of([]);
        }
        var classIds = _.pluck(this.myClassMembers, 'class_id');
        var courseIds = _.pluck(this.myCourseMembers, 'course_id');
        var examIds = _.pluck(this.myExamMembers, 'exam_id');
        var surveyIds = _.pluck(this.mySurveyMembers, 'survey_id');
        var conferenceIds = _.pluck(this.myConferenceMembers, 'conference_id');
        return BaseModel.bulk_list(context,
          Course.__api__get(courseIds),
          CourseClass.__api__get(classIds),
          Exam.__api__get(examIds),
          Conference.__api__get(conferenceIds),
          Survey.__api__get(surveyIds),
          ExamRecord.__api__listByUser(userId),
          Submission.__api__listByUser(userId),
          ProjectSubmission.__api__listByUser(userId)
        ).flatMap(jsonArr1 => {
          this.myCourses = Course.toArray(jsonArr1[0]);
          _.each(this.myCourseMembers, (member: CourseMember) => {
            member.course = _.find(this.myCourses, (course: Course) => {
              return member.course_id == course.id;
            });
          });
          this.myCourseClasses = CourseClass.toArray(jsonArr1[1]);
          _.each(this.myClassMembers, (member: CourseMember) => {
            member.clazz = _.find(this.myCourseClasses, (clazz: CourseClass) => {
              return member.class_id == clazz.id;
            });
          });
          this.myExams = Exam.toArray(jsonArr1[2]);
          _.each(this.myExamMembers, (member: ExamMember) => {
            member.exam = _.find(this.myExams, (exam: Exam) => {
              return member.exam_id == exam.id;
            });
          });
          this.myConferences = Conference.toArray(jsonArr1[3]);
          _.each(this.myConferenceMembers, (member: ConferenceMember) => {
            member.conference = _.find(this.myConferences, (conf: Conference) => {
              return member.conference_id == conf.id;
            });
          });
          this.mySurveys = Survey.toArray(jsonArr1[4]);
          _.each(this.mySurveyMembers, (member: SurveyMember) => {
            member.survey = _.find(this.mySurveys, (survey: Survey) => {
              return member.survey_id == survey.id;
            });
          });
          this.myExamRecords = ExamRecord.toArray(jsonArr1[5]);
          this.myExamSubmits = Submission.toArray(jsonArr1[6]);
          this.myProjectSubmits = ProjectSubmission.toArray(jsonArr1[7]);
          this.initialized = true;
          return Observable.of(null);
        });
      });
  }

  get MyCourseMembers() {
    return this.myCourseMembers;
  }

  get MyExamMembers() {
    return this.myExamMembers;
  }

  get MySurveyMembers() {
    return this.mySurveyMembers;
  }

  get MyConferenceMembers() {
    return this.myConferenceMembers;
  }

  get MyCourses() {
    return this.myCourses;
  }

  get MyClasses() {
    return this.myCourseClasses;
  }

  get MyExams() {
    return this.myExams;
  }

  get MySurveys() {
    return this.mySurveys;
  }

  get MyExamRecords() {
    return this.myExamRecords;
  }

  get MyConferences() {
    return this.myConferences;
  }

  courseById(id:number) {
    return _.find(this.myCourses, (course:Course)=> {
      return course.id ==  id;
    });
  }

  classById(id:number) {
    return _.find(this.myCourseClasses, (courseClass:CourseClass)=> {
      return courseClass.id == id;
    });
  }

  examById(id:number) {
    return _.find(this.myExams, (exam:Exam)=> {
      return exam.id ==  id;
    });
  }

  classByCourseId(courseId:number) {
    return _.filter(this.myCourseClasses, (courseClass:CourseClass)=> {
      return courseClass.course_id == courseId;
    });
  }

  courseMemberById(id:number) {
    return _.find(this.myCourseMembers, (member:CourseMember)=> {
      return member.id ==  id;
    });
  }

  examMemberById(id:number) {
    return _.find(this.myExamMembers, (member:ExamMember)=> {
      return member.id ==  id;
    });
  }

  surveyMemberById(id:number) {
    return _.find(this.mySurveyMembers, (member:SurveyMember)=> {
      return member.id ==  id;
    });
  }

  examMembersByClassId(classId:number) {
    return _.filter(this.myExamMembers, (member:ExamMember)=> {
      return member.class_id ==  classId;
    });
  }

  conferenceMemberByClass(classId:number) {
    return _.find(this.myConferenceMembers, (member:ConferenceMember)=> {
      return member.class_id ==  classId;
    });
  }

  projectsByClass(classId: number) {
    return _.filter(this.myProjects, (project: Project)=> {
      return project.class_id == classId;
    });
  }

  examsByClass(classId: number) {
    return _.filter(this.myExams, (exam: Exam)=> {
      return exam.course_class_id == classId;
    });
  }

  surveysByClass(classId: number) {
    return _.filter(this.mySurveys, (survey: Survey)=> {
      return survey.course_class_id == classId;
    });
  }

  examRecordsByMember(memberId: number) {
    return _.filter(this.myExamRecords, (record: ExamRecord)=> {
      return record.member_id == memberId;
    });
  }

  projectSubmitsByMember(memberId: number) {
    return _.filter(this.myProjectSubmits, (submit: ProjectSubmission)=> {
      return submit.member_id == memberId;
    });
  }

  examSubmitsByMember(memberId: number) {
    return _.filter(this.myExamSubmits, (submit: Submission)=> {
      return submit.member_id == memberId;
    });
  }

  certificateByMember(memberId: number) {
    return _.find(this.myCertificates, (cert: Certificate)=> {
      return cert.member_id == memberId;
    });
  }

  getCourseContent(context:APIContext, courseId:number):Observable<any> {
    if (this.courseContent[courseId])
      return Observable.of(this.courseContent[courseId]);
    return BaseModel.bulk_search(context,
      CourseSyllabus.__api__listByCourse(courseId),
      CourseUnit.__api__listByCourse(courseId),
      CourseFaq.__api__listByCourse(courseId),
      CourseMaterial.__api__listByCourse(courseId)
    )
      .map(jsonArray => {
        var content = {};
        content["syllabus"] =  CourseSyllabus.toArray(jsonArray[0])[0];
        content["units"] =  CourseUnit.toArray(jsonArray[1]);
        content["faqs"] =  CourseFaq.toArray(jsonArray[2]);
        content["materials"] =  CourseMaterial.toArray(jsonArray[3]);
        this.courseContent[courseId] =  content;
        return content;
      });
  }

  clearCourseContent(courseId: number) {
    delete this.courseContent[courseId];
  }

  addProject(project:Project) {
    this.myProjects.push(project);
  }

  addExam(exam:Exam) {
    this.myExams.push(exam);
  }

  addSurvey(survey:Survey) {
    this.mySurveys.push(survey);
  }

  addCourseFaq(faq:CourseFaq) {
    var content = this.courseContent[faq.course_id];
    if (content)
      content["faqs"].push(faq);
  }

  addCourseMaterial(material:CourseMaterial) {
    var content = this.courseContent[material.course_id];
    if (content)
      content["materials"].push(material);
  }

  addUnit(unit:CourseUnit) {
    var content = this.courseContent[unit.course_id];
    if (content)
      content["units"].push(unit);
  }


  removeProject(project:Project) {
    this.myProjects = _.reject(this.myProjects, (obj:Project)=> {
      return obj.id == project.id;
    });
  }

  removeExam(exam:Exam) {
    this.myExams = _.reject(this.myExams, (obj:Exam)=> {
      return obj.id == exam.id;
    });
  }

  removeSurvey(survey:Survey) {
    this.mySurveys = _.reject(this.mySurveys, (obj:Survey)=> {
      return obj.id == survey.id;
    });
  }

  removeCourseFaq(faq:CourseFaq) {
    var content = this.courseContent[faq.course_id];
    if (content)
      content["faqs"] = _.reject(content["faqs"], (obj:CourseFaq)=> {
      return obj.id == faq.id;
    });
  }

  removeCourseMaterial(material:CourseMaterial) {
    var content = this.courseContent[material.course_id];
    if (content)
      content["materials"] = _.reject(content["materials"], (obj:CourseMaterial)=> {
      return obj.id == material.id;
    });
  }

  removeUnit(unit:CourseUnit) {
    var content = this.courseContent[unit.course_id];
    if (content)
      content["units"] = _.reject(content["units"], (obj:CourseUnit)=> {
        return obj.id == unit.id;
      });
  }

  getLastCourseTimestamp(course: Course) {
    var timestamp = course.create_date.getTime();
    var editorRole = this.getCourseMemberByRole('editor', course.id);
    var studentRole = this.getCourseMemberByRole('student', course.id);
    var teacherRole = this.getCourseMemberByRole('teacher', course.id);
    var supervisorRole = this.getCourseMemberByRole('supervisor', course.id);
    if (studentRole && studentRole.create_date.getTime() < timestamp)
      timestamp = studentRole.create_date.getTime();
    if (teacherRole && teacherRole.create_date.getTime() < timestamp)
      timestamp = teacherRole.create_date.getTime();
    if (editorRole && editorRole.create_date.getTime() < timestamp)
      timestamp = editorRole.create_date.getTime();
    if (supervisorRole && supervisorRole.create_date.getTime() < timestamp)
      timestamp = supervisorRole.create_date.getTime();
    return timestamp;
  }

  getCourseMemberByRole(role:string, courseId: number) {
    return _.find(this.myCourseMembers, (member:CourseMember)=> {
      return member.role == role && member.course_id == courseId;
    });
  }


  getLastExamTimestamp(exam: Exam) {
    var timestamp = exam.create_date.getTime();
    var editorRole = this.getExamMemberByRole('editor', exam.id);
    var candidateRole = this.getExamMemberByRole('candidate', exam.id);
    var supervisorRole = this.getExamMemberByRole('supervisor', exam.id);
    if (candidateRole && candidateRole.create_date.getTime() < timestamp)
      timestamp = candidateRole.create_date.getTime();
    if (editorRole && editorRole.create_date.getTime() < timestamp)
      timestamp = editorRole.create_date.getTime();
    if (supervisorRole && supervisorRole.create_date.getTime() < timestamp)
      timestamp = supervisorRole.create_date.getTime();
    return timestamp;
  }

  getExamMemberByRole(role:string, examId: number) {
    return _.find(this.myExamMembers, (member:ExamMember)=> {
      return member.role == role && member.exam_id == examId;
    });
  }

  getLastSurveyTimestamp(survey: Survey) {
    var timestamp = survey.create_date.getTime();
    var editorRole = this.getSurveyMemberByRole('editor', survey.id);
    var candidateRole = this.getSurveyMemberByRole('candidate', survey.id);
    var supervisorRole = this.getSurveyMemberByRole('supervisor', survey.id); 
    if (candidateRole && candidateRole.create_date.getTime() < timestamp)
      timestamp = candidateRole.create_date.getTime();
    if (editorRole && editorRole.create_date.getTime() < timestamp)
      timestamp = editorRole.create_date.getTime();
    if (supervisorRole && supervisorRole.create_date.getTime() < timestamp)
      timestamp = supervisorRole.create_date.getTime();
    return timestamp;
  }

  getSurveyMemberByRole(role:string, surveyId: number) {
    return _.find(this.mySurveyMembers, (member:SurveyMember)=> {
      return member.role == role && member.survey_id == surveyId;
    });
  }


  getLastConferenceTimestamp(member: ConferenceMember) {
    var timestamp = member.conference.create_date.getTime();
    if (member.create_date.getTime() < timestamp)
      timestamp = member.create_date.getTime();
    return timestamp;
  }

}