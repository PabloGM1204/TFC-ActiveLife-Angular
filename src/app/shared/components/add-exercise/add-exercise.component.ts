import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent  implements OnInit {

  // Entrada del ejercicio que se mostrará en el componente.
  @Input() exercise: any;

  // Formulario para añadir el ejercicio a la rutina
  form: FormGroup;

  /**
  * Constructor de la clase.
  * 
  * @param formBuilder Objeto FormBuilder para construir formularios reactivos.
  * @param modalController Controlador de modales para mostrar componentes modales.
  */
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    // Inicializa el formulario reactivo con dos campos requeridos
    this.form = this.formBuilder.group({
      repeticiones: ['', [Validators.required]],
      serie: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  /**
  * Agrega un ejercicio.
  */
  addExercise(){
    this.modalController.dismiss(this.form?.value);
  }

}
