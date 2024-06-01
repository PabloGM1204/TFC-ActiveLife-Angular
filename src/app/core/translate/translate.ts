import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

/**
 * Function to create a translation loader for the TranslateHttpLoader service.
 *
 * @param http HTTP client used to make HTTP requests.
 * @returns A translation loader based on the provided HTTP client.
*/
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}