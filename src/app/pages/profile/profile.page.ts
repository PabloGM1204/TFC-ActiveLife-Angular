import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MediaService } from 'src/app/core/services/media.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any | undefined;

  constructor(
    private auth: AuthService,
    private userSvc: UsersService,
    private mediaSvc: MediaService
  ) {}

  ngOnInit() {
    this.auth.me().subscribe(_ => {
      console.log("Usuario All rigght ", _);
      this.user = {
        uuid: _.uuid,
        username: _.name,
        email: _.email,
        imageUrl: _?.photo ? _?.photo : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51"
      }
      this.capturedImage = this.user.imageUrl;
      console.log("Usuario logeado ",  this.user);
    })
  }

  // Imagen capturada
  capturedImage: any | undefined;
  // Tomar foto
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.capturedImage = image.webPath;
    console.log("Imagen capturada: ", this.capturedImage);
    dataURLtoBlob(this.capturedImage, (blob: Blob) => {
      this.mediaSvc.upload(blob).subscribe({
        next: (media: any) => {
          this.user.imageUrl = media[0].url_thumbnail;
          this.userSvc.updateUser(this.user);
        }
      })
    });
  }

}
