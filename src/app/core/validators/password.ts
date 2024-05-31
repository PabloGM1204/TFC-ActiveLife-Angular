import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class PasswordValidation {
    
    /**
    * Función estática para validar la fortaleza de una contraseña según un protocolo establecido.
    *
    * @param controlName Nombre del control que contiene el valor de la contraseña.
    * @returns Una función validadora que devuelve un objeto de errores si la contraseña no cumple con el protocolo, o null si es válida.
    */
    public static passwordProto(controlName:string=''): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let password = '';
            if(control instanceof FormControl)
                password = control?.value;
            else
                password = control.get(controlName)?.value;
            if(password && !password.match(/^(?=.*\d)(?=.*[a-zá-ú\u00f1ä-ü])(?=.*[A-ZÁ-Ú\u00d1Ä-Ü])[0-9a-zá-úä-üA-ZÁ-ÚÄ-Ü \u00d1$-/@:-?{-~!"^_`\[\]]{8,}$/)){
                return { 'passwordProto': true};
            }
            else{
                return null;
            }  
        }
    }

    /**
    * Función estática para validar que dos campos de contraseña coincidan.
    *
    * @param passwordControlName Nombre del control que contiene el valor de la contraseña.
    * @param confirmControlName Nombre del control que contiene el valor de confirmación de la contraseña.
    * @returns Una función validadora que devuelve un objeto de errores si las contraseñas no coinciden, o null si coinciden.
    */
    public static passwordMatch(passwordControlName:string, confirmControlName:string):ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.get(passwordControlName)?.value;
            const confirmPassword = control.get(confirmControlName)?.value;
        
            if(password != confirmPassword){
                let errors = control?.errors;
                if (errors && typeof errors === 'object') {
                Object.assign(errors, {
                    'passwordMatch': true
                });
                } else {
                errors = {
                    'passwordMatch': true
                };
                }
                return errors;
            }
            else{
                let errors = control?.errors;
                if (errors && typeof errors === 'object') {
                if(errors['passwordMatch'])
                    delete errors['passwordMatch'];
                }
                return control.errors; 
            }
        }
    }
}