import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeraLetraMayus'
})
export class PrimeraLetraMayusPipe implements PipeTransform {

  /**
  * Capitaliza la primera letra de cada palabra en una cadena de texto.
  * @param text La cadena de texto que se capitalizará.
  * @returns La cadena de texto con la primera letra de cada palabra en mayúscula.
  */
  transform(text: string | undefined): string {
    if (!text) {
      return "";
    }
  
    // Divide la cadena en palabras utilizando espacios en blanco como referencia para dividir
    const palabra = text.split(' ');
  
    // Pone en mayusculas la primera letra de cada palabra
    const mayusPalabra = palabra.map(palabra => {
      if (palabra.length > 0) {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
      } else {
        return "";
      }
    });
  
    // Une las palabras capitalizadas de nuevo en una cadena
    const result = mayusPalabra.join(' ');
  
    return result;
  }

}
