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

  rutina: any[] = [];

  fondo: string = "";

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
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      day: ['', [Validators.required]],
      public: [false, [Validators.required]],
      description: ['']
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      this.loadRutine();
    }
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

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

  // Método para actualizar la rutina
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
    this.exercises = this.exercises.filter((item) => item.id !== exercise.id);
    console.log("Ejercicios: ", this.exercises);
  }

  // Métodos para añadir y eliminar ejercicios de la rutina
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

  // Método para ver el modal de los ejercicios a añadir
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
