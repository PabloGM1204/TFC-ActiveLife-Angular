import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-rutine',
  templateUrl: './card-rutine.component.html',
  styleUrls: ['./card-rutine.component.scss'],
})
export class CardRutineComponent  implements OnInit {

  isLandingPage: boolean = false;

  @Input() rutina: any;
  @Output() copyExerciseEvent: EventEmitter<any> = new EventEmitter<any>();


  constructor(private router: Router) { }

  ngOnInit() {
    this.isLandingPage = this.router.url === '/landing';
  }

  copyRutine(rutina: any) {
    console.log('copiar rutina', rutina);
    this.copyExerciseEvent.emit(rutina);
  }

}
