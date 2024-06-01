import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, lastValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {
  
  // Observable that will indicate the current language of the application.
  private _language:BehaviorSubject<string> = new BehaviorSubject<string>('es');
  public language$ = this._language.asObservable();

  /**
  * Constructor of the class.
  * 
  * @param translate Translation service used to handle translations in the application.
  */
  constructor(
    private translate:TranslateService
  ) { 
    this.init();
  }

  /**
  * Private method to initialize the translation service.
  * Adds supported languages and sets the default language.
  */
  private async init(){
    this.translate.addLangs(['es','en', 'it']);
    this.translate.setDefaultLang(this._language.value);
  }

  /**
  * Method to change the language of the application.
  *
  * @param language The new language to be used in the application.
  */
  use(language:string){
    lastValueFrom(this.translate.use(language)).then(_=>{
      this._language.next(language);
    }).catch(err=>{
      console.error(err);
    });  
  }

  /**
  * Method to retrieve a translation for a specific key.
  *
  * @param key The key of the translation to retrieve.
  * @returns An observable that emits the translation associated with the specified key.
  */
  get(key:string):Observable<string>{
    return this.translate.get(key);
  }
}
