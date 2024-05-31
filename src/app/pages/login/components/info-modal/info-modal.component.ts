import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent  implements OnInit {

  /**
  * Información pasada al componente como entrada.
  */
  @Input() info: any;

  constructor() { }

  ngOnInit() {}

}
