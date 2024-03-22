import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) {}

  // Método para ir a rutinas
  goRutinas(){
    this.router.navigate(['/rutinas'])
  }

  // Método para ir a citas
  goCitas(){
    this.router.navigate(['/citas'])
  }

  // Método para ir a registrar problemas
  goProblemas(){
    this.router.navigate(['/problemas'])
  }

}
