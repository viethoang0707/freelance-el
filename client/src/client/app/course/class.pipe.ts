import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'underscore';

@Pipe({ name: 'byClass',  pure: false })
export class ByClassPipe implements PipeTransform {
  transform(records: any[], clazz: any = null): any {
    var ar =  _.filter(records, (obj)=> {
    	if (!clazz)
    		return true;
    	return clazz && obj.class_id == clazz.id;
    });
    console.log(ar);
    return ar;
  }
}