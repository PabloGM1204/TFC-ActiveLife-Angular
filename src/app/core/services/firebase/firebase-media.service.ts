import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../interfaces/media';
import { MediaService } from '../media.service';
import { FirebaseService } from './firebase.service';


export class FirebaseMediaService extends MediaService{

  /**
  * Constructor de la clase.
  * 
  * @param firebase Servicio de Firebase utilizado para diversas operaciones.
  */
  constructor(
    private firebase:FirebaseService
  ) { 
    super();
  }

  /**
  * Método para cargar un archivo Blob al servicio de Firebase.
  *
  * @param blob El archivo Blob que se va a cargar.
  * @returns Un observable que emite un array de objetos Media después de cargar el archivo.
  */
  public upload(blob:Blob):Observable<Media[]>{
    return new Observable(obs=>{
      this.firebase.imageUpload(blob).then(data=>{
        var imgs = [];
        var media:Media= {
          id:0,
          url_large:data.file,
          url_medium:data.file,
          url_small:data.file,
          url_thumbnail:data.file
        };
        
        imgs.push(media);
        obs.next(imgs);
      })
    });
  }

}
