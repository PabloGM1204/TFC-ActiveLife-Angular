import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  constructor(
    public userSvc: UsersService,
    private modal: ModalController,
  ) { }

  ngOnInit() {
    this.userSvc.subscribeToUsersCollection();
  }

  // Metodo para que un admin acepte un usuario
  accept(user: User){
    console.log("Aceptar usuario: ", user)
    this.userSvc.acceptUser(user)
  }

  // Metodo para eliminar un usuario
  deleteUser(user: User){
    var onDismiss = (result:any)=>{
      console.log("Resultado del modal: ", result)
      if(result.data){
        console.log("Eliminar usuario: ", user)
        this.userSvc.deleteUser(user)
      } else {
        console.log("Cancelar borrado")
      }
    }
    this.modalConfirm(onDismiss)
  }

  // Modal para la confirmacion de eliminar usuario
  async modalConfirm(onDismiss:(result:any)=>void){
    const modal = await this.modal.create({
      component: ModalConfirmComponent,
      cssClass:"modal-boton"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

}
