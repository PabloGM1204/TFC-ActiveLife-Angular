import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAgrandar]'
})
export class AgrandarDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.resize('1.2');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resize('1');
  }

  private resize(scale: string) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${scale})`);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
  }

}
