import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleExerciseComponent } from '../detalle-exercise/detalle-exercise.component';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';

@Component({
  selector: 'app-card-exercise',
  templateUrl: './card-exercise.component.html',
  styleUrls: ['./card-exercise.component.scss'],
})
export class CardExerciseComponent  implements OnInit {

  /**
  * El ejercicio proporcionado como entrada.
  */
  @Input() exercise: any;

  /**
  * Emite un evento para agregar un ejercicio.
  * @param exercise El ejercicio a agregar.
  */
  @Output() addExerciseEvent: EventEmitter<any> = new EventEmitter<any>();
  
  /**
  * Emite un evento para eliminar un ejercicio.
  * @param exercise El ejercicio a eliminar.
  */
  @Output() removeExerciseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  // Variable para saber si el ejercicio está
  dentro: boolean = false;

  /**
  * Agrega un nuevo ejercicio a la rutina.
  * @param exercise El ejercicio que se va a agregar.
  */
  addExercise(exercise: any){
    console.log("Datos: ", exercise);
    /**
     * Callback que se ejecuta cuando se cierra el modal de agregar ejercicio.
     * @param info La información pasada desde el modal.
     */
    var onDismiss = (info: any) => {
      if(info.data){
        console.log("Información: ", info.data);
        // Emitir el evento para agregar el ejercicio
        this.addExerciseEvent.emit(info.data);
        this.dentro = true;
      } else  {
        console.log("No hay información");
      }
    }
    // Mostrar el modal para agregar ejercicio
    this.presentAddExercise(exercise, onDismiss);
  }

  /**
  * Elimina un ejercicio de la rutina.
  * @param exercise El ejercicio que se va a eliminar.
  */
  removeExercise(exercise: any){
    console.log("Eliminar ejercicio: ", exercise);
    this.removeExerciseEvent.emit(exercise);
    this.dentro = false;
  }

  /**
  * Muestra un modal para agregar un ejercicio a la rutina.
  * @param data Los datos del ejercicio que se va a agregar.
  * @param onDismiss La función que se ejecuta cuando se cierra el modal.
  */
  async presentAddExercise(data: any, onDismiss: (result: any) => void) {
    const modal = await this.modal.create({
      component: AddExerciseComponent,
      componentProps: {
        exercise: data
      },
      cssClass: "modal-add-exercise"
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        console.log("Datos: ", result.data)
        onDismiss(result);
      }
    });
  }

  /**
  * Muestra los detalles de un ejercicio.
  * @param exercise Los datos del ejercicio del cual se mostrarán los detalles.
  */
  showDetails(exercise: any){
    console.log("Datos: ", exercise);
    var onDismiss = (info: any) => {
      if(info.data){
        console.log("Información: ", info.data);
      } else  {
        console.log("No hay información");
      }
    }
    this.presentDetail(exercise, onDismiss);
  }


  /**
  * Presenta un modal con los detalles de un ejercicio.
  * @param data Los datos del ejercicio del cual se mostrarán los detalles.
  * @param onDismiss La función que se llamará cuando se cierre el modal.
  */
  async presentDetail(data: any, onDismiss: (result: any) => void) {
    const modal = await this.modal.create({
      component: DetalleExerciseComponent,
      componentProps: {
        exercise: data
      },
      cssClass: "modal-detail"
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        onDismiss(result);
      }
    });
  }

}
