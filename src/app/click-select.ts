import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { g_invisibleChar } from './calculator/constants';

@Directive({
  selector: '[clickSelect]',
  standalone: true
})
export class ClickSelectDirective {
  @Input() clickSelect: boolean = true;

  constructor(private ref: ElementRef) { }

  @HostListener('click', [ '$event' ])
  public onClick(event: PointerEvent): void {
    if(!this.clickSelect)
      return;
    let element: HTMLInputElement = this.ref.nativeElement;

    element.focus();
    let end = element.value.indexOf(g_invisibleChar);
    if(end === -1)
      element.select();
    else
      element.setSelectionRange(0, end);
  }

}