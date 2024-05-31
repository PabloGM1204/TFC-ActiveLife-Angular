import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-rutine',
  templateUrl: './card-rutine.component.html',
  styleUrls: ['./card-rutine.component.scss'],
})
export class CardRutineComponent  implements OnInit {

  // Variable para saber si la página es la de inicio
  isLandingPage: boolean = false;

  /**
  * La rutina proporcionado como entrada.
  */
  @Input() rutina: any;

  /**
  * Emite un evento para copiar un ejercicio.
  * @param exercise El ejercicio a copiar.
  */
  @Output() copyExerciseEvent: EventEmitter<any> = new EventEmitter<any>();


  constructor(private router: Router) { }

  // Al iniciar el componente se comprueba si la página es landing
  ngOnInit() {
    this.isLandingPage = this.router.url === '/landing';
  }

  /**
  * Emite un evento para copiar una rutina.
  * @param rutina La rutina que se desea copiar.
  */
  copyRutine(rutina: any) {
    console.log('copiar rutina', rutina);
    this.copyExerciseEvent.emit(rutina);
  }

}
