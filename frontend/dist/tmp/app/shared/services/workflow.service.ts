import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { MapUtils } from '../helpers/map.utils';
import { AuthService } from '../../shared/services/auth.service';
import { Ticket } from '../models/elearning/ticket.model';
import { Course } from '../models/elearning/course.model';
import { CourseSyllabus } from '../models/elearning/course-syllabus.model';
import { Token } from '../models/cloud/token.model';
import { APIContext } from '../models/context';
import { WebSocketService } from '../../shared/services/socket.service';
import { Exam } from '../models/elearning/exam.model';
import { Survey } from '../models/elearning/survey.model';
import { ExecuteAPI } from '../../shared/services/api/execute.api';


@Injectable()
export class WorkflowService {

  constructor(private authService: AuthService) {
  }

  createCourseReviewTicket(context: APIContext, course: Course): Observable<any> {
    var user = this.authService.UserProfile;
    var ticket = new Ticket();
    ticket.res_id = course.id;
    ticket.res_model = Course.Model;
    ticket.content = `Course ${course.name} is request to be reviewed`;
    ticket.date_open = new Date();
    ticket.submit_user_id = user.id;
    ticket.approve_user_id = user.supervisor_id;
    ticket.title = 'Course review request';
    ticket.code = 'REVIEW_COURSE';
    var executeApi = new ExecuteAPI('etraining.workflow_service', 'submitReview', ticket, null)
    return context.apiService.execute(executeApi, context.authService.LoginToken);
  }

  createExamReviewTicket(context: APIContext, exam: Exam): Observable<any> {
    var user = this.authService.UserProfile;
    var ticket = new Ticket();
    ticket.res_id = exam.id;
    ticket.res_model = Exam.Model;
    ticket.content = `Exan ${exam.name} is request to be reviewed`;
    ticket.date_open = new Date();
    ticket.submit_user_id = user.id;
    ticket.approve_user_id = user.supervisor_id;
    ticket.title = 'Exam review request';
    ticket.code = 'REVIEW_EXAM';
    var executeApi = new ExecuteAPI('etraining.workflow_service', 'submitReview', ticket, null)
    return context.apiService.execute(executeApi, context.authService.LoginToken);
  }

  createSurveyReviewTicket(context: APIContext, survey: Survey): Observable<any> {
    var user = this.authService.UserProfile;
    var ticket = new Ticket();
    ticket.res_id = survey.id;
    ticket.res_model = Survey.Model;
    ticket.content = `Survey ${survey.name} is request to be reviewed`;
    ticket.date_open = new Date();
    ticket.submit_user_id = user.id;
    ticket.approve_user_id = user.supervisor_id;
    ticket.title = 'Survey review request';
    ticket.code = 'REVIEW_SURVEY';
    var executeApi = new ExecuteAPI('etraining.workflow_service', 'submitReview', ticket, null)
    return context.apiService.execute(executeApi, context.authService.LoginToken);
  }

  approveTicket(context: APIContext, ticketId: number): Observable<any> {
    var params = { ticketId: ticketId };
    var executeApi = new ExecuteAPI('etraining.workflow_service', 'approveTicket', params, null)
    return context.apiService.execute(executeApi, context.authService.LoginToken);
  }

  rejectTicket(context: APIContext, ticketId: number): Observable<any> {
    var params = { ticketId: ticketId };
    var executeApi = new ExecuteAPI('etraining.workflow_service', 'rejectTicket', params, null)
    return context.apiService.execute(executeApi, context.authService.LoginToken);

  }

}
