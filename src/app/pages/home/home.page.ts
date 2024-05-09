import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private firebaseSvc: FirebaseService
  ) {}

  async ngOnInit() {
    const isAnon = await this.firebaseSvc.isUserConnectedAnonymously();
    if(isAnon){
      console.warn("El usuario está conectado anónimamente");
    }
  }

  // Método para ir a rutinas
  goUsuarios(){
    this.router.navigate(['/usuarios'])
  }

  // Método para ir a citas
  goCitas(){
    this.router.navigate(['/citas'])
  }

  // Método para ir a rutinas
  goRutinas(){
    this.router.navigate(['/rutinas'])
  }

  // Método para ir a landing
  goLanding(){
    this.router.navigate(['/landing'])
  }

  // Método para ir a perfil
  goProfile(){
    this.router.navigate(['/profile'])
  }

  // Método para cerrar sesión
  onSingOut(){
    this.auth.logOut().subscribe(_=>{
      this.router.navigate(['/login']);
    })
  }

}
