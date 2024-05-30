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

  activateChange: boolean = true;

  constructor(
    private auth: AuthService,
    private firebaseSvc: FirebaseService,
    private router: Router,
    private modal: ModalController,
    public translate: CustomTranslateService
  ) { }

  ngOnInit() {
    console.log("Configuración de Swiper: ", this.config)
    this.translate.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

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

  items: any[] = ['assets/imgs/swiper/img-swiper-1.jpg', 'assets/imgs/swiper/img-swiper-2.jpg', 'assets/imgs/swiper/img-swiper-3.jpg', 'assets/imgs/swiper/img-swiper-4.jpg'];

  // Método para cambiar entre el componente de Login y Registro
  changeComponent(){
    this.activateChange = !this.activateChange
  }

  // Método para hacer el login
  // al hacer click recibe los datos para el login y hacemos el login, en caso de ir bien pasaria al home
  onLogin(credencials: UserCredentials){
    this.auth.logOut();
    console.log("Datos login: ", credencials)
    this.auth.login(credencials).subscribe({
      next: data => {
        console.log("Data que devuelve el login ", data)
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

  // Método para hacer el registro
  // al hacer click recibe los datos para el registro y hacemos el registro, en caso de ir bien pasaria al home
  onRegister(credencials: UserCredentials){
    console.log("Datos registro: ", credencials)
    this.auth.register(credencials).subscribe({
      next: data => {
        console.log("Data que devuelve el registro ", data)
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
        } else if (data.admin == true && data.aceptado == false) {
          this.presentModal("Aun no tienes permisos para acceder a la aplicación", (result)=>{
            console.log("Modal cerrado")
            //this.auth.logOut();
          });
        }
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log(err)
      }
    })
  }


  // Método para ver el modal para informar a los usuarios
  async presentModal(data: any | null, onDismiss:(result:any)=>void){
    const modal = await this.modal.create({
      component: InfoModalComponent,
      componentProps:{
        info: data
      },
      cssClass:"info-modal"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

  // Variable para el idioma
  lang: string = "es";

  // Método para cambiar el idioma
  onLang(idioma: string) {
    console.log('Cambio de idioma');
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
    this.translate.use(this.lang);
    return false; 
  }

}
