import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

const SCROLL_MARGIN = 50;

@Directive({
  selector: '[scrollTracker]',
})
export class ScrollTracker {
  
  @Output() scrolled = new EventEmitter<any>();

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    // do tracking
    // console.log('scrolled', event.target.scrollTop);
    // Listen to click events in the component
    let tracker = event.target;
    let endReached = false;
    let limit = tracker.scrollHeight - tracker.clientHeight;

    console.log(event.target.scrollTop, limit);
    if (event.target.scrollTop <= limit && event.target.scrollTop >= limit-SCROLL_MARGIN) {
      //alert('end reached');
      endReached = true;
    }

    this.scrolled.emit({
      pos: event.target.scrollTop,
      endReached
    })
  }
}