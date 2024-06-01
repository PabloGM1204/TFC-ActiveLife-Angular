import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';
import { PasswordValidation } from 'src/app/core/validators/password';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {

  // Registration event to send it to the page.
  @Output() doRegister = new EventEmitter<UserCredentials>();

  // Registration form.
  form: FormGroup | null = null;

  /**
  * Class constructor.
  * Initializes the registration form with the necessary fields and corresponding validations.
  */
  constructor(
    private formBuilder: FormBuilder
  ) {
    // Initializes the registration form with the necessary fields and corresponding validations.
    this.form = this.formBuilder.group({
      nickname:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, PasswordValidation.passwordProto('password')]],
      confirm:['', [Validators.required, PasswordValidation.passwordProto('confirm')]],
      admin: [false], // To know if it is an administrator or a client.
      aceptado: [false]
    }, {validator:[PasswordValidation.passwordMatch('password','confirm') ]});
  }

  ngOnInit() {}

  /**
  * Method invoked when submitting the registration form.
  * Emits the registration form data for processing.
  */
  onSubmit(){
    console.log("Datos del registro: ", this.form?.value)
    this.doRegister.emit(this.form?.value)
  }

  /**
  * Checks if the specified control in the form has validation errors.
  * @param controlName The name of the control in the form.
  * @returns true if the control has validation errors, otherwise false. If the control is not found, it returns undefined.
  */
  hasError(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.invalid;
  }

  /**
  * Checks if the specified control in the form has been touched by the user.
  * @param controlName The name of the control in the form.
  * @returns true if the control has been touched, otherwise false. If the control is not found, it returns undefined.
  */
  hasTouched(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.touched;
  }

}
