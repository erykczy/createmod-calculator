import { Directive, ElementRef, Input } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[tooltip]',
  standalone: true,
  host: {
    '[style.text-decoration]': 'this.decoration',
    '[style.text-decoration-style]': '"dotted"'
  }
})
export class TooltipDirective {
  @Input() tooltip?: string;

  constructor(private el: ElementRef) {

  }

  get decoration(): string {
    return this.tooltip ? "underline" : "none";
  }

  ngOnInit() {
    if(this.tooltip)
      tippy(this.el.nativeElement, {
        content: this.tooltip, 
        theme: "create",
        arrow: true,
        animation: "fadein",
        offset: [0, 10],
        hideOnClick: false
      });
  }
}