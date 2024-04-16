import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  // Método para ir a rutinas
  goUsuarios(){
    this.router.navigate(['/usuarios'])
  }

  // Método para ir a citas
  goCitas(){
    this.router.navigate(['/citas'])
  }

  // Método para ir a registrar problemas
  goProblemas(){
    this.router.navigate(['/problemas'])
  }

  // Método para ir a rutinas
  goRutinas(){
    this.router.navigate(['/rutinas'])
  }

  // Método para cerrar sesión
  onSingOut(){
    this.auth.logOut().subscribe(_=>{
      this.router.navigate(['/login']);
    })
  }

}
