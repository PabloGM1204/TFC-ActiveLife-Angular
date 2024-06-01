import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cita } from 'src/app/core/interfaces/cita';
import { Timestamp } from 'firebase/firestore';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modal-cita',
  templateUrl: './modal-cita.component.html',
  styleUrls: ['./modal-cita.component.scss'],
})
export class ModalCitaComponent  implements OnInit {

  /**
  * Input of the appointment to be displayed in the component.
  */
  @Input() cita: Cita | undefined;

  // Response to the appointment.
  respuesta: string | undefined = '';

  constructor( private modalController: ModalController ) { }

  // Boolean to know if the appointment has a response.
  resp: boolean = false;

  /**
  * Initializes the component and checks if an appointment with an assigned attendant has been received.
  */
  ngOnInit() {
    console.log("Cita recibida: ", this.cita);
    if(this.cita?.encargadoUuid){
      this.resp = true;
    }
  }

  /**
  * Closes the current modal.
  */
  dismissModal() {
    this.modalController.dismiss();
  }

  // Boolean to know if the appointment has a response.
  activo: boolean = false;
  
  /**
  * Enables or disables the response to the appointment.
  */
  activateAnswer() {
    this.activo = !this.activo;
  }

  /**
  * Gets the formatted date of an appointment.
  * @param timestamp The timestamp of the appointment.
  * @returns A string with the formatted date and time.
  */
  getCitaDate(timestamp: Timestamp): string {
    // Convierte el Timestamp a un objeto Date
    const date = timestamp.toDate(); 
    // Devuelve una cadena con la fecha y hora formateada
    return date.toLocaleString(); 
  }

  // Uploaded file.
  selectedFile: File | null = null;

  /**
  * Handles the upload of a selected file.
  * @param event The file change event.
  */
  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /**
  * Sends the response to the appointment and closes the modal.
  */
  sendAnswer() {
    console.log("Respuesta: ", this.respuesta);
    // If the appointment exists, I add the response to it.
    if(this.cita){
      this.cita.respuesta = this.respuesta;
    }
    console.log("Cita a responder: ", this.cita);
    // Closes the modal and returns the appointment with the response plus the file.
    this.modalController.dismiss({...this.cita, file: this.selectedFile});
  }

}
