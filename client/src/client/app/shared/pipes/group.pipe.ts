import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'groups',  pure: false })
export class GroupsPipe implements PipeTransform {
  transform(object: any[], args: any[] = null): any {
    return object;
  }
}