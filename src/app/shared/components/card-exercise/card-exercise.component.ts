import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleExerciseComponent } from '../detalle-exercise/detalle-exercise.component';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';

@Component({
  selector: 'app-card-exercise',
  templateUrl: './card-exercise.component.html',
  styleUrls: ['./card-exercise.component.scss'],
})
export class CardExerciseComponent  implements OnInit {

  @Input() exercise: any;

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}

  // Añadir erjercicio a la rutina
  addExercise(exercise: any){
    console.log("Datos: ", exercise);
    var onDismiss = (info: any) => {
      if(info.data){
        console.log("Información: ", info.data);
      } else  {
        console.log("No hay información");
      }
    }
    this.presentAddExercise(exercise, onDismiss);
  }

  // Modal para ver el detalle del ejercicio
  async presentAddExercise(data: any, onDismiss: (result: any) => void) {
    const modal = await this.modal.create({
      component: AddExerciseComponent,
      componentProps: {
        exercise: data
      },
      cssClass: "modal"
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        console.log("Datos: ", result.data)
        onDismiss(result);
      }
    });
  }

  // Ver detalles del ejercicio
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


  // Modal para ver el detalle del ejercicio
  async presentDetail(data: any, onDismiss: (result: any) => void) {
    const modal = await this.modal.create({
      component: DetalleExerciseComponent,
      componentProps: {
        exercise: data
      },
      cssClass: "modal"
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        onDismiss(result);
      }
    });
  }

}
