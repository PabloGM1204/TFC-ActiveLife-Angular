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

  // En el caso en el que reciba por la ruta el id de la rutina
  id: any;

  // Variable para el formulario
  form: FormGroup;

  // Variable para guardar el valor del usuario logueado
  user: User | undefined;

  // Variable para el fondo
  fondo: string = "";

  /**
  * Constructor de la clase.
  * 
  * @param apiSvc Servicio de la API para realizar llamadas HTTP.
  * @param rutinaSvc Servicio de rutinas para gestionar las rutinas.
  * @param formBuilder Constructor para crear instancias de formularios.
  * @param auth Servicio de autenticación para gestionar la autenticación de usuarios.
  * @param messageService Servicio para mostrar mensajes y notificaciones.
  * @param router Enrutador para la navegación dentro de la aplicación.
  * @param route Objeto que proporciona información sobre la ruta activada actualmente.
  * @param backgroundSvc Servicio para gestionar el fondo de la aplicación.
  * @param langSvc Servicio para la gestión de la traducción personalizada.
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
    // Inicializa el formulario con los campos necesarios y las validaciones
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      day: ['', [Validators.required]],
      public: [false, [Validators.required]],
      description: ['']
    });
  }

  // Selec de los ejercicios
  secondSelect: boolean = false;

  // Lista de ejercicios de la rutina
  exercises: any[] = [];

  // Lista de rutinas
  rutina: any[] = [];

  /**
  * Método del ciclo de vida de Angular que se ejecuta después de que Angular
  * haya inicializado todas las propiedades de datos vinculadas al componente.
  * Se utiliza para inicializar datos y realizar operaciones de configuración inicial.
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
  * Método para agregar un ejercicio a la rutina.
  * 
  * @param data Los datos asociados al ejercicio.
  * @param exercise El ejercicio que se va a agregar.
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
  * Método para eliminar un ejercicio de la rutina.
  * 
  * @param data Los datos asociados al ejercicio.
  * @param exercise El ejercicio que se va a eliminar.
  */
  removeExerciseToRutine(data: any, exercise: any){
    console.log("Datos: ", data);
    console.log("Ejercicio: ", exercise);
    this.showBottomCenterBad();
    this.rutina = this.rutina.filter((item) => item.id !== exercise.id);
    console.log("Ejercicios: ", this.rutina);
  }

  /**
  * Método para activar el segundo selector según el valor seleccionado en el primer selector.
  * 
  * @param event El evento que contiene el valor seleccionado en el primer selector.
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
  * Método para crear una nueva rutina con los datos proporcionados por el formulario.
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
  * Método para cargar una rutina existente según el ID proporcionado.
  */
  loadRutine(){
    console.log("ID de la rutina: ", this.id);
    this.rutinaSvc.getRutina(this.id).subscribe((rutina: any) => {
      this.rutina = rutina;
      // Inicializo el formulario con los datos de la rutina
      this.form.patchValue({
        name: rutina.title,
        day: rutina.day,
        public: rutina.public,
        description: rutina.description
      });
    });
  }

  /**
  * Método para mostrar una notificación de éxito en la parte inferior central.
  * Utiliza el idioma actual para determinar el mensaje de éxito mostrado.
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
  * Método para mostrar una notificación de error en la parte inferior central.
  * Utiliza el idioma actual para determinar el mensaje de error mostrado.
  */
  showBottomCenterBad(){
    // Suscribirse al idioma actual
    this.langSvc.language$.subscribe(lang => { 
      // Seleccionar el mensaje de error según el idioma actual y agregar la notificación
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
  * Método para verificar si el formulario es inválido o si no se ha agregado ningún ejercicio a la rutina.
  * 
  * @returns Un valor booleano que indica si el formulario es inválido o si no se ha agregado ningún ejercicio a la rutina.
  */
  isFormInvalid(): boolean {
     // Verificar si el formulario es inválido o si no se ha agregado ningún ejercicio a la rutina
    return this.form.invalid || this.rutina.length < 1;
  }

}
