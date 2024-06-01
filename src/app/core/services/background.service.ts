import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  // Background.
  private backgroundSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  background$: Observable<any> = this.backgroundSubject.asObservable();

  /**
  * Method to set the background of the application.
  *
  * @param background The URL or identifier of the background to set.
  */
  setBackground(background: string) {
    this.backgroundSubject.next(background);
  }
}
