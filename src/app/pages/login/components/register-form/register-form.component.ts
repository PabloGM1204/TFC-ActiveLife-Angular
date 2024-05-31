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

  // Formulario de registro
  form: FormGroup | null = null;

  /**
  * Constructor de la clase.
  * Inicializa el formulario de registro con los campos necesarios y las validaciones correspondientes.
  */
  constructor(
    private formBuilder: FormBuilder
  ) {
    // Inicializa el formulario de registro con los campos y las validaciones correspondientes.
    this.form = this.formBuilder.group({
      nickname:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, PasswordValidation.passwordProto('password')]],
      confirm:['', [Validators.required, PasswordValidation.passwordProto('confirm')]],
      admin: [false], // Para saber si es administrador o cliente
      aceptado: [false]
    }, {validator:[PasswordValidation.passwordMatch('password','confirm') ]});
  }

  ngOnInit() {}

  /**
  * Método invocado al enviar el formulario de registro.
  * Emite los datos del formulario de registro para su procesamiento.
  */
  onSubmit(){
    console.log("Datos del registro: ", this.form?.value)
    this.doRegister.emit(this.form?.value)
  }

  /**
  * Verifica si el control especificado en el formulario tiene errores de validación.
  * @param controlName El nombre del control en el formulario.
  * @returns true si el control tiene errores de validación, de lo contrario false. Si el control no se encuentra, devuelve undefined.
  */
  hasError(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.invalid;
  }

  /**
  * Verifica si el control especificado en el formulario ha sido tocado por el usuario.
  * @param controlName El nombre del control en el formulario.
  * @returns true si el control ha sido tocado, de lo contrario false. Si el control no se encuentra, devuelve undefined.
  */
  hasTouched(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.touched;
  }

}
