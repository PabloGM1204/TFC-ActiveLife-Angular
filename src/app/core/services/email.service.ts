import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { SMTPClient } from 'smtp-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}

  /**
  * Sends an email using the provided parameters.
  *
  * @param destinatario The recipient's email address.
  * @param asunto The subject of the email.
  * @param mensaje The message content of the email.
  * @return An Observable that emits the result of the HTTP post request.
  */
  enviarCorreo(destinatario: string, asunto: string, mensaje: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/activelife-74fc2.appspot.com/o/images%2Flogo%20ActiveLife.png?alt=media&token=2294dbdb-fcfa-44e1-af78-f5c45ebd31ff'

    const body = {
      api_key: environment.apiKey,
      to: [destinatario],
      sender: 'pgarmun203@g.educaand.es',
      subject: asunto,
      text_body: mensaje,
      html_body: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
              color: #333333;
            }
            p {
              color: #666666;
            }
            .logo {
              max-width: 100px; /* Ajusta el tamaño de la imagen según tus necesidades */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${asunto}</h1>
            <p>${mensaje}</p>
            <img src="${logoUrl}" alt="Logo de la empresa" class="logo">
          </div>
        </body>
      </html>
      `
    };

    return this.http.post(environment.apiEmailUrl, body, { headers });
  }
}
