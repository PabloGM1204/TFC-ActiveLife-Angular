import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

/**
 * Función para crear un cargador de traducciones para el servicio TranslateHttpLoader.
 *
 * @param http Cliente HTTP utilizado para realizar solicitudes HTTP.
 * @returns Un cargador de traducciones basado en el cliente HTTP proporcionado.
*/
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}