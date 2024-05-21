import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-rutine',
  templateUrl: './card-rutine.component.html',
  styleUrls: ['./card-rutine.component.scss'],
})
export class CardRutineComponent  implements OnInit {

  @Input() rutina: any;
  @Output() copyExerciseEvent: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {}

  copyRutine(rutina: any) {
    console.log('copiar rutina', rutina);
    this.copyExerciseEvent.emit(rutina);
  }

}
