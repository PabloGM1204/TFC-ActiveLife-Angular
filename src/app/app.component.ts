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

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;

    if (this.showTooltip) {
      const page = this.rotuer.url;
      switch (page) {
        case '/home':
          this.infoText = 'Esta es la página de inicio.';
          break;
        case '/about':
          this.infoText = 'Esta es la página sobre nosotros.';
          break;
        // Añade más casos según las rutas de tu aplicación
        default:
          this.infoText = 'Información genérica.';
      }
    }
  }
}
