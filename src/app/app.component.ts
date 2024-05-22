import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: any | undefined
  showTooltip = false;
  infoText?: string;

  constructor(
    public auth: AuthService,
    private rotuer: Router
  ) {
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
  }

  // Método para cambiar de idioma
  onLang() {
    console.log('Cambio de idioma');
  }

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;

    if (this.showTooltip) {
      const page = this.rotuer.url;
      switch (page) {
        case '/home':
          this.infoText = 'Esta es la página de inicio.';
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
          this.infoText = 'Página en la que puedes ver tus rutinas, crear nuevas, editarlas y borrarlas.';
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
      this.rotuer.navigate(['/login']);
    })
  }
}
