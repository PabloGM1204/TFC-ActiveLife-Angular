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

  // Variable for the background.
  fondo: string = "";

  /**
  * Constructor of the class.
  * 
  * @param citasSvc Service for managing appointments.
  * @param userSvc Service for managing users.
  * @param auth Authentication service.
  * @param modal Modal controller.
  * @param storage Storage service.
  * @param backgroundSvc Background service.
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
  * Lifecycle method that executes when the component is initialized.
  * Subscribes to the collections of appointments and users, retrieves information of the authenticated user,
  * filters user appointments and public appointments, and subscribes to background changes.
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

  // User info.
  user: any;

  // List of private routines.
  citas: Cita[] = [];

  // List of public routines.
  citasPublic: Cita[] = [];

  // List of private routines filtered by user and search.
  filteredCitas: Cita[] = [];

  // List of public routines filtered by search.
  filteredCitasPublic: Cita[] = [];

  /**
  * Method to filter appointments based on the search term.
  * 
  * @param event The input event from the search field.
  */
  filterCitas(event: any) {
    const searchTerm = event.target.value.toLowerCase();
  
    const filterFunction = (cita: Cita) => {
      const fechaCitaStr = this.getCitaDate(cita.fechaCita).fechaFormateada.toLowerCase();
      return (
        cita.titulo.toLowerCase().includes(searchTerm) ||
        cita.descripcion.toLowerCase().includes(searchTerm) ||
        cita.clienteNombre!.toLowerCase().includes(searchTerm) ||
        fechaCitaStr.includes(searchTerm)
      );
    };
  
    if (!this.publicCitas) {
      this.filteredCitas = this.citas.filter(filterFunction);
    } else {
      this.filteredCitasPublic = this.citasPublic.filter(filterFunction);
    }
  }

  /**
  * Method to filter appointments associated with a specific user.
  * 
  * @param uuid The unique identifier of the user.
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
      this.filteredCitas = filteredCitas;
      console.log("RESULTADO DE LAS CITAS FILTRADAS: ", this.citas);
    });
  }

  /**
  * Method to filter public appointments, i.e., those that do not have an assigned attendant.
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
      this.filteredCitasPublic = filteredCitas;
      console.log("RESULTADO DE LAS RUTINAS PUBLICAS: ", this.citasPublic);
    });
  }

  // Variable to enable or disable public appointments.
  publicCitas: boolean = false;

  /**
  * Method to display the user's personal appointments, disabling the display of public appointments.
  */
  misCitas() {
    // Disable the display of public appointments.
    this.publicCitas = false;
  }

  /**
  * Method to display public appointments, disabling the display of the user's personal appointments.
  */
  noAdmins() {
    // Enable the display of public appointments.
    this.publicCitas = true;
  }

  /**
  * Method to accept an appointment.
  * 
  * @param cita The appointment to be accepted.
  */
  accept(cita: Cita) {
    // Change the status of the appointment to "accepted".
    cita.estado = "aceptado";
    // Update the appointment in the database
    this.citasSvc.updateCita(cita);
  }

  /**
  * Method to deny an appointment.
  * 
  * @param cita The appointment to be denied.
  */
  denied(cita: Cita){
    // Change the status of the appointment to "denied".
    cita.estado = "denegado";
    // Update the appointment in the database
    this.citasSvc.updateCita(cita);
  }

  /**
  * Method for the administrator to claim the appointment by assigning it to themselves.
  * 
  * @param cita The appointment the administrator will claim.
  */
  getCita(cita: Cita) {
    cita.encargadoUuid = this.user.uuid;
    this.citasSvc.updateCita(cita);
  }

  /**
  * Method to delete an appointment.
  * 
  * @param cita The appointment to be deleted.
  */
  deleteCita(cita: Cita) {
    this.citasSvc.deleteCita(cita);
  }

  /**
  * Method to open the appointment modal and update necessary data.
  * 
  * @param cita The appointment for which the modal will be opened.
  */
  openModal(cita: Cita){
    var onDismiss = async (info: any) => {
      let fileRef = {file: ""};
      console.log("Datos: ", info);
      const file = info.data.file;
      if(file != null){
        console.log("Archivo: ", file);
        const filePath = 'files/' + file.name;
        // Get the mime type from the file
        const mimeType = file.type; 
        // Replace with your prefix
        const prefix = 'prefix'; 
        // Get the extension from the file name
        const extension = '.' + file.name.split('.').pop(); 
  
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
        fileUrl: fileRef.file
      }
      this.citasSvc.updateCita(_cita);
    }
    this.presentForm(cita, onDismiss);
  }

  /**
  * Method to present the modal for adding exercises.
  * 
  * @param data The data passed to the modal.
  * @param onDismiss The function to be executed when the modal is dismissed.
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
  * Method to format a date of type Timestamp.
  * 
  * @param timestamp The Timestamp object to format.
  * @returns An object with the formatted date and an indicator of whether the date is in the past or not.
  */
  getCitaDate(timestamp: Timestamp): { fechaFormateada: string, pasada: boolean } {
    const citaDate = timestamp.toDate();
    const currentDate = new Date();
    const pasada = citaDate < currentDate;
    // Format the date and time.
    const fechaFormateada = citaDate.toLocaleString();

    // Returns the formatted date and an indicator of whether the appointment is in the past or not
    return { fechaFormateada, pasada };
  }
}
