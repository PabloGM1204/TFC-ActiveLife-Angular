import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  /**
  * Event emitted to log in.
  */
  @Output() doLogin = new EventEmitter<UserCredentials>();

  // Login form.
  form: FormGroup | null = null;

  /**
  * Class constructor.
  * @param formBuilder FormBuilder instance to construct the login form.
  */
  constructor(
    private formBuilder: FormBuilder
  ) {
    // Form for login.
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  /**
  * Method invoked when submitting the login form.
  * Emits an event to perform the login with the entered credentials.
  * Also sets the value of the password field to empty after submitting the form.
  */
  onSubmit(){
    this.doLogin.emit(this.form?.value);
    this.form?.controls['password'].setValue('');
  }

}
