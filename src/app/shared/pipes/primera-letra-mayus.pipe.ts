import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeraLetraMayus'
})
export class PrimeraLetraMayusPipe implements PipeTransform {

  /**
  * Capitalizes the first letter of each word in a text string.
  * @param text The text string to capitalize.
  * @returns The text string with the first letter of each word capitalized.
  */
  transform(text: string | undefined): string {
    if (!text) {
      return "";
    }
  
    // Splits the string into words using whitespace as a delimiter.
    const palabra = text.split(' ');
  
    // Capitalizes the first letter of each word.
    const mayusPalabra = palabra.map(palabra => {
      if (palabra.length > 0) {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
      } else {
        return "";
      }
    });
  
    // Joins the capitalized words back into a string
    const result = mayusPalabra.join(' ');
  
    return result;
  }

}
