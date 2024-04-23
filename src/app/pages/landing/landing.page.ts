import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { map } from 'rxjs';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { RutinaService } from 'src/app/core/services/rutina.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet | undefined;

  constructor(
    private router: Router,
    private rutinaSvc: RutinaService,
  ) { }

  ionViewDidEnter() {
    // Coloca aquí el código que deseas ejecutar cada vez que el usuario entra en esta página
    console.log('El usuario ha entrado en esta página');
    this.rutinasFiltered();
  }

  ngOnInit() {
    
  }

  // Configuración del swiper
  swiperConfig: any = {
    direction: 'horizontal', // Dirección del swiper ('horizontal' o 'vertical')
    loop: true, // Habilitar el bucle infinito
    speed: 500, // Velocidad de la transición (en milisegundos)
    slidesPerView: 'auto', // Número de slides visibles al mismo tiempo ('auto' para ajustar automáticamente)
    spaceBetween: 10, // Espacio entre slides (en píxeles)
    pagination: { // Configuración de la paginación
      el: '.swiper-pagination', // Selector del elemento de paginación
      clickable: true, // Permitir hacer clic en la paginación para ir al slide correspondiente
    },
    navigation: { // Configuración de la navegación (flechas)
      nextEl: '.swiper-button-next', // Selector del botón de siguiente
      prevEl: '.swiper-button-prev', // Selector del botón de anterior
    },
  };

  items: any[] = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5'];


  rutinas: Rutina[] = [];

  // Filtrar las rutinas por las que son publicas
  rutinasFiltered() {
    this.rutinaSvc.rutinas$.pipe(
      map(rutina => rutina.filter(rutina => rutina.public == true))
      ).subscribe(filteredRutinas => {
        this.rutinas = filteredRutinas;
        console.log("RESULTADO DE LAS RUTINAS FILTRADAS: ", this.rutinas);
      });
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
