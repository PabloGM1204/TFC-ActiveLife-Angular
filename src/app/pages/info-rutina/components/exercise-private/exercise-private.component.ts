import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-exercise-private',
  templateUrl: './exercise-private.component.html',
  styleUrls: ['./exercise-private.component.scss'],
})
export class ExercisePrivateComponent  implements OnInit {

  /**
  * El ejercicio recibido como entrada para el componente.
  */
  @Input() exercise: any;

  /**
  * Evento emitido cuando se solicita eliminar un ejercicio.
  */
  @Output() removeExerciseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  /**
  * Emite un evento para solicitar la eliminación de un ejercicio.
  * @param exercise El ejercicio que se va a eliminar.
  */
  removeExercise(exercise: any){
    console.log("Eliminar ejercicio: ", exercise);
    this.removeExerciseEvent.emit(exercise);
  }

}
