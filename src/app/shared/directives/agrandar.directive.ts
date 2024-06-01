import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAgrandar]'
})
export class AgrandarDirective {

  /**
  * Creates an instance of the class.
  * @param el - Reference to the element in the DOM.
  * @param renderer - Renderer to perform operations on the DOM.
  */
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  /**
  * Listens for the 'mouseenter' event and executes the onMouseEnter() function.
  */
  @HostListener('mouseenter') onMouseEnter() {
    this.resize('1.2');
  }

  /**
  * Listens for the 'mouseleave' event and executes the onMouseLeave() function.
  */
  @HostListener('mouseleave') onMouseLeave() {
    this.resize('1');
  }

  /**
  * Resizes the element using a provided scale.
  * @param scale The scale to apply to the element.
  */
  private resize(scale: string) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${scale})`);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
  }

}
