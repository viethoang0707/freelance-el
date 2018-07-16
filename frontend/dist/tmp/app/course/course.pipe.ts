import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'underscore';

@Pipe({ name: 'byCourse',  pure: false })
export class ByCoursePipe implements PipeTransform {
  transform(records: any[], course: any = null): any {
    return _.filter(records, (obj)=> {
    	if (!course)
    		return true;
    	return course && obj.course_id == course.id;
    });
  }
}