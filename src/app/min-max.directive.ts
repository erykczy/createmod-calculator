import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[minMax]',
  standalone: true
})
export class MinMaxDirective {

  @Input()
  public min?: number = undefined;

  @Input()
  public max?: number = undefined;

  constructor(private ref: ElementRef) { }

  @HostListener('input', [ '$event' ])
  public onInput(event: InputEvent): void {
    let val = parseInt(this.ref.nativeElement.value);

    if(Number.isNaN(val))
      this.ref.nativeElement.value = (this.min) ? this.min.toString() : 0;
    else if(this.max !== null && this.max !== undefined  && val >= this.max)
      this.ref.nativeElement.value = this.max.toString();
    else if (this.min !== null && this.min !== undefined  && val <= this.min)
      this.ref.nativeElement.value = this.min.toString();
  }

}