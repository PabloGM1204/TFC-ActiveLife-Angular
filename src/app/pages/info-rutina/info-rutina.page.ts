import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaService } from 'src/app/core/services/rutina.service';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { ModalController } from '@ionic/angular';
import { ModalExerciseComponent } from './components/modal-exercise/modal-exercise.component';
import { BackgroundService } from 'src/app/core/services/background.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

@Component({
  selector: 'app-info-rutina',
  templateUrl: './info-rutina.page.html',
  styleUrls: ['./info-rutina.page.scss'],
})
export class InfoRutinaPage implements OnInit {

  // Routine form.
  form: FormGroup;

  // ID of the routine.
  id: any;

  // Exercise selection.
  secondSelect: boolean = false;

  // List of exercises.
  exercises: any[] = [];

  // List of routines.
  rutina: any[] = [];

  // Variable for the background.
  fondo: string = "";

  /**
  * Class constructor.
  * @param formBuilder FormBuilder instance for form creation.
  * @param apiSvc ApiService for making calls to the API.
  * @param messageService MessageService for displaying messages in the user interface.
  * @param route ActivatedRoute instance to get information about the active route.
  * @param rutinaSvc RutinaService for handling routines.
  * @param modal ModalController for displaying and controlling modals.
  * @param router Router instance for navigation between components and routes.
  * @param backgroundSvc BackgroundService for managing the application background.
  * @param langSvc CustomTranslateService for managing custom translations.
  */
  constructor(
    private formBuilder: FormBuilder,
    public apiSvc: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private rutinaSvc: RutinaService,
    private modal: ModalController,
    private router: Router,
    private backgroundSvc: BackgroundService,
    private langSvc: CustomTranslateService
  ) {
    // Initialization of the form with the required fields and their validators.
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      day: ['', [Validators.required]],
      public: [false, [Validators.required]],
      description: ['']
    });
  }

  /**
  * ngOnInit method to initialize the instance of the class.
  */
  ngOnInit() {
    // Gets the ID of the active route from the route parameters.
    this.id = this.route.snapshot.paramMap.get('id');
    // If a valid ID is provided, load the corresponding routine.
    if(this.id != null){
      this.loadRutine();
    }
    // Subscribes to changes in the application background.
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  /**
  * Method to load the data of a specific routine using its ID.
  */
  loadRutine(){
    console.log("ID de la rutina: ", this.id);
    this.rutinaSvc.getRutina(this.id).subscribe((rutina: any) => {
      //this.rutina = rutina;
      this.exercises = rutina.exercises;
      // Initialize the form with the routine data.
      this.form.patchValue({
        name: rutina.title,
        day: rutina.day,
        public: rutina.public,
        description: rutina.description
      });
    });
  }

  /**
  * Method to update an existing routine with the data provided in the form.
  */
  updateRutine(){
    let rutina: any = {
      title: this.form.get('name')?.value,
      exercises: this.exercises,
      public: this.form.get('public')?.value,
      day: this.form.get('day')?.value,
      description: this.form.get('description')?.value,
      id: this.id
    }
    this.rutinaSvc.updateRutina(rutina)
    this.showBottomCenterGood();
    this.router.navigate(['/rutinas']);
  }  

  /**
  * Adds an exercise to the current routine.
  *
  * @param data Additional data to add to the exercise.
  * @param exercise Exercise to add to the routine.
  */
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

  /**
  * Removes an exercise from the current routine.
  *
  * @param data Additional data of the exercise.
  * @param exercise Exercise to remove from the routine.
  */
  removeExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    this.showBottomCenterBad();
    this.exercises = this.exercises.filter((item) => item.id !== exercise.id);
    console.log("Ejercicios: ", this.exercises);
  }

  /**
  * Opens a modal to select exercises and adds them to the current routine.
  */
  openModal(){
    var onDismiss = (info: any) => {
      console.log("Datos: ", info);
      info.data.forEach((exercise: any) => {
        this.rutina.push(exercise);
        this.exercises.push(exercise);
    });
    }
    this.presentForm(this.exercises, onDismiss);
  }

  /**
  * Presents a modal form for the selection of exercises.
  * 
  * @param data The data of the exercises to display in the modal.
  * @param onDismiss The function to execute when the modal closes, passing the result.
  */
  async presentForm(data: any | null, onDismiss:(result:any)=>void){
    const modal = await this.modal.create({
      component: ModalExerciseComponent,
      componentProps:{
        exercises: data
      },
      cssClass:"modal-selector"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

  /**
  * Displays a success message at the bottom center of the message component
  * according to the selected language.
  */
  showBottomCenterGood() {
    this.langSvc.language$.subscribe(lang => {
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
