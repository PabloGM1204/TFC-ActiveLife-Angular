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

@Component({
  selector: 'app-crear-rutina',
  templateUrl: './crear-rutina.page.html',
  styleUrls: ['./crear-rutina.page.scss'],
})
export class CrearRutinaPage implements OnInit {

  // En el caso en el que reciba por la ruta el id de la rutina
  id: any;

  form: FormGroup;

  user: User | undefined;

  fondo: string = "";

  constructor(
    public apiSvc: ApiService,
    private rutinaSvc: RutinaService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private backgroundSvc: BackgroundService,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      day: ['', [Validators.required]],
      public: [false, [Validators.required]],
      description: ['']
    });
  }

  // Selec de los ejercicios
  secondSelect: boolean = false;

  // Lista de ejercicios
  exercises: any[] = [];

  rutina: any[] = [];


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
    this.secondSelect = true;
  }

  // Crear la rutina
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
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al crear la rutina:', error);
      }
    );
  }

  loadRutine(){
    console.log("ID de la rutina: ", this.id);
    this.rutinaSvc.getRutina(this.id).subscribe((rutina: any) => {
      this.rutina = rutina;
      // Inicializar el formulario con los datos de la rutina
      this.form.patchValue({
        name: rutina.title,
        day: rutina.day,
        public: rutina.public,
        description: rutina.description
      });
    });
  }

  showBottomCenterGood() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Ejercicio Añadido' });
  }

  showBottomCenterBad(){
    this.messageService.add({ key: 'er', severity: 'error', summary: 'Eliminado', detail: 'Ejercicio eliminado de la rutina' });
  }

  isFormInvalid(): boolean {
    return this.form.invalid || this.rutina.length < 1;
  }

}
