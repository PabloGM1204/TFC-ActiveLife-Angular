import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

@Component({
  selector: 'app-modal-exercise',
  templateUrl: './modal-exercise.component.html',
  styleUrls: ['./modal-exercise.component.scss'],
})
export class ModalExerciseComponent  implements OnInit {

  /**
  * Constructor del componente.
  * @param apiSvc Servicio para realizar llamadas a la API.
  * @param messageService Servicio para mostrar mensajes en la interfaz.
  * @param modal Controlador para abrir y gestionar modales.
  * @param langSvc Servicio para gestionar la traducción personalizada.
  */
  constructor(
    public apiSvc: ApiService,
    private messageService: MessageService,
    private modal: ModalController,
    private langSvc: CustomTranslateService
  ) {}

  ngOnInit() {}

  // Variable para los ejercicios de las rutinas
  exercises: any[] = [];

  // Variable para activar el segundo select
  active: boolean = false;

  // Variable para la rutina
  rutina: any[] = [];

  /**
  * Activa la selección secundaria de ejercicios según la parte del cuerpo seleccionada.
  * @param event Evento que contiene el valor seleccionado.
  */
  activateSecondSelect(event: any) {
    const value = event.detail.value;
    console.log("Valor selccionado ", value)
    // Obtiene los ejercicios según la parte del cuerpo seleccionada
    this.apiSvc.exerciseByBodyPart(value).subscribe(
      (reponse: any) => {
        // Asigna los ejercicios obtenidos a la propiedad correspondiente
        this.exercises = reponse;
        this.active = true;
      },
      (error) => {
        console.error('Error al obtener el ejercicio:', error);
      }
    );
  }

  /**
  * Añade un ejercicio a la rutina actual con los datos proporcionados.
  * @param data Datos adicionales del ejercicio.
  * @param exercise Ejercicio a añadir a la rutina.
  */
  addExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    // Combina los datos adicionales con los del ejercicio
    let _exercise = {
      ...exercise,
      ...data
    }
    console.log("Ejercicio con datos: ", _exercise);
    // Añade el ejercicio modificado a la rutina
    this.rutina.push(_exercise);
    // Muestra una notificación de éxito
    this.showBottomCenterGood();
    console.log("Ejercicios: ", this.rutina);
  }

  /**
  * Elimina un ejercicio de la rutina actual.
  * @param data Datos adicionales relacionados con el ejercicio.
  * @param exercise El ejercicio a eliminar de la rutina.
  */
  removeExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    // Muestra una notificación de error
    this.showBottomCenterBad();
    // Filtra los ejercicios para eliminar el ejercicio especificado
    this.rutina = this.rutina.filter((item) => item.id !== exercise.id);
    console.log("Ejercicios: ", this.rutina);
  }

  /**
  * Actualiza los ejercicios de la rutina y cierra el modal.
  * Muestra la lista actualizada de ejercicios en la consola.
  */
  updateExercises(){
    console.log("Ejercicios: ", this.exercises);
    // Cierra el modal y pasa la lista actualizada de ejercicios como resultado
    this.modal.dismiss(this.rutina)
  }

  /**
  * Muestra un mensaje de éxito en la parte inferior centrada del componente de mensajes
  * según el idioma seleccionado.
  */
  showBottomCenterGood() {
    // Subscripción al servicio de idioma para obtener el idioma actual
    this.langSvc.language$.subscribe(lang => {
      // Switch para manejar los diferentes idiomas
      switch(lang){
        case 'es':
          this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Ejercicio añadido' });
          break;
        case 'en':
          this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Added exercise' });
          break;
        case 'it':
          this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Aggiunto esercizio' });
          break;
      }
    })
  }

  /**
  * Muestra un mensaje de error en la parte inferior centrada del componente de mensajes
  * según el idioma seleccionado.
  */
  showBottomCenterBad(){
    // Subscripción al servicio de idioma para obtener el idioma actual
    this.langSvc.language$.subscribe(lang => { 
      switch(lang){
        case 'es':
          this.messageService.add({ key: 'er', severity: 'error', summary: 'Eliminado', detail: 'Ejercicio eliminado de la rutina' });
          break;
        case 'en':
          this.messageService.add({ key: 'er', severity: 'error', summary: 'Eliminado', detail: 'Exercise removed from the routine' });
          break;
        case 'it':
          this.messageService.add({ key: 'er', severity: 'error', summary: 'Eliminado', detail: 'Esercizio rimosso dalla routine' });
          break;
      }
    })
  }

}
