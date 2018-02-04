import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[chart-container]',
})
export class ChartContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}