import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-rutine-private',
  templateUrl: './card-rutine-private.component.html',
  styleUrls: ['./card-rutine-private.component.scss'],
})
export class CardRutinePrivateComponent  implements OnInit {

  @Input() rutina: any

  constructor() { }

  ngOnInit() {}

}
