import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';
import { BackgroundService } from 'src/app/core/services/background.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  // Variable para guardar el fondo de la página
  fondo: string = "";

  /**
  * Constructor del componente.
  * @param userSvc Servicio de usuarios para manejar la información del usuario.
  * @param modal Controlador de modales para abrir y gestionar modales.
  * @param backgroundSvc Servicio de fondo para gestionar el fondo del componente.
  */
  constructor(
    public userSvc: UsersService,
    private modal: ModalController,
    private backgroundSvc: BackgroundService,
  ) { }

  /**
  * Método que se ejecuta al inicializar el componente.
  * Subscribes al servicio de usuarios para obtener la colección de usuarios.
  * Subscribes al servicio de fondo para actualizar el fondo del componente.
  */
  ngOnInit() {
    this.userSvc.subscribeToUsersCollection();
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  /**
  * Método para aceptar un usuario.
  * 
  * @param user El usuario que se va a aceptar.
  */
  accept(user: User){
    console.log("Aceptar usuario: ", user)
    this.userSvc.acceptUser(user)
  }

  /**
  * Método para eliminar un usuario.
  * 
  * @param user El usuario que se va a eliminar.
  */
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

  /**
  * Método para mostrar un modal de confirmación.
  * 
  * @param onDismiss Función que se ejecuta cuando se cierra el modal, recibe el resultado del modal como parámetro.
  */
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
