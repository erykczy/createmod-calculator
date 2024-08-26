import { Component, ElementRef, HostListener, inject } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  private elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit() {
    let element: HTMLElement = this.elementRef.nativeElement;
    let elementParent: HTMLElement = element.parentElement!;
    // elementParent.addEventListener("mouseenter", (e) => elementParent.classList.add("hover"));
    elementParent.addEventListener("mouseenter", (e) => this.updatePos(this.elementRef));
    // elementParent.addEventListener("mouseout", (e) => elementParent.classList.remove("hover"));
    // document.addEventListener("scroll", () => elementParent.classList.remove("hover"));
    document.addEventListener("scroll", () => this.updatePos(this.elementRef));
    
  }

  moved: boolean = false;
  updatePos(elementRef: ElementRef) {
    if(!elementRef)
      return;
    let element: HTMLElement = elementRef.nativeElement;
    let parent: HTMLElement | null = element.parentElement;
    if(!parent)
      return;

    element.style.setProperty("width", "max-content");

    let elementBounds = element.getBoundingClientRect();
    let parentBounds = parent.getBoundingClientRect();

    element.style.setProperty("width", "auto");

    let rightPos = parentBounds.left + parentBounds.width/2 + elementBounds.width/2;
    let leftPos = parentBounds.left + parentBounds.width/2 - elementBounds.width/2;
    let newLeftPos = Math.max(0, leftPos);
    let newRightPos = Math.min(window.screen.width, rightPos);

    element.style.setProperty("left", newLeftPos + "px");
    element.style.setProperty("right", (window.screen.width-newRightPos) + "px");

    elementBounds = element.getBoundingClientRect();

    element.style.setProperty("top", (parentBounds.top - elementBounds.height - 0) + "px");

    let oldMoved = this.moved;
    this.moved = leftPos !== newLeftPos || rightPos !== newRightPos;
    if(this.moved !== oldMoved) {
      if(this.moved)
        element.classList.add("moved");
      else
        element.classList.remove("moved");
    }
  }
}
