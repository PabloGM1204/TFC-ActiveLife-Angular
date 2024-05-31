import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ModalController } from '@ionic/angular';
import { CustomTranslateService } from './core/services/custom-translate.service';
import { BackgroundService } from './core/services/background.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // Variable para el usuario
  user: any | undefined

  // Variable para mostrar el tooltip
  showTooltip = false;

  // Variable para el texto del tooltip
  infoText?: string;

  // Variable para saber si estamos en la landing
  isLanding: boolean = false;

  // Variable para el fondo
  fondo: string = "";

  // Variable para saber si la autenticación inicial ha sido resuelta
  initialAuthResolved = false;

  /**
  * Crea una instancia del componente AppComponent.
  * @param auth El servicio de autenticación.
  * @param rotuer El enrutador de la aplicación.
  * @param translate El servicio de traducción personalizado.
  * @param backgroundSvc El servicio de fondo.
  */
  constructor(
    public auth: AuthService,
    private rotuer: Router,
    public translate: CustomTranslateService,
    private backgroundSvc: BackgroundService,
  ) {
    // Suscribirse a eventos de cambio de URL en el enrutador
    this.rotuer.events.subscribe(() => {
      // Verificar si la URL actual corresponde a la página de inicio o inicio de sesión
      this.isLanding = this.rotuer.url === '/landing' || this.rotuer.url === '/login';
    });

    // Suscribirse a cambios en el fondo
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
    
    // Definir elementos personalizados para su uso en la aplicación
    defineCustomElements(window);

    // Suscribirse a cambios en el estado de inicio de sesión
    this.auth.isLogged$.subscribe((logged) => {
      // Verificar si la autorización inicial ya se ha resuelto
      if (this.initialAuthResolved) {
        // Redirigir a la página de inicio o de inicio de sesión según el estado de inicio de sesión
        if (logged) {
          this.rotuer.navigate(['/home']).catch(err => console.error(err));
        } else {
          this.rotuer.navigate(['/landing']).catch(err => console.error(err));
        }
      } else {
        this.initialAuthResolved = true;
      }
    });

    // Suscribirse a cambios en el idioma
    this.translate.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  // Variable para el idioma
  lang: string = "es";

  /**
  * Gestiona el cambio de idioma en la aplicación.
  * @param idioma El idioma seleccionado.
  * @returns `false` para evitar la recarga de la página.
  */
  onLang(idioma: string) {
    console.log('Cambio de idioma');
    // Establecer el idioma seleccionado
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
    // Aplicar el idioma seleccionado mediante el servicio de traducción
    this.translate.use(this.lang);
    return false; 
  }

  /**
  * Alternar la visibilidad del tooltip.
  */
  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
    // Actualizar el texto del tooltip dependiendo del idioma seleccionado
    if (this.showTooltip) {
      const page = this.rotuer.url;
      switch (page) {
        case '/home':
          switch (this.lang) {
            case 'es':
              this.infoText = 'Esta es la página de inicio donde veras las citas proximas que tienes y la rutina que te toca hoy.';
              break;
            case 'en':
              this.infoText = 'This is the home page where you will see the upcoming appointments you have and the routine you have today.';
              break;
            case 'it':
              this.infoText = 'Questa è la home page in cui vedrai i prossimi appuntamenti che hai e la routine che hai oggi.';
              break;
          }
          break;
        case '/profile':
          switch (this.lang) {
            case 'es':
              this.infoText = 'Página de perfil de usuario en la que puedes ver tus datos y cambiar tu foto de perfil.';
              break;
            case 'en':
              this.infoText = 'User profile page where you can view your details and change your profile photo.';
              break;
            case 'it':
              this.infoText = 'Pagina del profilo utente in cui puoi visualizzare i tuoi dettagli e modificare la foto del tuo profilo.';
              break;
          }
          break;
        case '/usuarios':
          switch (this.lang) {
            case 'es':
              this.infoText = 'Página con la lista de todos los usuarios que se han registrado a los cuales puedes aceptar, denegar y borrar.';
              break;
            case 'en':
              this.infoText = 'Page with the list of all registered users whom you can accept, deny and delete.';
              break;
            case 'it':
              this.infoText = "Pagina con l'elenco di tutti gli utenti registrati che puoi accettare, rifiutare ed eliminare.";
              break;
          }
          break;
        case '/citas':
          switch (this.lang) {
            case 'es':
              this.infoText = 'Página en la que puedes aceptar, denegar, responder y obtener citas.';
              break;
            case 'en':
              this.infoText = 'Page where you can accept, deny, respond and get appointments.';
              break;
            case 'it':
              this.infoText = 'Pagina dove puoi accettare, rifiutare, rispondere e ottenere appuntamenti.';
              break;
          }
          break;
        case '/rutinas':
          switch (this.lang) {
            case 'es':
              this.infoText = 'Página en la que puedes ver tus rutinas, crear nuevas, editarlas, borrarlas y copiar rutinas publicas.';
              break;
            case 'en':
              this.infoText = 'Page where you can see your routines, create new ones, edit them, delete them and copy public routines.';
              break;
            case 'it':
              this.infoText = 'Pagina in cui puoi vedere le tue routine, crearne di nuove, modificarle, eliminarle e copiare le routine pubbliche.';
              break;
          }
          break;
        case '/crear-rutina':
          switch (this.lang) {
            case 'es':
              this.infoText = 'Completa el formulario con los campos obligatorios y añade ejercicios para crear tu rutina.';
              break;
            case 'en':
              this.infoText = 'Complete the form with the required fields and add exercises to create your routine.';
              break;
            case 'it':
              this.infoText = 'Completa il modulo con i campi obbligatori e aggiungi esercizi per creare la tua routine.';
              break;
          }
          break;
        default:
          switch (this.lang) {
            case 'es':
              this.infoText = 'Información genérica.';
              break;
            case 'en':
              this.infoText = 'Generic information.';
              break;
            case 'it':
              this.infoText = 'Informazioni generiche.';
              break;
          }
      }
    }
  }

  /**
  * Cerrar sesión del usuario.
  * Redirige al usuario a la página de inicio.
  */
  onSingOut(){
    this.auth.logOut().subscribe(_=>{
      this.rotuer.navigate(['/landing']);
    })
  }
}
