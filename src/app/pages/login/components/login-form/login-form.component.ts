import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  // Evento de login para enviarselo a la pagina
  @Output() doLogin = new EventEmitter<UserCredentials>();

  form: FormGroup | null = null;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  // Envio los datos para el login y pongo el campo de la contraseña a vacio
  onSubmit(){
    this.doLogin.emit(this.form?.value);
    this.form?.controls['password'].setValue('');
  }

}
