import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  // Lista de citas
  private backgroundSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  background$: Observable<any> = this.backgroundSubject.asObservable();

  setBackground(background: string) {
    this.backgroundSubject.next(background);
  }
}
