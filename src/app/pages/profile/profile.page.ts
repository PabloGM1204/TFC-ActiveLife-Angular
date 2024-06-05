import { Component, OnInit, Renderer2 } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { dataURLtoBlob } from 'src/app/core/helpers/blob';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { MediaService } from 'src/app/core/services/media.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackgroundService } from 'src/app/core/services/background.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // Variable to store user data.
  user: any | undefined;

  // Form to update the user's name.
  form: FormGroup;

  /**
  * Class constructor.
  *
  * @param formBuilder - Service to create instances of reactive forms.
  * @param auth - Authentication service to handle user authentication operations.
  * @param userSvc - Service to handle operations related to users.
  * @param mediaSvc - Service to handle operations related to media (images, videos, etc.).
  * @param _firebaseService - Service to interact with Firebase.
  * @param backgroundSvc - Service to handle the application's background.
  */
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userSvc: UsersService,
    private mediaSvc: MediaService,
    public _firebaseService: FirebaseService,
    private backgroundSvc: BackgroundService,
  ) {
    // Initializes the reactive form with a required 'name' field
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  /**
  * ngOnInit method.
  *
  * Angular lifecycle method that runs once the component has been initialized.
  * It obtains the authenticated user's data and updates the form and component properties.
  */
  ngOnInit() {
    // Obtains the authenticated user's data.
    this.auth.me().subscribe(_ => {
      console.log("Usuario All rigght ", _);
      // Assigns the user's data to the 'user' property of the component.
      this.user = {
        uuid: _.uuid,
        username: _.name,
        email: _.email,
        imageUrl: _?.photo ? _?.photo : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51",
        fondo: _?.fondo ? _?.fondo : "pri"
      }
      // Updates the value of the 'name' field in the form with the username.
      this.form.patchValue({
        name: this.user.username
      });
      // Assigns the URL of the captured image and the user's background.
      this.capturedImage = this.user.imageUrl;
      this.fondo = this.user.fondo;
      console.log("Usuario logeado ",  this.user);
    })
  }

  // Captured image.
  capturedImage: any | undefined;

  /**
  * Method to capture an image using the device's camera.
  * Once captured, the image is converted to Blob and uploaded to the server.
  * Finally, the image URL is updated in the user's profile.
  */
  async takePicture() {
    // Captures an image using the device's camera.
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // Saves the captured image in the 'capturedImage' variable.
    this.capturedImage = image.webPath;
    console.log("Imagen capturada: ", this.capturedImage);
    // Converts the captured image to Blob and uploads it to the server.
    dataURLtoBlob(this.capturedImage, (blob: Blob) => {
      this.mediaSvc.upload(blob).subscribe({
        next: (media: any) => {
          this.user.imageUrl = media[0].url_thumbnail;
          this.userSvc.updateUser(this.user);
        }
      })
    });
  }

  // Variable to display the form
  formActive: boolean = false;

  /**
  * Method to toggle the activation of the form.
  * Changes the state of the formActive variable between true and false.
  */
  activeForm(){
    this.formActive = !this.formActive;
  }

  /**
  * Updates the username with the value entered in the form.
  * After updating the user, it toggles the form state.
  */
  updateUserName() {
    this.user.username = this.form.value.name;
    this.userSvc.updateUser(this.user);
    this.activeForm();
  }

  // Variable for the application background.
  fondo: string = "";

  /**
  * Changes the application background with the provided value.
  * Updates the background in the background service and also in the user's data.
  * @param fondo The new background to be applied.
  */
  changeBackground(fondo: string) {
    console.log("Fondo: ", fondo);
    this.fondo = fondo;
    this.backgroundSvc.setBackground(fondo);
    this.user.fondo = fondo;
    this.userSvc.updateUser(this.user);
  }

  /**
  * Method to export data.
  * It obtains data from Firebase.
  *
  * @remarks
  * This method obtains data from Firebase using FirebaseService.
  */
  exportData(): void {
    this._firebaseService
      .getAllData()
      .then((dataObject) => {
        const formattedData = this.formatDates(dataObject);
        const csvFiles = this.jsonToCSV(formattedData);
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
   * Formats date fields in the JSON data object to MM-DD-YYYY.
   * @param dataObject - The JSON data object with dates to format.
   * @returns A new JSON data object with formatted dates.
   */
  private formatDates(dataObject: { [key: string]: any[] }): { [key: string]: any[] } {
    const formattedData: { [key: string]: any[] } = {};
  
    for (const key in dataObject) {
      if (dataObject.hasOwnProperty(key) && dataObject[key].length > 0) {
        formattedData[key] = dataObject[key].map((item) => {
          const newItem = { ...item };
          if (newItem.fechaCita) {
            newItem.fechaCita = this.formatFirebaseTimestamp(newItem.fechaCita);
          }
          if (newItem.fechaSolicitud) {
            newItem.fechaSolicitud = this.formatFirebaseTimestamp(newItem.fechaSolicitud);
          }
          return newItem;
        });
      }
    }
  
    return formattedData;
  }
  
  /**
   * Formats a Firebase timestamp to MM-DD-YYYY.
   * @param timestamp - The Firebase timestamp to format.
   * @returns The formatted date string.
   */
  private formatFirebaseTimestamp(timestamp: { seconds: number, nanoseconds: number }): string {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  
  /**
   * Converts JSON data to CSV format.
   * @param dataObject - The JSON data object that is going to be converted to CSV.
   * @returns An object that contains the CSV content for each data set.
   */
  public jsonToCSV(dataObject: { [key: string]: any[] }): { [key: string]: string } {
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
   * @param csvContent - The CSV content that is going to be downloaded.
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
