import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'underscore';

@Pipe({ name: 'validateGrade',  pure: false })
export class ValidateGradePipe implements PipeTransform {
	// return true if validation failed
  transform(grades: any[], scale: any = null): any {
  	if (!scale || ! grades || !grades.length)
  		return false;
    for (var i =0;i<grades.length;i++) {
    	var grade = grades[i];
    	if (grade.min_score == null || grade.max_score == null)
    		return true;
    	if (+grade.min_score <0)
    		return true;
    	if (+grade.max_score > +scale)
    		return true;
    	if (+grade.max_score < +grade.min_score)
    		return true;
    	var prevGrade = i>0?grades[i-1]:null;
    	if (prevGrade && +prevGrade.max_score+1 != +grade.min_score)
    		return true;
    }
    return false;
  }
}