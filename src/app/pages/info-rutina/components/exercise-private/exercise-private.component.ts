import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-exercise-private',
  templateUrl: './exercise-private.component.html',
  styleUrls: ['./exercise-private.component.scss'],
})
export class ExercisePrivateComponent  implements OnInit {

  /**
  * The exercise received as input for the component.
  */
  @Input() exercise: any;

  /**
  * Event emitted when a request to remove an exercise is made.
  */
  @Output() removeExerciseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  /**
  * Emits an event to request the removal of an exercise.
  * @param exercise The exercise to be removed.
  */
  removeExercise(exercise: any){
    console.log("Eliminar ejercicio: ", exercise);
    this.removeExerciseEvent.emit(exercise);
  }

}
