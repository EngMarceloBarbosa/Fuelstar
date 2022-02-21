// import {Directive, ElementRef, HostListener} from '@angular/core';

// const DISABLE_TIME = 300;

// @Directive({
//     selector: 'button[n-submit]'
// })
// export class DisableButtonOnSubmitDirective {
//     constructor(private elementRef: ElementRef) { }
//     @HostListener('click', ['$event'])
//     clickEvent() {
//         this.elementRef.nativeElement.setAttribute('disabled', 'true');
//         setTimeout(() => this.elementRef.nativeElement.removeAttribute('disabled'), DISABLE_TIME);
//     }
// }

// import { Directive, HostListener } from "@angular/core";

// @Directive({
//   selector: "[blockMultiClicks]",
// })
// export class NoDblClickMatDirective {
//   lastClick = 0;

//   constructor() {}

//   @HostListener("click", ["$event"])
//   clickEvent(event) {
//     const currentTime = new Date().getTime();
//     const ultimoClick = currentTime - this.lastClick;

//     if (ultimoClick < 300) {
//       //voce pode adaptar de acordo com o que vc considera um click duplo
//       event.stopPropagation();
//     }
//     this.lastClick = currentTime;
//   }
// }

import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { throttleTime } from "rxjs/operators";

@Directive({
  selector: "[appPreventDoubleClick]",
})
export class PreventDoubleClickDirective implements OnInit, OnDestroy {
  @Input()
  throttleTime = 500;

  @Output()
  throttledClick = new EventEmitter();

  private clicks = new Subject();
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks.pipe(throttleTime(this.throttleTime)).subscribe((e) => this.emitThrottledClick(e));
  }

  emitThrottledClick(e) {
    this.throttledClick.emit(e);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener("click", ["$event"])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
