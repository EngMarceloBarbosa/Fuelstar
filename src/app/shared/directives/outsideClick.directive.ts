import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  @Output() clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    console.log(clickedInside);

    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
