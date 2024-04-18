import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RutinaService } from 'src/app/core/services/rutina.service';

@Component({
  selector: 'app-crear-rutina',
  templateUrl: './crear-rutina.page.html',
  styleUrls: ['./crear-rutina.page.scss'],
})
export class CrearRutinaPage implements OnInit {

  form: FormGroup;

  constructor(
    public apiSvc: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      day: ['', [Validators.required]]
    });
  }

  // Selec de los ejercicios
  secondSelect: boolean = false;

  // Lista de ejercicios
  exercises: any[] = [];


  ngOnInit() {
    
  }



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

  

}
