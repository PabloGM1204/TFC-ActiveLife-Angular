import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ModalController } from '@ionic/angular';
import { CustomTranslateService } from './core/services/custom-translate.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: any | undefined
  showTooltip = false;
  infoText?: string;
  isLanding: boolean = false;
  lang: string = "es";

  constructor(
    public auth: AuthService,
    private rotuer: Router,
    public translate: CustomTranslateService
  ) {
    this.rotuer.events.subscribe(() => {
      this.isLanding = this.rotuer.url === '/landing' || this.rotuer.url === '/login';
    });

    defineCustomElements(window);
    this.auth.isLogged$.subscribe(logged => {
      console.log(logged)
      if(logged){
        this.rotuer.navigate(['/home']);
        this.auth.me().subscribe(_ => {
          console.log("Usuario logeado "+_.name)
          this.user = {
            name: _.name,
            email: _.email
          }
        })
      } else
        this.rotuer.navigate(['/landing'])
    });

    this.translate.use(this.lang)
  }


  // Método para cambiar de idioma
  onLang() {
    console.log('Cambio de idioma');
    if(this.lang=='es')
      this.lang='en';
    else
      this.lang='es';
    this.translate.use(this.lang);
    return false; 
  }

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;

    if (this.showTooltip) {
      const page = this.rotuer.url;
      switch (page) {
        case '/home':
          this.infoText = 'Esta es la página de inicio donde veras las citas proximas que tienes y la rutina que te toca hoy.';
          break;
        case '/profile':
          this.infoText = 'Página de perfil de usuario en la que puedes ver tus datos y cambiar tu foto de perfil.';
          break;
        case '/usuarios':
          this.infoText = 'Página con la lista de todos los usuarios que se han registrado a los cuales puedes aceptar, denegar y borrar.';
          break;
        case '/citas':
          this.infoText = 'Página en la que puedes aceptar, denegar, responder y obtener citas.';
          break;
        case '/rutinas':
          this.infoText = 'Página en la que puedes ver tus rutinas, crear nuevas, editarlas, borrarlas y copiar rutinas publicas.';
          break;
        case '/crear-rutina':
          this.infoText = 'Completa el formulario con los campos obligatorios y añade ejercicios para crear tu rutina.';
          break;
        default:
          this.infoText = 'Información genérica.';
      }
    }
  }

  // Método para cerrar sesión
  onSingOut(){
    this.auth.logOut().subscribe(_=>{
      this.rotuer.navigate(['/landing']);
    })
  }
}
