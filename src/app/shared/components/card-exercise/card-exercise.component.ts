import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-exercise',
  templateUrl: './card-exercise.component.html',
  styleUrls: ['./card-exercise.component.scss'],
})
export class CardExerciseComponent  implements OnInit {

  @Input() exercise: any;

  constructor() { }

  ngOnInit() {}

}
