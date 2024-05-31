import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-exercise',
  templateUrl: './item-exercise.component.html',
  styleUrls: ['./item-exercise.component.scss'],
})
export class ItemExerciseComponent  implements OnInit {

  /**
  * Propiedad de entrada que representa los datos de un ejercicio.
  */
  @Input() exercise: any;

  /**
  * Evento de salida que se emite cuando se solicita eliminar un ejercicio.
  * Emite los datos del ejercicio que se va a eliminar.
  */
  @Output() removeExerciseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  /**
  * Método para eliminar un ejercicio.
  * Emite un evento para notificar que se desea eliminar el ejercicio proporcionado.
  * 
  * @param exercise Los datos del ejercicio que se va a eliminar.
  */
  removeExercise(exercise: any){
    console.log("Eliminar ejercicio: ", exercise);
    this.removeExerciseEvent.emit(exercise);
  }
}
