import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from 'firebase/app';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { ModalController } from '@ionic/angular';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Variable para saber si se muestra el login o el registro
  activateChange: boolean = true;

  /**
  * Constructor de la clase.
  * @param auth Servicio de autenticación.
  * @param firebaseSvc Servicio de Firebase.
  * @param router Enrutador para la navegación.
  * @param modal Controlador de modales para crear y presentar modales.
  * @param translate Servicio de traducción personalizado.
  */
  constructor(
    private auth: AuthService,
    private firebaseSvc: FirebaseService,
    private router: Router,
    private modal: ModalController,
    public translate: CustomTranslateService
  ) { }

  /**
  * Método ngOnInit que se ejecuta al inicializar el componente.
  * Se suscribe al servicio de traducción para actualizar el idioma.
  */
  ngOnInit() {
    console.log("Configuración de Swiper: ", this.config)
    this.translate.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  // Configuración del Swiper
  config: SwiperOptions = {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true
    }
  };

  // Lista de items para el Swiper que son imagenes de gente en el gym
  items: any[] = ['assets/imgs/swiper/img-swiper-1.jpg', 'assets/imgs/swiper/img-swiper-2.jpg', 'assets/imgs/swiper/img-swiper-3.jpg', 'assets/imgs/swiper/img-swiper-4.jpg'];

  /**
  * Método para alternar el estado de la propiedad activateChange.
  * Cambia el valor de activateChange entre true y false.
  */
  changeComponent(){
    this.activateChange = !this.activateChange
  }

  /**
  * Método para manejar el inicio de sesión del usuario.
  * 
  * @param credentials - Las credenciales del usuario que intenta iniciar sesión.
  */
  onLogin(credencials: UserCredentials){
    // Cierra la sesión actual
    this.auth.logOut();
    console.log("Datos login: ", credencials)
    // Intenta iniciar sesión con las credenciales proporcionadas
    this.auth.login(credencials).subscribe({
      next: data => {
        console.log("Data que devuelve el login ", data)
        // Si el usuario no es administrador
        if(data.admin == false) {
          let info: string = "";
            switch(this.lang){
              case 'es':
                info = "Para usar la aplicación como cliente debe usar el APK";
                break;
              case 'en':
                info = "To use the application as a client you must use the APK";
                break;
              case 'it':
                info = "Per utilizzare l'applicazione come client è necessario utilizzare l'APK";
                break;
            }
          this.presentModal(info, (result)=>{
            console.log("Modal cerrado")
            //this.auth.logOut();
          });
        // Si el usuario es administrador pero aún no tiene permisos
        } else if (data.admin == true && data.aceptado == false) {
          let info: string = "";
            switch(this.lang){
              case 'es':
                info = "Aun no tienes permisos para acceder a la aplicación";
                break;
              case 'en':
                info = "You still do not have permissions to access the application";
                break;
              case 'it':
                info = "Non hai ancora i permessi per accedere all'applicazione";
                break;
            }
          this.presentModal(info, (result)=>{
            console.log("Modal cerrado")
            //this.auth.logOut();
          });
        // Si el usuario es administrador y tiene permisos
        } else {
          console.warn("usuario ha ido a home")
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  /**
  * Método para manejar el registro de un nuevo usuario.
  * 
  * @param credentials - Las credenciales del usuario que intenta registrarse.
  */
  onRegister(credencials: UserCredentials){
    console.log("Datos registro: ", credencials)
    // Intenta registrar al usuario con las credenciales proporcionadas
    this.auth.register(credencials).subscribe({
      next: data => {
        console.log("Data que devuelve el registro ", data)
        // Si el usuario no es administrador
        if(data.admin == false) {
          let info: string = "";
          switch(this.lang){
            case 'es':
              info = "Para usar la aplicación como cliente debe usar el APK";
              break;
            case 'en':
              info = "To use the application as a client you must use the APK";
              break;
            case 'it':
              info = "Per utilizzare l'applicazione come client è necessario utilizzare l'APK";
              break;
          }
          this.presentModal(info, (result)=>{
            console.log("Modal cerrado")
            //this.auth.logOut();
          });
        // Si el usuario es administrador pero aún no tiene permisos
        } else if (data.admin == true && data.aceptado == false) {
          this.presentModal("Aun no tienes permisos para acceder a la aplicación", (result)=>{
            console.log("Modal cerrado")
            //this.auth.logOut();
          });
        }
        // Redirige al usuario a la página principal después del registro
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err)
      }
    })
  }


  /**
  * Método para presentar un modal con información.
  * 
  * @param data - Información que se mostrará en el modal.
  * @param onDismiss - Función de callback que se ejecutará cuando el modal se cierre.
  */
  async presentModal(data: any | null, onDismiss:(result:any)=>void){
    // Crear el modal con el componente InfoModalComponent y las propiedades necesarias
    const modal = await this.modal.create({
      component: InfoModalComponent,
      componentProps:{
        info: data
      },
      cssClass:"info-modal"
    });
    // Mostrar el modal
    modal.present();
    // Ejecutar la función de callback cuando el modal se cierre
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

  // Variable para el idioma
  lang: string = "es";

  /**
  * Cambia el idioma de la aplicación.
  *
  * @param idioma - El código del idioma al que se desea cambiar ('es', 'en', 'it').
  * @returns false - Indica que la acción no recarga la página.
  */
  onLang(idioma: string) {
    console.log('Cambio de idioma');
    // Asigna el idioma seleccionado a la propiedad 'lang'
    switch(idioma){
      case 'es':
        this.lang='es';
        break;
      case 'en':
        this.lang='en';
        break;
      case 'it':
        this.lang='it';
        break;
    }
    // Cambia el idioma usando el servicio de traducción
    this.translate.use(this.lang);
    // Devuelve false para evitar el comportamiento predeterminado (por ejemplo, recargar la página)
    return false; 
  }

}
