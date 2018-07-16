import { Observable, Subject } from 'rxjs/Rx'
import { CourseUnit } from '../models/elearning/course-unit.model';
import * as _ from 'underscore';
import { Injectable } from '@angular/core';

@Injectable()
export class DateUtils {

  constructor() {
  }

  firstDateOfMonth(now: Date) {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  lastDateOfMonth(now: Date) {
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }
}
