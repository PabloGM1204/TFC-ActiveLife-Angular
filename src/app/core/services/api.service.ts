import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
    this.bodyPartList();
  }

  // Lista las parte del cuerpo
  bodyList: any[] = [];
  // Lista de los ejercicios por parte del cuerpo
  excerciseList: any[] = [];

  // Cabecera de la petición
  headers = new HttpHeaders({
    'X-RapidAPI-Key': '27f783e675msh276e623085c63bdp14f781jsn07e6c51d8ff5',
    'X-RapidAPI-Host' : 'exercisedb.p.rapidapi.com'
  });

  // Realizar la petición para las partes del cuerpo
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

  // Realizar la petición para los ejercicios por parte del cuerpo
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
