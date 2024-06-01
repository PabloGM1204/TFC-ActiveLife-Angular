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

  // Variable for the user.
  user: any | undefined

  // Variable to display the tooltip.
  showTooltip = false;

  // Variable for the tooltip text.
  infoText?: string;

  // Variable to determine if we are on the landing page.
  isLanding: boolean = false;

  // Variable for the background.
  fondo: string = "";

  // Variable to determine if initial authentication has been resolved.
  initialAuthResolved = false;

  /**
  * Creates an instance of the AppComponent component.
  * @param auth The authentication service.
  * @param rotuer The application router.
  * @param translate The custom translation service.
  * @param backgroundSvc The background service.
  */
  constructor(
    public auth: AuthService,
    private rotuer: Router,
    public translate: CustomTranslateService,
    private backgroundSvc: BackgroundService,
  ) {
    // Subscribe to URL change events in the router.
    this.rotuer.events.subscribe(() => {
      // Check if the current URL corresponds to the home or login page.
      this.isLanding = this.rotuer.url === '/landing' || this.rotuer.url === '/login';
    });

    // Subscribe to background changes.
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
    
    // Define custom elements for use in the application.
    defineCustomElements(window);

    // Subscribe to changes in the login status.
    this.auth.isLogged$.subscribe((logged) => {
      // Check if the initial authorization has already been resolved.
      if (this.initialAuthResolved) {
        // Redirect to the home or login page based on the login status.
        if (logged) {
          this.rotuer.navigate(['/home']).catch(err => console.error(err));
        } else {
          this.rotuer.navigate(['/landing']).catch(err => console.error(err));
        }
      } else {
        this.initialAuthResolved = true;
      }
    });

    // Subscribe to changes in the language.
    this.translate.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  // Variable for the language.
  lang: string = "es";

  /**
  * Manages the change of language in the application.
  * @param idioma The selected language.
  * @returns `false` to prevent the page from reloading.
  */
  onLang(idioma: string) {
    console.log('Cambio de idioma');
    // Set the selected language.
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
    // Apply the selected language using the translation service.
    this.translate.use(this.lang);
    return false; 
  }

  /**
  * Toggle the visibility of the tooltip.
  */
  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
    // Update the tooltip text depending on the selected language
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
  * Log out the user.
  * Redirects the user to the home page.
  */
  onSingOut(){
    this.auth.logOut().subscribe(_=>{
      this.rotuer.navigate(['/landing']);
    })
  }
}
