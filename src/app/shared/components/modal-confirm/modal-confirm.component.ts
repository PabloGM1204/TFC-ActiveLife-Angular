import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent  implements OnInit {

  constructor(
    private _modal: ModalController
  ) { }

  ngOnInit(): void {}

  confirm() {
    this._modal.dismiss(true, 'salir');
  }

  cancel() {
    this._modal.dismiss(false, 'quedarse');
  }

}
