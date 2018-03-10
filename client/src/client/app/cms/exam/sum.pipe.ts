import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'underscore';

@Pipe({ name: 'sum',  pure: false })
export class SumPipe implements PipeTransform {
	// return true if validation failed
  transform(questions: any[]): any {
  	return  _.reduce(questions, (memo, q)=>{ return memo + +q.score; }, 0);
    
  }
}