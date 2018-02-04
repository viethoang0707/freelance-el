import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'timeConvert',  pure: false })
export class TimeConvertPipe implements PipeTransform {
  transform(ms: number, scale:string): any {
    if (scale=='sec')
    	ms = Math.floor(ms /1000);
    if (scale=='min')
    	ms = Math.floor(ms /1000/60);
    if (scale=='hour')
    	ms = Math.floor(ms /1000/60/60);
    if (scale=='day')
    	ms = Math.floor(ms /1000/60/60/24);
    return ms;
  }
}