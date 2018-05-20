import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[spy-click-stop-propagation]'
})
export class ClickStopPropagation {

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    event.stopPropagation();
  }
}
