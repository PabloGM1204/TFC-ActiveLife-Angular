import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: any | undefined
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
}
