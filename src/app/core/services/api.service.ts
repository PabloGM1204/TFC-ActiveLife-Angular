import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
    this.makeRequest();
  }

  makeRequest() {
    // Cabecear de la petición
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '27f783e675msh276e623085c63bdp14f781jsn07e6c51d8ff5',
      'X-RapidAPI-Host' : 'exercisedb.p.rapidapi.com'
    });

    // Realizar la petición
    this.http.get(environment.apiUrl, { headers: headers, params: { limit: '20' } })
      .subscribe(
        (response: any) => {
          console.log('Respuesta de la API:', response);
        },
        (error) => {
          console.error('Error al hacer la petición:', error);
        }
      );
  }
}
