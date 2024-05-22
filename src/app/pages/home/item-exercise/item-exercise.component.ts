import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-exercise',
  templateUrl: './item-exercise.component.html',
  styleUrls: ['./item-exercise.component.scss'],
})
export class ItemExerciseComponent  implements OnInit {

  @Input() exercise: any;

  @Output() removeExerciseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  // Eliminar ejercicio de la rutina
  removeExercise(exercise: any){
    console.log("Eliminar ejercicio: ", exercise);
    this.removeExerciseEvent.emit(exercise);
  }
}
