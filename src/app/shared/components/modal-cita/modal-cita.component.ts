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
  * Entrada de la cita que se mostrará en el componente.
  */
  @Input() cita: Cita | undefined;

  // Respuesta a la cita
  respuesta: string | undefined = '';

  constructor( private modalController: ModalController ) { }

  // Booleano para saber si la cita tiene respuesta
  resp: boolean = false;

  /**
  * Inicializa el componente y verifica si se ha recibido una cita con un encargado asignado.
  */
  ngOnInit() {
    console.log("Cita recibida: ", this.cita);
    if(this.cita?.encargadoUuid){
      this.resp = true;
    }
  }

  /**
  * Cierra el modal actual.
  */
  dismissModal() {
    this.modalController.dismiss();
  }

  // Booleano para saber si la cita tiene respuesta
  activo: boolean = false;
  
  /**
  * Activa o desactiva la respuesta de la cita.
  */
  activateAnswer() {
    this.activo = !this.activo;
  }

  /**
  * Obtiene la fecha formateada de una cita.
  * @param timestamp El timestamp de la cita.
  * @returns Una cadena con la fecha y hora formateada.
  */
  getCitaDate(timestamp: Timestamp): string {
    // Convierte el Timestamp a un objeto Date
    const date = timestamp.toDate(); 
    // Devuelve una cadena con la fecha y hora formateada
    return date.toLocaleString(); 
  }

  // Archivo subido
  selectedFile: File | null = null;

  /**
  * Maneja la carga de un archivo seleccionado.
  * @param event El evento del cambio de archivo.
  */
  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /**
  * Envía la respuesta a la cita y cierra el modal.
  */
  sendAnswer() {
    console.log("Respuesta: ", this.respuesta);
    // Si la cita existe le añado al respuesta
    if(this.cita){
      this.cita.respuesta = this.respuesta;
    }
    console.log("Cita a responder: ", this.cita);
    // Cierra el modal y devuelve la cita con la respuesta mas el archivo
    this.modalController.dismiss({...this.cita, file: this.selectedFile});
  }

}
