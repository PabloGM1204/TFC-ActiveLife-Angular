import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-exercise',
  templateUrl: './item-exercise.component.html',
  styleUrls: ['./item-exercise.component.scss'],
})
export class ItemExerciseComponent  implements OnInit {

  /**
  * Input property that represents the data of an exercise.
  */
  @Input() exercise: any;

  /**
  * Output event that is emitted when a request to remove an exercise is made.
  * It emits the data of the exercise to be removed.
  */
  @Output() removeExerciseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  /**
  * Method to remove an exercise.
  * Emits an event to notify that the provided exercise is to be removed.
  * 
  * @param exercise The data of the exercise to be removed.
  */
  removeExercise(exercise: any){
    console.log("Eliminar ejercicio: ", exercise);
    this.removeExerciseEvent.emit(exercise);
  }
}
