import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[question-container]',
})
export class QuestionContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}