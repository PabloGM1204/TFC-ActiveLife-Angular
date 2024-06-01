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
  * The exercise provided as input.
  */
  @Input() exercise: any;

 /**
  * Emits an event to add an exercise.
  * @param exercise The exercise to add.
  */
  @Output() addExerciseEvent: EventEmitter<any> = new EventEmitter<any>();
  
  /**
  * Emits an event to delete an exercise.
  * @param exercise The exercise to delete.
  */
  @Output() removeExerciseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor( private modal: ModalController ) { }

  ngOnInit() {}

  // Variable to know if the exercise is.
  dentro: boolean = false;

  /**
  * Adds a new exercise to the routine.
  * @param exercise The exercise that is going to be added.
  */
  addExercise(exercise: any){
    console.log("Datos: ", exercise);
    /**
    * Callback that is executed when the add exercise modal is closed.
    * @param info The information passed from the modal.
    */
    var onDismiss = (info: any) => {
      if(info.data){
        console.log("Información: ", info.data);
        // Emit the event to add the exercise.
        this.addExerciseEvent.emit(info.data);
        this.dentro = true;
      } else  {
        console.log("No hay información");
      }
    }
    // Display the modal to add exercise.
    this.presentAddExercise(exercise, onDismiss);
  }

  /**
  * Deletes an exercise from the routine.
  * @param exercise The exercise that is going to be deleted.
  */
  removeExercise(exercise: any){
    console.log("Eliminar ejercicio: ", exercise);
    this.removeExerciseEvent.emit(exercise);
    this.dentro = false;
  }

  /**
  * Displays a modal to add an exercise to the routine.
  * @param data The data of the exercise that is going to be added.
  * @param onDismiss The function that runs when the modal is closed.
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
  * Displays the details of an exercise.
  * @param exercise The data of the exercise whose details will be displayed.
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
  * Presents a modal with the details of an exercise.
  * @param data The exercise data to display details from.
  * @param onDismiss The function to call when the modal is closed.
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
