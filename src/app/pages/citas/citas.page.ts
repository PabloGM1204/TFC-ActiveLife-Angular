import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';
import { combineLatest, map } from 'rxjs';
import { Cita } from 'src/app/core/interfaces/cita';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CitasService } from 'src/app/core/services/citas.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalCitaComponent } from 'src/app/shared/components/modal-cita/modal-cita.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  constructor(
    public citasSvc: CitasService,
    public userSvc: UsersService,
    public auth: AuthService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.citasSvc.subscribeToCitasCollection();
    this.userSvc.subscribeToUsersCollection();
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado ", _);
      this.user = _;
      this.citasFiltered(_.uuid);
      this.citasFilteredByPublic();
    })
  }

  // Info del usuario
  user: any;

  // Lista de rutinas privadas
  citas: Cita[] = [];

  // Lista de rutinas publicas
  citasPublic: Cita[] = [];

  // Método para filtrar citas y añadir foto del usuario
  citasFiltered(uuid: string) {
    combineLatest([this.citasSvc.citas$, this.userSvc.users$]).pipe(
      map(([citas, users]) => 
        citas
          .filter(cita => cita?.encargadoUuid === uuid).map(cita => {
            const user = users.find(user => user.uuid === cita.userUUID);
            return {
              ...cita,
              encargadoNombre: this.user.name,
              clienteNombre: user!.username,
              clienteFoto: user?.imageUrl ? user?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51"
            };
          })
      )
    ).subscribe(filteredCitas => {
      this.citas = filteredCitas;
      console.log("RESULTADO DE LAS CITAS FILTRADAS: ", this.citas);
    });
  }

  // Citas públicas con fotos de clientes 
  citasFilteredByPublic() {
    combineLatest([this.citasSvc.citas$, this.userSvc.users$]).pipe(
      map(([citas, users]) => 
        citas
          .filter(cita => !cita.encargadoUuid)
          .map(cita => {
            const user = users.find(user => user.uuid === cita.userUUID);
            console.log("Usuario encontrado: ", users)
            return {
              ...cita,
              encargadoNombre: "Ninguno",
              clienteNombre: user?.username,
              clienteFoto: user?.imageUrl ? user?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51"
            };
          })
      )
    ).subscribe(filteredCitas => {
      this.citasPublic = filteredCitas;
      console.log("RESULTADO DE LAS RUTINAS PUBLICAS: ", this.citasPublic);
    });
  }

  // Variable para activar o no las citas publicas
  publicCitas: boolean = false;

  // Metodo de boton para ver las citas de un admin en concreto
  misCitas() {
    this.publicCitas = false;
  }

  // Metodo de boton para ver todas las citas
  noAdmins() {
    this.publicCitas = true;
  }

  // Para aceptar una cita
  accept(cita: Cita) {
    cita.estado = "aceptado";
    this.citasSvc.updateCita(cita);
  }

  // Para denegar una cita
  denied(cita: Cita){
    cita.estado = "denegado";
    this.citasSvc.updateCita(cita);
  }

  // Para que el admin obtenga la cita
  getCita(cita: Cita) {
    cita.encargadoUuid = this.user.uuid;
    this.citasSvc.updateCita(cita);
  }

  // Para eliminar una cita
  deleteCita(cita: Cita) {
    this.citasSvc.deleteCita(cita);
  }

  // Métodos para añadir y eliminar ejercicios de la rutina
  openModal(cita: Cita){
    var onDismiss = (info: any) => {
      console.log("Datos: ", info);
      let _cita = {
        id: info.data.id,
        descripcion: info.data.descripcion,
        fechaCita: info.data.fechaCita,
        fechaSolicitud: info.data.fechaSolicitud,
        imagen: info.data.imagen,
        titulo: info.data.titulo,
        userUUID: info.data.userUUID,
        encargadoUuid: info.data.encargadoUuid,
        estado: info.data.estado,
        respuesta: info.data.respuesta
      }
      this.citasSvc.updateCita(_cita);
    }
    this.presentForm(cita, onDismiss);
  }

  // Método para ver el modal de los ejercicios a añadir
  async presentForm(data: any | null, onDismiss:(result:any)=>void){
    const modal = await this.modal.create({
      component: ModalCitaComponent,
      componentProps:{
        cita: data
      },
      cssClass:"modal-selector"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

  // Método para formatear una fecha de tipo Timestamp
  getCitaDate(timestamp: Timestamp): { fechaFormateada: string, pasada: boolean } {
    const citaDate = timestamp.toDate(); // Convierte el Timestamp a un objeto Date
    const currentDate = new Date(); // Fecha y hora actuales
    const pasada = citaDate < currentDate;  // Comprueba si la fecha es anterior a la actual
    // Formatea la fecha y hora
    const fechaFormateada = citaDate.toLocaleString(); // Devuelve una cadena con la fecha y hora formateada

    // Devuelve la fecha formateada y un indicador de si la cita es pasada o no
    return { fechaFormateada, pasada };
  }
}
