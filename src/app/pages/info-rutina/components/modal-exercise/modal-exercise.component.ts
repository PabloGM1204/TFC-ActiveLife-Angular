import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-modal-exercise',
  templateUrl: './modal-exercise.component.html',
  styleUrls: ['./modal-exercise.component.scss'],
})
export class ModalExerciseComponent  implements OnInit {

  constructor(
    public apiSvc: ApiService,
    private messageService: MessageService,
    private modal: ModalController
  ) {}

  ngOnInit() {}

  exercises: any[] = [];

  active: boolean = false;

  rutina: any[] = [];

  // Obtener los ejercicios por parte del cuerpo y activar el segundo select
  activateSecondSelect(event: any) {
    const value = event.detail.value;
    console.log("Valor selccionado ", value)
    this.apiSvc.exerciseByBodyPart(value).subscribe(
      (reponse: any) => {
        this.exercises = reponse;
        this.active = true;
      },
      (error) => {
        console.error('Error al obtener el ejercicio:', error);
      }
    );
  }

  // Añadir ejercicio a la rutina
  addExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    let _exercise = {
      ...exercise,
      ...data
    }
    console.log("Ejercicio con datos: ", _exercise);
    this.rutina.push(_exercise);
    this.showBottomCenterGood();
    console.log("Ejercicios: ", this.rutina);
  }

  // Eliminar ejercicio de la rutina
  removeExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    this.showBottomCenterBad();
    this.rutina = this.rutina.filter((item) => item.id !== exercise.id);
    console.log("Ejercicios: ", this.rutina);
  }

  // Método para cerrar el modal
  updateExercises(){
    console.log("Ejercicios: ", this.exercises);
    this.modal.dismiss(this.rutina)
  }

  showBottomCenterGood() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Ejercicio Añadido' });
  }

  showBottomCenterBad(){
    this.messageService.add({ key: 'er', severity: 'error', summary: 'Error', detail: 'Ejercicio eliminado de la rutina' });
  }

}
