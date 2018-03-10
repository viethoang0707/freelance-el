import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'underscore';

@Pipe({ name: 'byCourse',  pure: false })
export class ByCoursePipe implements PipeTransform {
  transform(classes: any[], course: any = null): any {
    return _.filter(classes, (obj)=> {
    	return course && obj.course_id == course.id;
    });
  }
}