import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[course-unit-player-container]',
})
export class CourseUnitPlayerContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}