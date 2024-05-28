import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { MediaService } from 'src/app/core/services/media.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any | undefined;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userSvc: UsersService,
    private mediaSvc: MediaService,
    public _firebaseService: FirebaseService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.auth.me().subscribe(_ => {
      console.log("Usuario All rigght ", _);
      this.user = {
        uuid: _.uuid,
        username: _.name,
        email: _.email,
        imageUrl: _?.photo ? _?.photo : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51"
      }
      this.form.patchValue({
        name: this.user.username
      });
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

  formActive: boolean = false;

  // Método para activar el formulario
  activeForm(){
    this.formActive = !this.formActive;
  }

  //
  updateUserName() {
    this.user.username = this.form.value.name;
    this.userSvc.updateUser(this.user);
    this.activeForm();
  }

  /**
   * Method to export data to CSV format.
   * Fetches data from Firebase, converts it to CSV format, and initiates CSV file downloads.
   *
   * @remarks
   * This method retrieves data from Firebase using the FirebaseService, converts it to CSV format,
   * and initiates the download of CSV files for each dataset.
   */
  exportData(): void {
    this._firebaseService
      .getAllData()
      .then((dataObject) => {
        const csvFiles = this.jsonToCSV(dataObject);
        for (const key in csvFiles) {
          if (csvFiles.hasOwnProperty(key)) {
            const csvContent = csvFiles[key];
            this.downloadCSV(csvContent, `${key}.csv`);
          }
        }
      })
      .catch((error) => console.error('Failed to fetch data', error));
  }

  /**
   * Converts JSON data to CSV format.
   *
   * @param dataObject - The JSON data object to be converted to CSV.
   * @returns An object containing CSV content for each dataset.
   */
  public jsonToCSV(dataObject: { [key: string]: any[] }): {
    [key: string]: string;
  } {
    const csvFiles: { [key: string]: string } = {};

    for (const key in dataObject) {
      if (dataObject.hasOwnProperty(key) && dataObject[key].length > 0) {
        const headers = Object.keys(dataObject[key][0]);
        const csvRows = dataObject[key].map((row) =>
          headers
            .map((fieldName) =>
              JSON.stringify(row[fieldName], (key, value) =>
                value == null ? '' : value
              )
            )
            .join(',')
        );
        csvRows.unshift(headers.join(','));
        csvFiles[key] = csvRows.join('\r\n');
      }
    }
    return csvFiles;
  }

  /**
   * Initiates the download of a CSV file.
   *
   * @param csvContent - The CSV content to be downloaded.
   * @param filename - The name of the CSV file.
   */
  public downloadCSV(csvContent: string, filename: string): void {
    if (!csvContent) {
      console.error('No CSV content available for download.');
      return;
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

}
