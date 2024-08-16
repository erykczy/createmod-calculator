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

    element.select();
  }

}