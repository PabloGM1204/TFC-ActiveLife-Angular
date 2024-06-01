import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export abstract class MediaService {  
  /**
  * Abstract method to upload a Blob file.
  *
  * @param blob The Blob file to be uploaded.
  * @returns An observable that emits an array of results after the file is uploaded.
  */
  public abstract upload(blob:Blob):Observable<any[]>;
}