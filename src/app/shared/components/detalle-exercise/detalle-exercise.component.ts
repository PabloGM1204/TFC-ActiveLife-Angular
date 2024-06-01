import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-exercise',
  templateUrl: './detalle-exercise.component.html',
  styleUrls: ['./detalle-exercise.component.scss'],
})
export class DetalleExerciseComponent  implements OnInit {

  /**
  * Input of the exercise to be displayed in the component.
  */
  @Input() exercise: any;

  constructor() { }

  ngOnInit() {}

}
