import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleExerciseComponent } from '../detalle-exercise/detalle-exercise.component';

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




  showDetails(exercise: any){
    console.log("Datos: ", exercise);
    var onDismiss = (info: any) => {
      if(info.data){
        console.log("Información: ", info.data);
      } else  {
        console.log("No hay información");
      }
    }
    this.presentModal(exercise, onDismiss);
  }


  // Modal para ver el detalle del ejercicio
  async presentModal(data: any, onDismiss: (result: any) => void) {
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
