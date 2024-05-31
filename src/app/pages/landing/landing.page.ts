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
  * Referencia al IonRouterOutlet para manejar la navegación dentro de un componente.
  */
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet | undefined;

  /**
  * Constructor de la clase.
  * @param router Servicio de enrutamiento para la navegación entre componentes.
  * @param rutinaSvc Servicio para gestionar las rutinas.
  * @param authSvc Servicio de autenticación.
  * @param auth Servicio de autenticación para gestionar el estado de inicio de sesión.
  * @param translate Servicio de traducción personalizado.
  */
  constructor(
    private router: Router,
    private rutinaSvc: RutinaService,
    private authSvc: FirebaseService,
    private auth: AuthService,
    public translate: CustomTranslateService
  ) { }

  // Variable para saber si el usuario está logueado
  loguead: Boolean | undefined;

  /**
  * Método que se ejecuta al inicializar el componente.
  * Se suscribe al servicio de rutinas para obtener las rutinas disponibles.
  * Se suscribe al estado de inicio de sesión para gestionar la autenticación del usuario.
  * Se establece un temporizador para manejar la conexión anónima en caso de no haber usuario logeado.
  * Se suscribe al servicio de traducción para actualizar el idioma del componente.
  */
  ngOnInit() {
    // Suscripción al servicio de rutinas para obtener las rutinas disponibles
    this.rutinaSvc.subscribeToRutinaCollection();
    // Suscripción al estado de inicio de sesión para gestionar la autenticación del usuario
    this.auth.isLogged$.subscribe(logged => {
      console.log(logged);
      this.loguead = logged;
      
    });
    // Temporizador para manejar la conexión anónima en caso de no haber usuario logeado
    setTimeout(() => {
      if (this.loguead) {
        console.log("Usuario logeado");
      } else {
        console.log("No hay usuario logeado");
        // Conexión anónima
        this.authSvc.connectAnonymously().then(() => {
          console.log("Conexión anónima exitosa");
          this.rutinasFiltered();
        }).catch((error) => {
          console.log("Error en la conexión anónima: ", error);
          // Cierre de sesión en caso de error en la conexión anónima
          this.auth.logOut();
          this.rutinasFiltered();
        });
      }
    }, 5000); // Espera 3 segundos (3000 milisegundos) antes de ejecutar el código dentro del setTimeout
    // Suscripción al servicio de traducción para actualizar el idioma del componente
    this.translate.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  // Configuración del swiper para que sea infinito y se vean 3 elementos
  config: SwiperOptions = {
    effect: 'coverflow',
    slidesPerView: 3,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 50, // Cambia el valor según lo que desees
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    loop: true,
    initialSlide: 2,
  };

  // Variable para guardar las rutinas
  rutinas: Rutina[] = [];

  /**
  * Filtra las rutinas disponibles para mostrar solo las públicas.
  * Suscribe al servicio de rutinas para obtener las rutinas disponibles.
  * Utiliza el operador pipe con el operador map para filtrar las rutinas públicas.
  * Actualiza la lista de rutinas filtradas y la almacena en la propiedad rutinas.
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
  * Navega a la pagina de inicio de sesión.
  */
  goLogReg(){
    this.router.navigate(['/login'])
  }

  /**
  * Método para descargar el APK.
  */
  downloadAPK(){
    console.log("Descargar APK")
  }

  // Variable para guardar el idioma que la inicializo en español
  lang: string = "es";

  /**
 * Cambia el idioma de la aplicación.
 * 
 * @param idioma El idioma al que se cambiará la aplicación.
 * @returns false para evitar el comportamiento predeterminado del enlace.
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
