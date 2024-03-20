import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Método para ir al Login/Registro
  goLogReg(){
    this.router.navigate(['/login'])
  }

  // Método para descargar el APK de la app
  downloadAPK(){
    console.log("Descargar APK")
  }

}
