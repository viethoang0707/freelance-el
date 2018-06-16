import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Credential } from '../models/credential.model';
import { User } from '../models/elearning/user.model';
import { MapUtils } from '../helpers/map.utils';
import { AuthService } from '../../shared/services/auth.service';
import { Ticket } from '../models/ticket/ticket.model';
import { Notification } from '../models/ticket/notification.model';
import { Course } from '../models/elearning/course.model';
import { CourseSyllabus } from '../models/elearning/course-syllabus.model';
import { Token } from '../models/cloud/token.model';
import { APIContext } from '../models/context';
import { WebSocketService } from '../../shared/services/socket.service';


@Injectable()
export class WorkflowService {

  constructor(private authService: AuthService, private socketService: WebSocketService) {
  }

  createCoursePublishTicket(context: APIContext, course: Course): Observable<any> {
    var user = this.authService.UserProfile;
    var ticket = new Ticket();
    ticket.res_id = course.id;
    ticket.res_model = Course.Model;
    ticket.content = `Course ${course.name} is request to be published`;
    ticket.date_open = new Date();
    ticket.submit_user_id = user.id;
    ticket.approve_user_id = user.supervisor_id;
    ticket.title = 'Course published request';
    ticket.code = 'PUBLISH_COURSE';
    return ticket.save(context).flatMap(() => {
      var notification = new Notification();
      notification.title = `Ticket #${ticket.id} has been opened by ${user.name}`
      notification.date_open = new Date();
      notification.ticket_id = ticket.id;
      notification.target_user_id = ticket.approve_user_id;
      this.socketService.notify(notification.title, course.supervisor_id, this.authService.CloudAcc.id);
      return notification.save(context);
    });
  }

  createCourseSyllabusPublishTicket(context: APIContext, syl: CourseSyllabus): Observable<any> {
    var user = this.authService.UserProfile;
    var ticket = new Ticket();
    ticket.res_id = syl.id;
    ticket.res_model = CourseSyllabus.Model;
    ticket.content = `Course syllabus ${syl.name} is request to be published`;
    ticket.date_open = new Date();
    ticket.submit_user_id = user.id;
    ticket.approve_user_id = user.supervisor_id;
    ticket.title = 'Course syllabus published request';
    ticket.code = 'PUBLISH_COURSE_SYLLABUS';
    return ticket.save(context).flatMap(() => {
      var notification = new Notification();
      notification.title = `Ticket #${ticket.id} has been opened by ${user.name}`;
      notification.date_open = new Date();
      notification.ticket_id = ticket.id;
      notification.target_user_id = ticket.approve_user_id;
      this.socketService.notify(notification.title, syl.supervisor_id, this.authService.CloudAcc.id);
      return notification.save(context);
    });
  }

  approveTicket(context: APIContext, ticket: Ticket): Observable<any> {
    if (ticket.code == 'PUBLISH_COURSE') {
      return Course.get(context, ticket.res_id).flatMap(course => {
        course.status = 'published';
        ticket.status = 'approved';
        var notification = new Notification();
        notification.title = `Your ticket #${ticket.id} has been approved`;
        notification.date_open = new Date();
        notification.ticket_id = ticket.id;
        notification.target_user_id = ticket.submit_user_id;
        return Observable.forkJoin(course.save(context), ticket.save(context), notification.save(context)).do(() => {
          this.socketService.notify(notification.title, ticket.submit_user_id, this.authService.CloudAcc.id);
        });
      })
    }
    if (ticket.code == 'PUBLISH_COURSE_SYLLABUS') {
      return CourseSyllabus.get(context, ticket.res_id).flatMap(syl => {
        syl.status = 'published';
        ticket.status = 'approved';
        var notification = new Notification();
        notification.title = `Your ticket #${ticket.id} has been approved`;
        notification.date_open = new Date();
        notification.ticket_id = ticket.id;
        notification.target_user_id = ticket.submit_user_id;
        return Observable.forkJoin(syl.save(context), ticket.save(context), notification.save(context)).do(() => {
          this.socketService.notify(notification.title, ticket.submit_user_id, this.authService.CloudAcc.id);
        });
      })
    }
    return Observable.of(null);
  }

  rejectTicket(context: APIContext, ticket: Ticket): Observable<any> {
    ticket.status = 'rejected';
    var notification = new Notification();
    notification.title = `Your ticket #${ticket.id} has been rejected`;
    notification.date_open = new Date();
    notification.ticket_id = ticket.id;
    notification.target_user_id = ticket.submit_user_id;
    return Observable.forkJoin(ticket.save(context), notification.save(context)).do(() => {
      this.socketService.notify(notification.title, ticket.submit_user_id, this.authService.CloudAcc.id);
    });
  }

  updateTicket(context: APIContext, ticket: Ticket): Observable<any> {
    var source_user = this.authService.UserProfile;
    var target_user_id = (source_user.id == ticket.approve_user_id ? ticket.submit_user_id : ticket.approve_user_id);
    var notification = new Notification();
    notification.title = `The ticket #${ticket.id} has been updated`;
    notification.date_open = new Date();
    notification.ticket_id = ticket.id;
    notification.target_user_id = target_user_id;
    return notification.save(context).do(() => {
      this.socketService.notify(notification.title, target_user_id, this.authService.CloudAcc.id);
    });
  }
}
