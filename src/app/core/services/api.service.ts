import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
  * Constructor of the class.
  * 
  * @param http HTTP client used to make HTTP requests.
  */
  constructor(
    private http: HttpClient
  ) {
    this.bodyPartList();
  }

  // Lists the body parts.
  bodyList: any[] = [];

  // List of exercises by body part.
  excerciseList: any[] = [];

  // Request header.
  headers = new HttpHeaders({
    'X-RapidAPI-Key': '27f783e675msh276e623085c63bdp14f781jsn07e6c51d8ff5',
    'X-RapidAPI-Host' : 'exercisedb.p.rapidapi.com'
  });

  /**
  * Method to retrieve the list of body parts from the server.
  * Sends an HTTP GET request to the API.
  */
  bodyPartList() {
    this.http.get(environment.apiUrl+'/bodyPartList', { headers: this.headers })
      .subscribe(
        (response: any) => {
          console.log('Respuesta de la API:', response);
          this.bodyList = response;
        },
        (error) => {
          console.error('Error al hacer la petición:', error);
        }
      );
  }

  /**
  * Method to retrieve exercises associated with a specific body part from the server.
  *
  * @param bodyPart The body part for which exercises are desired.
  * @returns An observable that emits an array of exercises associated with the specified body part.
  */
  exerciseByBodyPart(bodyPart: string): Observable<any[]> {
    return this.http.get(environment.apiUrl+'/bodyPart/'+bodyPart, { headers: this.headers, params: {limit: 20} })
      .pipe(
        map((response: any) => {
          console.log('Respuesta de la API:', response);
          return response;
        })
      );
  }
}
