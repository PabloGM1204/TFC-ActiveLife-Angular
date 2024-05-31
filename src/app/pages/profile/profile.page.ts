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

  // Variable para guardar los datos del usuario
  user: any | undefined;

  // Formulario para actualizar el nombre del usuario
  form: FormGroup;

  /**
  * Constructor de la clase.
  *
  * @param formBuilder - Servicio para crear instancias de formularios reactivos.
  * @param auth - Servicio de autenticación para manejar operaciones de autenticación de usuarios.
  * @param userSvc - Servicio para manejar operaciones relacionadas con los usuarios.
  * @param mediaSvc - Servicio para manejar operaciones relacionadas con los medios (imágenes, videos, etc.).
  * @param _firebaseService - Servicio para interactuar con Firebase.
  * @param backgroundSvc - Servicio para manejar el fondo de la aplicación.
  */
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userSvc: UsersService,
    private mediaSvc: MediaService,
    public _firebaseService: FirebaseService,
    private backgroundSvc: BackgroundService,
  ) {
    // Inicializa el formulario reactivo con un campo 'name' requerido
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  /**
  * Método ngOnInit.
  *
  * Método del ciclo de vida de Angular que se ejecuta una vez que se ha inicializado el componente.
  * Obtiene los datos del usuario autenticado y actualiza el formulario y las propiedades del componente.
  */
  ngOnInit() {
    // Obtiene los datos del usuario autenticado.
    this.auth.me().subscribe(_ => {
      console.log("Usuario All rigght ", _);
      // Asigna los datos del usuario a la propiedad 'user' del componente.
      this.user = {
        uuid: _.uuid,
        username: _.name,
        email: _.email,
        imageUrl: _?.photo ? _?.photo : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51",
        fondo: _?.fondo ? _?.fondo : "pri"
      }
      // Actualiza el valor del campo 'name' en el formulario con el nombre de usuario.
      this.form.patchValue({
        name: this.user.username
      });
      // Asigna la URL de la imagen capturada y el fondo del usuario.
      this.capturedImage = this.user.imageUrl;
      this.fondo = this.user.fondo;
      console.log("Usuario logeado ",  this.user);
    })
  }

  // Imagen capturada
  capturedImage: any | undefined;

  /**
  * Método para capturar una imagen utilizando la cámara del dispositivo.
  * Una vez capturada, la imagen se convierte a Blob y se sube al servidor.
  * Finalmente, la URL de la imagen se actualiza en el perfil del usuario.
  */
  async takePicture() {
    // Captura una imagen utilizando la cámara del dispositivo.
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // Guarda la imagen capturada en la variable 'capturedImage'.
    this.capturedImage = image.webPath;
    console.log("Imagen capturada: ", this.capturedImage);
    // Convierte la imagen capturada a Blob y la sube al servidor.
    dataURLtoBlob(this.capturedImage, (blob: Blob) => {
      this.mediaSvc.upload(blob).subscribe({
        next: (media: any) => {
          this.user.imageUrl = media[0].url_thumbnail;
          this.userSvc.updateUser(this.user);
        }
      })
    });
  }

  // Variable para mostrar el formulario
  formActive: boolean = false;

  /**
  * Método para alternar la activación del formulario.
  * Cambia el estado de la variable formActive entre true y false.
  */
  activeForm(){
    this.formActive = !this.formActive;
  }

  /**
  * Actualiza el nombre de usuario con el valor ingresado en el formulario.
  * Después de actualizar el usuario, alterna el estado del formulario.
  */
  updateUserName() {
    this.user.username = this.form.value.name;
    this.userSvc.updateUser(this.user);
    this.activeForm();
  }

  // Variable para el fondo de la aplicación
  fondo: string = "";

  /**
  * Cambia el fondo de la aplicación con el valor proporcionado.
  * Actualiza el fondo en el servicio de fondo y también en los datos del usuario.
  * @param fondo El nuevo fondo que se aplicará.
  */
  changeBackground(fondo: string) {
    console.log("Fondo: ", fondo);
    this.fondo = fondo;
    this.backgroundSvc.setBackground(fondo);
    this.user.fondo = fondo;
    this.userSvc.updateUser(this.user);
  }

  /**
  * Método para exportar datos en formato CSV.
  * Obtiene datos de Firebase, los convierte a formato CSV e inicia las descargas de archivos CSV.
  *
  * @remarks
  * Este método obtiene datos de Firebase utilizando FirebaseService, los convierte a formato CSV
  * e inicia la descarga de archivos CSV para cada conjunto de datos.
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
  * Convierte datos JSON a formato CSV.
  * @param dataObject - El objeto de datos JSON que se va a convertir a CSV.
  * @returns Un objeto que contiene el contenido CSV para cada conjunto de datos.
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
   * Inicia la descarga de un archivo CSV.
   *
   * @param csvContent - El contenido CSV que se va a descargar.
   * @param filename - El nombre del archivo CSV.
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
