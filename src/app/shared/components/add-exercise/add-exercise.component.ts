import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent  implements OnInit {

  // Input of the exercise that will be displayed in the component.
  @Input() exercise: any;

  // Form to add the exercise to the routine.
  form: FormGroup;

  /**
  * Class constructor.
  * 
  * @param formBuilder FormBuilder object to build reactive forms.
  * @param modalController Modal controller to display modal components.
  */
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    // Initializes the reactive form with two required fields.
    this.form = this.formBuilder.group({
      repeticiones: ['', [Validators.required]],
      serie: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  /**
  * Adds an exercise.
  */
  addExercise(){
    this.modalController.dismiss(this.form?.value);
  }

}
