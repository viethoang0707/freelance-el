import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Config } from '../../env.config';
import { Observable, Subject } from 'rxjs/Rx';
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
      return BaseModel.bulk_list(context,
        User.__api__listCourseMembers(user.course_member_ids),
        User.__api__listExamMembers(user.exam_member_ids),
        User.__api__listConferenceMembers(user.conference_member_ids),
        User.__api__listSurveyMembers(user.survey_member_ids),
        User.__api__listCertificates(user.certificate_ids),
        User.__api__listExamRecords(user.exam_record_ids),
        User.__api__listSubmissions(user.submission_ids),
        User.__api__listProjectSubmissions(user.project_submission_ids)
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

  get MyExamMembers() {
    return this.myExamMembers;
  }

  get MySurveyMembers() {
    return this.mySurveyMembers;
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

  getCourseContent(course: Course): Observable<any> {
    if (this.courseContent[course.id])
      return Observable.of(this.courseContent[course.id]);
    return BaseModel.bulk_list(this.context,
      Course.__api__populateSyllabus(course.syllabus_id),
      Course.__api__listUnits(course.unit_ids),
      Course.__api__listFaqs(course.faq_ids),
      Course.__api__listMaterials(course.material_ids)
    )
      .map(jsonArray => {
        var content = {};
        content["syllabus"] = CourseSyllabus.toArray(jsonArray[0])[0];
        content["units"] = CourseUnit.toArray(jsonArray[1]);
        content["faqs"] = CourseFaq.toArray(jsonArray[2]);
        content["materials"] = CourseMaterial.toArray(jsonArray[3]);
        this.courseContent[course.id] = content;
        return content;
      });
  }

  getClassContent(clazz: CourseClass): Observable<any> {
    if (this.classContent[clazz.id])
      return Observable.of(this.classContent[clazz.id]);
    return BaseModel.bulk_list(this.context,
      CourseClass.__api__listProjects(clazz.project_ids),
      CourseClass.__api__listExams(clazz.exam_ids),
      CourseClass.__api__listSurveys(clazz.survey_ids)
    )
      .map(jsonArray => {
        var content = {};
        content["projects"] = Project.toArray(jsonArray[0])[0];
        content["exams"] = Exam.toArray(jsonArray[1]);
        content["surveys"] = Survey.toArray(jsonArray[2]);
        this.classContent[clazz.id] = content;
        return content;
      });
  }

  invalidateClassContent(classId: number) {
    delete this.classContent[classId];
  }

  invalidateCourseContent(courseId: number) {
    delete this.courseContent[courseId];
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
      timestamp = supervisorRole.write_date.getTime();
    return timestamp;
  }

  getCourseMemberByRole(role: string, courseId: number) {
    return _.find(this.myCourseMembers, (member: CourseMember) => {
      return member.role == role && member.course_id == courseId;
    });
  }

  getClassMemberByRole(role: string, classId: number) {
    return _.find(this.myClassMembers, (member: CourseMember) => {
      return member.role == role && member.class_id == classId;
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
      timestamp = supervisorRole.write_date.getTime();
    return timestamp;
  }

  getExamMemberByRole(role: string, examId: number) {
    return _.find(this.myExamMembers, (member: ExamMember) => {
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
      timestamp = supervisorRole.write_date.getTime();
    return timestamp;
  }

  getSurveyMemberByRole(role: string, surveyId: number) {
    return _.find(this.mySurveyMembers, (member: SurveyMember) => {
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