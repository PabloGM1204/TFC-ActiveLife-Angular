import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../interfaces/media';
import { MediaService } from '../media.service';
import { FirebaseService } from './firebase.service';


export class FirebaseMediaService extends MediaService{

  constructor(
    private firebase:FirebaseService
  ) { 
    super();
  }
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
