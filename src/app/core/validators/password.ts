import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class PasswordValidation {
    
    /**
    * Static function to validate the strength of a password according to a specified protocol.
    *
    * @param controlName Name of the control containing the password value.
    * @returns A validation function that returns an error object if the password does not meet the protocol, or null if it is valid.
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
    * Static function to validate that two password fields match.
    *
    * @param passwordControlName Name of the control containing the password value.
    * @param confirmControlName Name of the control containing the password confirmation value.
    * @returns A validation function that returns an error object if the passwords do not match, or null if they match.
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