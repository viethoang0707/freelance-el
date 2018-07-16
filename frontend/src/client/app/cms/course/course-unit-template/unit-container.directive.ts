import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[course-unit-container]',
})
export class CourseUnitContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}