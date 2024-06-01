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
  * Component constructor.
  * @param apiSvc Service to make calls to the API.
  * @param messageService Service to display messages in the interface.
  * @param modal Controller to open and manage modals.
  * @param langSvc Service to manage custom translation.
  */
  constructor(
    public apiSvc: ApiService,
    private messageService: MessageService,
    private modal: ModalController,
    private langSvc: CustomTranslateService
  ) {}

  ngOnInit() {}

  // Variable for the exercises of the routines.
  exercises: any[] = [];

  // Variable to activate the second select.
  active: boolean = false;

  // Variable for the routine.
  rutina: any[] = [];

  /**
  * Activates the secondary exercise selection based on the selected body part.
  * @param event Event that contains the selected value.
  */
  activateSecondSelect(event: any) {
    const value = event.detail.value;
    console.log("Valor selccionado ", value)
    // Gets the exercises based on the selected body part.
    this.apiSvc.exerciseByBodyPart(value).subscribe(
      (reponse: any) => {
        // Assigns the obtained exercises to the corresponding property.
        this.exercises = reponse;
        this.active = true;
      },
      (error) => {
        console.error('Error al obtener el ejercicio:', error);
      }
    );
  }

  /**
  * Adds an exercise to the current routine with the provided data.
  * @param data Additional data of the exercise.
  * @param exercise Exercise to add to the routine.
  */
  addExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    // Combines the additional data with the exercise data.
    let _exercise = {
      ...exercise,
      ...data
    }
    console.log("Ejercicio con datos: ", _exercise);
    // Adds the modified exercise to the routine.
    this.rutina.push(_exercise);
    // Displays a success notification.
    this.showBottomCenterGood();
    console.log("Ejercicios: ", this.rutina);
  }

  /**
  * Removes an exercise from the current routine.
  * @param data Additional data related to the exercise.
  * @param exercise The exercise to be removed from the routine.
  */
  removeExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    // Displays an error notification.
    this.showBottomCenterBad();
    // Filters the exercises to remove the specified exercise.
    this.rutina = this.rutina.filter((item) => item.id !== exercise.id);
    console.log("Ejercicios: ", this.rutina);
  }

  /**
  * Updates the exercises of the routine and closes the modal.
  * Displays the updated list of exercises in the console.
  */
  updateExercises(){
    console.log("Ejercicios: ", this.exercises);
    // Closes the modal and passes the updated list of exercises as a result.
    this.modal.dismiss(this.rutina)
  }

  /**
  * Displays a success message at the bottom center of the message component
  * according to the selected language.
  */
  showBottomCenterGood() {
    // Subscription to the language service to get the current language.
    this.langSvc.language$.subscribe(lang => {
      // Switch to handle the different languages.
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
  * Displays an error message at the bottom center of the message component
  * according to the selected language.
  */
  showBottomCenterBad(){
    // Subscription to the language service to get the current language.
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
