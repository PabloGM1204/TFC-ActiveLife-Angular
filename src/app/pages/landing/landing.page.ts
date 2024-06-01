import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { map } from 'rxjs';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { RutinaService } from 'src/app/core/services/rutina.service';
import { SwiperOptions } from 'swiper';
import SwiperCore, { EffectCoverflow } from 'swiper';

SwiperCore.use([EffectCoverflow]);
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  /**
  * Reference to the IonRouterOutlet to handle navigation within a component.
  */
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet | undefined;

  linkAPK = "https://firebasestorage.googleapis.com/v0/b/activelife-74fc2.appspot.com/o/apk%2Fapp-debug.zip?alt=media&token=b143deeb-1e5b-4308-b4bb-cf7572639bda";

  /**
  * Class constructor.
  * @param router Routing service for navigation between components.
  * @param rutinaSvc Service to manage routines.
  * @param authSvc Authentication service.
  * @param auth Authentication service to manage login state.
  * @param translate Custom translation service.
  */
  constructor(
    private router: Router,
    private rutinaSvc: RutinaService,
    private authSvc: FirebaseService,
    private auth: AuthService,
    public translate: CustomTranslateService
  ) { }

  // Variable to know if the user is logged in.
  loguead: Boolean | undefined;

  /**
  * Method that runs when initializing the component.
  * Subscribes to the routine service to get the available routines.
  * Subscribes to the login state to manage user authentication.
  * Sets a timer to handle anonymous connection in case there is no logged in user.
  * Subscribes to the translation service to update the component's language.
  */
  ngOnInit() {
    // Subscription to the routine service to get the available routines.
    this.rutinaSvc.subscribeToRutinaCollection();
    // Subscription to the login state to manage user authentication.
    this.auth.isLogged$.subscribe(logged => {
      console.log(logged);
      this.loguead = logged;
      
    });
    // Timer to handle anonymous connection in case there is no logged in user.
    setTimeout(() => {
      if (this.loguead) {
        console.log("Usuario logeado");
      } else {
        console.log("No hay usuario logeado");
        // Anonymous connection.
        this.authSvc.connectAnonymously().then(() => {
          console.log("Conexión anónima exitosa");
          this.rutinasFiltered();
        }).catch((error) => {
          console.log("Error en la conexión anónima: ", error);
          // Log out in case of error in the anonymous connection.
          this.auth.logOut();
          this.rutinasFiltered();
        });
      }
    }, 5000);
    // Subscription to the translation service to update the component's language.
    this.translate.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  // Configuration of the swiper to be infinite and display 3 elements.
  config: SwiperOptions = {
    effect: 'coverflow',
    slidesPerView: 3,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    loop: true,
    initialSlide: 2,
  };

  // Variable to store the routine.
  rutinas: Rutina[] = [];

  /**
  * Filters the available routines to display only the public ones.
  * Subscribes to the routine service to get the available routines.
  * Uses the pipe operator with the map operator to filter the public routines.
  * Updates the list of filtered routines and stores it in the rutinas property.
  */
  rutinasFiltered() {
    this.rutinaSvc.rutinas$.pipe(
      map(rutina => rutina.filter(rutina => rutina.public == true))
      ).subscribe(filteredRutinas => {
        this.rutinas = filteredRutinas;
        console.log("RESULTADO DE LAS RUTINAS FILTRADAS: ", this.rutinas);
      });
  }

  /**
  * Navigates to the login page.
  */
  goLogReg(){
    this.router.navigate(['/login'])
  }

  /**
  * Method to download the APK.
  */
  downloadAPK(){
    console.log("Descargar APK")
  }

  // Variable to store the language, initialized in Spanish.
  lang: string = "es";

  /**
  * Changes the language of the application.
  * 
  * @param idioma The language to which the application will be changed.
  * @returns false to prevent the default behavior of the link.
  */
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
