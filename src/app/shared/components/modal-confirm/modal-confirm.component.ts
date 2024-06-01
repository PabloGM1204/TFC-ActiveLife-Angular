import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent  implements OnInit {

  constructor( private _modal: ModalController ) { }

  ngOnInit(): void {}

  /**
  * Confirms and closes the modal with a boolean value of true.
  */
  confirm() {
    this._modal.dismiss(true, 'salir');
  }

  /**
  * Cancels and closes the modal with a boolean value of false.
  */
  cancel() {
    this._modal.dismiss(false, 'quedarse');
  }

}
