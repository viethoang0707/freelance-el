import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[report-container]',
})
export class ReportContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}