import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent  implements OnInit {

  constructor( private _modal: ModalController ) { }

  /**
  * Inicializa el componente y programa el cierre del modal después de 3 segundos.
  */
  ngOnInit() {
    setTimeout(() => (
      this._modal.dismiss(true, 'salir')
    ), 3000);
  }

}
