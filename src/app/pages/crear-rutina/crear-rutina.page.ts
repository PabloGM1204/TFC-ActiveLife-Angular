import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RutinaService } from 'src/app/core/services/rutina.service';
import { ToastModule } from 'primeng/toast';
import { User } from 'src/app/core/interfaces/user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-rutina',
  templateUrl: './crear-rutina.page.html',
  styleUrls: ['./crear-rutina.page.scss'],
})
export class CrearRutinaPage implements OnInit {

  form: FormGroup;

  user: User | undefined;

  constructor(
    public apiSvc: ApiService,
    private rutinaSvc: RutinaService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      day: ['', [Validators.required]],
      public: [false, [Validators.required]]
    });
  }

  // Selec de los ejercicios
  secondSelect: boolean = false;

  // Lista de ejercicios
  exercises: any[] = [];

  rutina: any[] = [];


  ngOnInit() {
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.user = _;
    })
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
    this.showBottomCenter();
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
      day: this.form.get('day')?.value
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

  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Ejercicio Añadido' });
  }

}
