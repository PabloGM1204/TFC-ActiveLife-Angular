import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncamiento'
})
export class TruncamientoPipe implements PipeTransform {

  /**
  * Shortens a text string if it exceeds a specified maximum length.
  * @param value The text string to shorten.
  * @param maxLength The maximum allowed length for the text string.
  * @returns The shortened text string followed by ellipsis (...) if it exceeds the maximum length; otherwise, returns the text string unchanged.
  */
  transform(value: string, maxLength: number): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    return value;
  }

}
