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

  // Variable to know whether to display the login or the registration.
  activateChange: boolean = true;

  /**
  * Class constructor.
  * @param auth Authentication service.
  * @param firebaseSvc Firebase service.
  * @param router Router for navigation.
  * @param modal Modal controller to create and present modals.
  * @param translate Custom translation service.
  */
  constructor(
    private auth: AuthService,
    private firebaseSvc: FirebaseService,
    private router: Router,
    private modal: ModalController,
    public translate: CustomTranslateService
  ) { }

  /**
  * ngOnInit method that runs when initializing the component.
  * Subscribes to the translation service to update the language.
  */
  ngOnInit() {
    console.log("Configuración de Swiper: ", this.config)
    this.translate.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  // Swiper configuration.
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

  // List of items for the Swiper that are images of people in the gym.
  items: any[] = ['assets/imgs/swiper/img-swiper-1.jpg', 'assets/imgs/swiper/img-swiper-2.jpg', 'assets/imgs/swiper/img-swiper-3.jpg', 'assets/imgs/swiper/img-swiper-4.jpg'];

  /**
  * Method to toggle the state of the activateChange property.
  * Changes the value of activateChange between true and false.
  */
  changeComponent(){
    this.activateChange = !this.activateChange
  }

  /**
  * Method to handle user login.
  * 
  * @param credentials - The credentials of the user attempting to log in.
  */
  onLogin(credencials: UserCredentials){
    // Closes the current session.
    this.auth.logOut();
    console.log("Datos login: ", credencials)
    // Tries to log in with the provided credentials.
    this.auth.login(credencials).subscribe({
      next: data => {
        console.log("Data que devuelve el login ", data)
        // If the user is not an administrator
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
        // If the user is an administrator but still does not have permissions
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
        // If the user is an administrator and has permissions
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
  * Method to handle the registration of a new user.
  * 
  * @param credentials - The credentials of the user attempting to register.
  */
  onRegister(credencials: UserCredentials){
    console.log("Datos registro: ", credencials)
    // Attempt to register the user with the provided credentials.
    this.auth.register(credencials).subscribe({
      next: data => {
        console.log("Data que devuelve el registro ", data)
        // If the user is not an administrator
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
        // If the user is an administrator but still does not have permissions
        } else if (data.admin == true && data.aceptado == false) {
          this.presentModal("Aun no tienes permisos para acceder a la aplicación", (result)=>{
            console.log("Modal cerrado")
            //this.auth.logOut();
          });
        }
        // Redirects the user to the main page after registration.
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err)
      }
    })
  }


  /**
  * Method to present a modal with information.
  * 
  * @param data - Information to be displayed in the modal.
  * @param onDismiss - Callback function that will be executed when the modal is closed.
  */
  async presentModal(data: any | null, onDismiss:(result:any)=>void){
    // Create the modal with the InfoModalComponent and the necessary properties.
    const modal = await this.modal.create({
      component: InfoModalComponent,
      componentProps:{
        info: data
      },
      cssClass:"info-modal"
    });
    // Display the modal.
    modal.present();
    // Execute the callback function when the modal is closed.
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

  // Variable for the language.
  lang: string = "es";

  /**
  * Changes the language of the application.
  *
  * @param idioma - The code of the language to which you want to change ('es', 'en', 'it').
  * @returns false - Indicates that the action does not reload the page.
  */
  onLang(idioma: string) {
    console.log('Cambio de idioma');
    // Assigns the selected language to the 'lang' property.
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
    // Changes the language using the translation service.
    this.translate.use(this.lang);
    // Returns false to prevent default behavior.
    return false; 
  }

}
