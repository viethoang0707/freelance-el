import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'timeConvert', pure: false })
export class TimeConvertPipe implements PipeTransform {
    transform(ms: number, scale: string): number {
        if (scale == 'sec')
            ms = Math.floor(ms / 1000);
        if (scale == 'min')
            ms = Math.floor(ms / 1000 / 60);
        if (scale == 'hour')
            ms = Math.floor(ms / 1000 / 60 / 60);
        if (scale == 'day')
            ms = Math.floor(ms / 1000 / 60 / 60 / 24);
        return ms;
    }
}

@Pipe({ name: 'clock', pure: false })
export class ClockPipe implements PipeTransform {
    transform(ms: number): string {
        if (!ms)
            return "";
        var sec = Math.floor(ms / 1000);
        var min = Math.floor(sec / 60);
        sec = sec % 60;
        var minStr =  min < 10 ?  "0" + min :''+min; 
        var secStr =  sec < 10 ?  "0" + sec :''+sec; 
        return minStr + ':' + secStr
    }
}