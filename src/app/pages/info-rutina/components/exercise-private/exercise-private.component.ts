import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-exercise-private',
  templateUrl: './exercise-private.component.html',
  styleUrls: ['./exercise-private.component.scss'],
})
export class ExercisePrivateComponent  implements OnInit {

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
