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
  * Evento emitido para iniciar sesión.
  */
  @Output() doLogin = new EventEmitter<UserCredentials>();

  // Formulario de login
  form: FormGroup | null = null;

  /**
  * Constructor de la clase.
  * @param formBuilder Instancia de FormBuilder para construir el formulario de inicio de sesión.
  */
  constructor(
    private formBuilder: FormBuilder
  ) {
    // Formulario para el inicio de sesión.
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  /**
  * Método invocado al enviar el formulario de inicio de sesión.
  * Emite un evento para realizar el inicio de sesión con las credenciales ingresadas.
  * También establece el valor del campo de contraseña en vacío después de enviar el formulario.
  */
  onSubmit(){
    this.doLogin.emit(this.form?.value);
    this.form?.controls['password'].setValue('');
  }

}
