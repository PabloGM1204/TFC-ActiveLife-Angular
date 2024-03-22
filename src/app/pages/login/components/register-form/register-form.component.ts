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

  // Evento de registro para enviarselo a la pagina
  @Output() doRegister = new EventEmitter<UserCredentials>();

  form: FormGroup | null = null;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nickname:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, PasswordValidation.passwordProto('password')]],
      confirm:['', [Validators.required, PasswordValidation.passwordProto('confirm')]],
      admin: [false] // Para saber si es administrador o cliente
    }, {validator:[PasswordValidation.passwordMatch('password','confirm') ]});
  }

  ngOnInit() {}

  // Método para cuando le al boton del registro y enviar el evento a la pagina de login
  onSubmit(){
    console.log("Datos del registro: ", this.form?.value)
    this.doRegister.emit(this.form?.value)
  }

  // Para comprobar si hay errores en los campos
  hasError(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.invalid;
  }

  // Para comprobar si ha tocado el campo
  hasTouched(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.touched;
  }

}
