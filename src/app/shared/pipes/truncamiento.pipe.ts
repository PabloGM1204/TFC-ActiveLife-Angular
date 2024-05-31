import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncamiento'
})
export class TruncamientoPipe implements PipeTransform {

  /**
  * Acorta una cadena de texto si excede una longitud máxima especificada.
  * @param value La cadena de texto que se acortará.
  * @param maxLength La longitud máxima permitida para la cadena de texto.
  * @returns La cadena de texto acortada, seguida de puntos suspensivos (...), si excede la longitud máxima; de lo contrario, devuelve la cadena de texto sin cambios.
  */
  transform(value: string, maxLength: number): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    return value;
  }

}
