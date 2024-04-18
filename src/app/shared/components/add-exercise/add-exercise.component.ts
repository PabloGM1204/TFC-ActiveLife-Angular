import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent  implements OnInit {

  @Input() exercise: any;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.form = this.formBuilder.group({
      repeticiones: ['', [Validators.required]],
      serie: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  // Emito el evento para añadir el ejercicio a la rutina
  addExercise(){
    this.modalController.dismiss(this.form?.value);
  }

}
