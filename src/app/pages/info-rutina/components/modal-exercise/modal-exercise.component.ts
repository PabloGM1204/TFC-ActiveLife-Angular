import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-modal-exercise',
  templateUrl: './modal-exercise.component.html',
  styleUrls: ['./modal-exercise.component.scss'],
})
export class ModalExerciseComponent  implements OnInit {

  constructor(
    public apiSvc: ApiService
  ) {}

  ngOnInit() {}

  exercises: any[] = [];

  // Obtener los ejercicios por parte del cuerpo y activar el segundo select
  activateSecondSelect(event: any) {
    const value = event.detail.value;
    console.log("Valor selccionado ", value)
    this.apiSvc.exerciseByBodyPart(value).subscribe(
      (reponse: any) => {
        this.exercises = reponse;
      },
      (error) => {
        console.error('Error al obtener el ejercicio:', error);
      }
    );
  }

}
