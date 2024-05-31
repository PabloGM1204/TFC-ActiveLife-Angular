import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAgrandar]'
})
export class AgrandarDirective {

  /**
  * Crea una instancia de la clase.
  * @param el - Referencia al elemento en el DOM.
  * @param renderer - Renderer para realizar operaciones en el DOM.
  */
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  /**
  * Escucha el evento 'mouseenter' y ejecuta la función onMouseEnter().
  */
  @HostListener('mouseenter') onMouseEnter() {
    this.resize('1.2');
  }

  /**
  * Escucha el evento 'mouseleave' y ejecuta la función onMouseLeave().
  */
  @HostListener('mouseleave') onMouseLeave() {
    this.resize('1');
  }

  /**
  * Cambia el tamaño del elemento utilizando una escala proporcionada.
  * @param scale La escala a aplicar al elemento.
  */
  private resize(scale: string) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${scale})`);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
  }

}
