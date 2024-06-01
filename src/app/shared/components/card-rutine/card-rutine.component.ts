import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-rutine',
  templateUrl: './card-rutine.component.html',
  styleUrls: ['./card-rutine.component.scss'],
})
export class CardRutineComponent  implements OnInit {

  // Variable to determine if the page is the homepage.
  isLandingPage: boolean = false;

  /**
  * The routine provided as input.
  */
  @Input() rutina: any;

  /**
  * Emits an event to copy an exercise.
  * @param exercise The exercise to copy.
  */
  @Output() copyExerciseEvent: EventEmitter<any> = new EventEmitter<any>();


  constructor(private router: Router) { }

  // Upon component initialization, it checks if the page is the landing page.
  ngOnInit() {
    this.isLandingPage = this.router.url === '/landing';
  }

  /**
  * Emits an event to copy a routine.
  * @param rutina The routine to copy.
  */
  copyRutine(rutina: any) {
    console.log('copiar rutina', rutina);
    this.copyExerciseEvent.emit(rutina);
  }

}
