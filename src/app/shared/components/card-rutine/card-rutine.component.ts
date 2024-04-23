import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-rutine',
  templateUrl: './card-rutine.component.html',
  styleUrls: ['./card-rutine.component.scss'],
})
export class CardRutineComponent  implements OnInit {

  @Input() rutina: any;

  constructor() { }

  ngOnInit() {}

}
