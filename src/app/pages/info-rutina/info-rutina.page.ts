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

  form: FormGroup;

  id: any;

  // Selec de los ejercicios
  secondSelect: boolean = false;

  // Lista de ejercicios
  exercises: any[] = [];

  // Lista de rutinas
  rutina: any[] = [];

  // Variable para el fondo
  fondo: string = "";

  /**
  * Constructor de la clase.
  * @param formBuilder Instancia de FormBuilder para la creación de formularios.
  * @param apiSvc Servicio ApiService para realizar llamadas a la API.
  * @param messageService Servicio MessageService para mostrar mensajes en la interfaz de usuario.
  * @param route Instancia de ActivatedRoute para obtener información sobre la ruta activa.
  * @param rutinaSvc Servicio RutinaService para manejar las rutinas.
  * @param modal Controlador ModalController para mostrar y controlar los modales.
  * @param router Instancia de Router para la navegación entre componentes y rutas.
  * @param backgroundSvc Servicio BackgroundService para manejar el fondo de la aplicación.
  * @param langSvc Servicio CustomTranslateService para la gestión de traducciones personalizadas.
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
    // Inicialización del formulario con los campos requeridos y sus validadores
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      day: ['', [Validators.required]],
      public: [false, [Validators.required]],
      description: ['']
    });
  }

  /**
  * Método ngOnInit para inicializar la instancia de la clase.
  */
  ngOnInit() {
    // Obtiene el ID de la ruta activa desde los parámetros de la ruta
    this.id = this.route.snapshot.paramMap.get('id');
    // Si se proporciona un ID válido, carga la rutina correspondiente
    if(this.id != null){
      this.loadRutine();
    }
    // Se suscribe a cambios en el fondo de la aplicación
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  /**
  * Método loadRutine para cargar los datos de una rutina específica utilizando su ID.
  */
  loadRutine(){
    console.log("ID de la rutina: ", this.id);
    this.rutinaSvc.getRutina(this.id).subscribe((rutina: any) => {
      //this.rutina = rutina;
      this.exercises = rutina.exercises;
      // Inicializar el formulario con los datos de la rutina
      this.form.patchValue({
        name: rutina.title,
        day: rutina.day,
        public: rutina.public,
        description: rutina.description
      });
    });
  }

  /**
  * Método updateRutine para actualizar una rutina existente con los datos proporcionados en el formulario.
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
  * Añade un ejercicio a la rutina actual.
  *
  * @param data Datos adicionales a añadir al ejercicio.
  * @param exercise Ejercicio a añadir a la rutina.
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
  * Elimina un ejercicio de la rutina actual.
  *
  * @param data Datos adicionales del ejercicio.
  * @param exercise Ejercicio a eliminar de la rutina.
  */
  removeExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    this.showBottomCenterBad();
    this.exercises = this.exercises.filter((item) => item.id !== exercise.id);
    console.log("Ejercicios: ", this.exercises);
  }

  /**
  * Abre un modal para seleccionar ejercicios y los agrega a la rutina actual.
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
  * Presenta un formulario modal para la selección de ejercicios.
  * 
  * @param data Los datos de los ejercicios a mostrar en el modal.
  * @param onDismiss La función a ejecutar cuando se cierra el modal, pasando el resultado.
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
  * Muestra un mensaje de éxito en la parte inferior centrada del componente de mensajes
  * según el idioma seleccionado.
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
  * Muestra un mensaje de error en la parte inferior centrada del componente de mensajes
  * según el idioma seleccionado.
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
