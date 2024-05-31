import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore, Timestamp } from 'firebase/firestore';
import { combineLatest, map } from 'rxjs';
import { Cita } from 'src/app/core/interfaces/cita';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BackgroundService } from 'src/app/core/services/background.service';
import { CitasService } from 'src/app/core/services/citas.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalCitaComponent } from 'src/app/shared/components/modal-cita/modal-cita.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  // Varaible para el fondo
  fondo: string = "";

  /**
  * Constructor de la clase.
  * 
  * @param citasSvc Servicio para la gestión de citas.
  * @param userSvc Servicio para la gestión de usuarios.
  * @param auth Servicio de autenticación.
  * @param modal Controlador de modales.
  * @param storage Servicio para el almacenamiento.
  * @param backgroundSvc Servicio para el fondo.
  */
  constructor(
    public citasSvc: CitasService,
    public userSvc: UsersService,
    public auth: AuthService,
    private modal: ModalController,
    private storage: FirebaseService,
    private backgroundSvc: BackgroundService
  ) { }

  /**
  * Método del ciclo de vida que se ejecuta cuando el componente se inicializa.
  * Se suscribe a las colecciones de citas y usuarios, recupera la información del usuario autenticado,
  * filtra las citas del usuario y las citas públicas, y se suscribe a los cambios de fondo.
  */
  ngOnInit() {
    this.citasSvc.subscribeToCitasCollection();
    this.userSvc.subscribeToUsersCollection();
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado ", _);
      this.user = _;
      this.citasFiltered(_.uuid);
      this.citasFilteredByPublic();
    })
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  // Info del usuario
  user: any;

  // Lista de rutinas privadas
  citas: Cita[] = [];

  // Lista de rutinas publicas
  citasPublic: Cita[] = [];

  /**
  * Método para filtrar las citas asociadas a un usuario específico.
  * 
  * @param uuid El identificador único del usuario.
  */
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

  /**
  * Método para filtrar las citas públicas, es decir, aquellas que no tienen asignado un encargado.
  */
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

  /**
  * Método para mostrar las citas personales del usuario, desactivando la visualización de citas públicas.
  */
  misCitas() {
    // Desactivar la visualización de citas públicas
    this.publicCitas = false;
  }

  /**
  * Método para mostrar las citas públicas, desactivando la visualización de citas personales del usuario.
  */
  noAdmins() {
    // Activar la visualización de citas públicas
    this.publicCitas = true;
  }

  /**
  * Método para aceptar una cita.
  * 
  * @param cita La cita que se va a aceptar.
  */
  accept(cita: Cita) {
    // Cambiar el estado de la cita a "aceptado"
    cita.estado = "aceptado";
    // Actualizar la cita en la base de datos
    this.citasSvc.updateCita(cita);
  }

  /**
  * Método para denegar una cita.
  * 
  * @param cita La cita que se va a denegar.
  */
  denied(cita: Cita){
    // Cambiar el estado de la cita a "denegado"
    cita.estado = "denegado";
    // Actualizar la cita en la base de datos
    this.citasSvc.updateCita(cita);
  }

  /**
  * Método para que el administrador obtenga la cita asignándosela a sí mismo.
  * 
  * @param cita La cita que el administrador va a obtener.
  */
  getCita(cita: Cita) {
    cita.encargadoUuid = this.user.uuid;
    this.citasSvc.updateCita(cita);
  }

  /**
  * Método para eliminar una cita.
  * 
  * @param cita La cita que se va a eliminar.
  */
  deleteCita(cita: Cita) {
    this.citasSvc.deleteCita(cita);
  }

  /**
  * Método para abrir el modal de la cita y actualizar los datos necesarios.
  * 
  * @param cita La cita para la cual se abrirá el modal.
  */
  openModal(cita: Cita){
    var onDismiss = async (info: any) => {
      let fileRef = {file: ""};
      console.log("Datos: ", info);
      const file = info.data.file;
      if(file != null){
        console.log("Archivo: ", file);
        const filePath = 'files/' + file.name;
        const mimeType = file.type; // get the mime type from the file
        const prefix = 'prefix'; // replace with your prefix
        const extension = '.' + file.name.split('.').pop(); // get the extension from the file name
  
        // Convert the file to a blob
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        await new Promise((resolve) => reader.onload = resolve);
        const blob = new Blob([(reader.result || []) as BlobPart], {type: mimeType});
  
        // Upload the file to Firebase Storage
        fileRef = await this.storage.fileUpload(blob, mimeType, filePath, prefix, extension);
      }

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
        respuesta: info.data.respuesta,
        file: fileRef.file
      }
      this.citasSvc.updateCita(_cita);
    }
    this.presentForm(cita, onDismiss);
  }

  /**
  * Método para presentar el modal de los ejercicios a añadir.
  * 
  * @param data Los datos que se pasan al modal.
  * @param onDismiss La función que se ejecutará cuando se cierre el modal.
  */
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

  /**
  * Método para formatear una fecha de tipo Timestamp.
  * 
  * @param timestamp El objeto Timestamp que se va a formatear.
  * @returns Un objeto con la fecha formateada y un indicador de si la fecha es pasada o no.
  */
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
