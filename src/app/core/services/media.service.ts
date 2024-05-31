import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export abstract class MediaService {  
  /**
  * Método abstracto para cargar un archivo Blob.
  *
  * @param blob El archivo Blob que se va a cargar.
  * @returns Un observable que emite un array de resultados después de cargar el archivo.
  */
  public abstract upload(blob:Blob):Observable<any[]>;
}