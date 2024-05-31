import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  // Lista de citas
  private backgroundSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  background$: Observable<any> = this.backgroundSubject.asObservable();

  /**
  * Método para establecer el fondo de la aplicación.
  *
  * @param background La URL o identificador del fondo a establecer.
  */
  setBackground(background: string) {
    this.backgroundSubject.next(background);
  }
}
