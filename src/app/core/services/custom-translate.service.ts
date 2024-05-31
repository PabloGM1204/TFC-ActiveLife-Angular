import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, lastValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {
  
  // Observable que me va a indicar el idioma actual de la aplicación
  private _language:BehaviorSubject<string> = new BehaviorSubject<string>('es');
  public language$ = this._language.asObservable();

  /**
  * Constructor de la clase.
  * 
  * @param translate Servicio de traducción utilizado para manejar las traducciones en la aplicación.
  */
  constructor(
    private translate:TranslateService
  ) { 
    this.init();
  }

  /**
  * Método privado para inicializar el servicio de traducción.
  * Agrega los idiomas admitidos y establece el idioma predeterminado.
  */
  private async init(){
    this.translate.addLangs(['es','en', 'it']);
    this.translate.setDefaultLang(this._language.value);
  }

  /**
  * Método para cambiar el idioma de la aplicación.
  *
  * @param language El nuevo idioma que se utilizará en la aplicación.
  */
  use(language:string){
    lastValueFrom(this.translate.use(language)).then(_=>{
      this._language.next(language);
    }).catch(err=>{
      console.error(err);
    });  
  }

  /**
  * Método para obtener una traducción para una clave específica.
  *
  * @param key La clave de la traducción que se desea obtener.
  * @returns Un observable que emite la traducción asociada a la clave especificada.
  */
  get(key:string):Observable<string>{
    return this.translate.get(key);
  }
}
