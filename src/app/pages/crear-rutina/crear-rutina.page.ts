import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RutinaService } from 'src/app/core/services/rutina.service';
import { ToastModule } from 'primeng/toast';
import { User } from 'src/app/core/interfaces/user';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BackgroundService } from 'src/app/core/services/background.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

@Component({
  selector: 'app-crear-rutina',
  templateUrl: './crear-rutina.page.html',
  styleUrls: ['./crear-rutina.page.scss'],
})
export class CrearRutinaPage implements OnInit {

  // In the case where the routine id is received through the route.
  id: any;

  // Variable for the form.
  form: FormGroup;

  // Variable to store the value of the logged in user.
  user: User | undefined;

  // Variable for the background.
  fondo: string = "";

  /**
  * Class constructor.
  * 
  * @param apiSvc API service to make HTTP calls.
  * @param rutinaSvc Routine service to manage routines.
  * @param formBuilder Constructor to create form instances.
  * @param auth Authentication service to manage user authentication.
  * @param messageService Service to display messages and notifications.
  * @param router Router for navigation within the application.
  * @param route Object that provides information about the currently activated route.
  * @param backgroundSvc Service to manage the application's background.
  * @param langSvc Service for managing custom translation.
  */
  constructor(
    public apiSvc: ApiService,
    private rutinaSvc: RutinaService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private backgroundSvc: BackgroundService,
    private langSvc: CustomTranslateService
  ) {
    // Initializes the form with the necessary fields and validations.
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      day: ['', [Validators.required]],
      public: [false, [Validators.required]],
      description: ['']
    });
  }

  // Selection of the exercises.
  secondSelect: boolean = false;

  // List of exercises in the routine.
  exercises: any[] = [];

  // List of rutines.
  rutina: any[] = [];

  /**
  * Angular lifecycle method that runs after Angular
  * has initialized all data-bound properties of the component.
  * It is used to initialize data and perform initial configuration operations.
  */
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      this.loadRutine();
    }
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.user = _;
    })
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  /**
  * Method to add an exercise to the routine.
  * 
  * @param data The data associated with the exercise.
  * @param exercise The exercise to be added.
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
  * Method to remove an exercise from the routine.
  * 
  * @param data The data associated with the exercise.
  * @param exercise The exercise to be removed.
  */
  removeExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    this.showBottomCenterBad();
    this.rutina = this.rutina.filter((item) => item.id !== exercise.id);
    console.log("Ejercicios: ", this.rutina);
  }

  /**
  * Method to activate the second selector based on the value selected in the first selector.
  * 
  * @param event The event that contains the value selected in the first selector.
  */
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
    this.secondSelect = true;
  }

  /**
  * Method to create a new routine with the data provided by the form.
  */
  createRutine(){
    let rutina: Rutina = {
      title: this.form.get('name')?.value,
      userUUID: this.user!.uuid,
      exercises: this.rutina,
      public: this.form.get('public')?.value,
      day: this.form.get('day')?.value,
      description: this.form.get('description')?.value
    }
    console.log("Rutina: ", rutina);
    this.rutinaSvc.addRutina(rutina).subscribe(
      (response: any) => {
        console.log("Rutina creada: ", response);
        this.router.navigate(['/rutinas']);
      },
      (error) => {
        console.error('Error al crear la rutina:', error);
      }
    );
  }

  /**
  * Method to load an existing routine based on the provided ID.
  */
  loadRutine(){
    console.log("ID de la rutina: ", this.id);
    this.rutinaSvc.getRutina(this.id).subscribe((rutina: any) => {
      this.rutina = rutina;
      // Initialize the form with the routine data
      this.form.patchValue({
        name: rutina.title,
        day: rutina.day,
        public: rutina.public,
        description: rutina.description
      });
    });
  }

  /**
  * Method to display a success notification at the bottom center.
  * It uses the current language to determine the success message displayed.
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
  * Method to display an error notification at the bottom center.
  * It uses the current language to determine the error message displayed.
  */
  showBottomCenterBad(){
    // Subscribe to the current language.
    this.langSvc.language$.subscribe(lang => { 
      // Select the error message based on the current language and add the notification.
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

  /**
  * Method to check if the form is invalid or if no exercise has been added to the routine.
  * 
  * @returns A boolean value indicating whether the form is invalid or if no exercise has been added to the routine.
  */
  isFormInvalid(): boolean {
    // Check if the form is invalid or if no exercise has been added to the routine.
    return this.form.invalid || this.rutina.length < 1;
  }

}
