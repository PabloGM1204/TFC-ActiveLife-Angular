import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BackgroundService } from 'src/app/core/services/background.service';
import { RutinaService } from 'src/app/core/services/rutina.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
})
export class RutinasPage implements OnInit {

  // Variable para guardar el fondo de la página
  fondo: string = "";

  /**
  * Constructor de la clase.
  * @param rutinaSvc Servicio para gestionar las rutinas.
  * @param auth Servicio de autenticación.
  * @param router Router para la navegación.
  * @param backgroundSvc Servicio para gestionar el fondo de la aplicación.
  */
  constructor(
    private rutinaSvc: RutinaService,
    public auth: AuthService,
    private router: Router,
    private backgroundSvc: BackgroundService,
  ) { }

  // Lista de rutinas privadas
  rutinas: Rutina[] = [];

  // Lista de rutinas publicas
  rutinasPublic: Rutina[] = [];

  // Usuario
  user: any;

  /**
  * Método que se ejecuta al inicializarse el componente.
  * Suscribe el componente a la colección de rutinas.
  * Obtiene la información del usuario autenticado y filtra las rutinas asociadas a su UUID.
  * Filtra las rutinas públicas disponibles.
  */
  ngOnInit() {
    this.rutinaSvc.subscribeToRutinaCollection();
    this.auth.me().subscribe(_ => {
      this.user = _;
      console.log("Usuario logeado "+ _.uuid);
      this.rutinasFiltered(_.uuid);
      this.rutinasFilteredByPublic();
    });
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  /**
  * Filtra las rutinas asociadas al UUID del usuario especificado.
  * @param uuid El UUID del usuario para filtrar las rutinas.
  */
  rutinasFiltered(uuid: string) {
    this.rutinaSvc.rutinas$.pipe(
      map(rutina => rutina.filter(rutina => rutina.userUUID === uuid))
      ).subscribe(filteredRutinas => {
        this.rutinas = filteredRutinas;
        console.log("RESULTADO DE LAS RUTINAS FILTRADAS: ", this.rutinas);
      });
  }

  /**
  * Filtra las rutinas públicas.
  */
  rutinasFilteredByPublic() {
    this.rutinaSvc.rutinas$.pipe(
      map(rutina => rutina.filter(rutina => rutina.public == true))
      ).subscribe(filteredRutinas => {
        this.rutinasPublic = filteredRutinas;
        console.log("RESULTADO DE LAS RUTINAS PUBLICAS: ", this.rutinasPublic);
      });
  }

  // Variable para activar o no las rutinas publicas
  publicRutine: boolean = false;

  /**
  * Oculta las rutinas públicas y muestra solo las privadas.
  */
  privateRutines(){
    this.publicRutine = false;
  }

  /**
  * Oculta las rutinas privadas y muestra solo las públicas.
  */
  publicRutines(){
    this.publicRutine = true;
  }

  /**
  * Elimina una rutina.
  * @param rutina La rutina a eliminar.
  */
  deleteRutine(rutina: Rutina){
    console.log("Eliminar rutina: ", rutina);
    this.rutinaSvc.deleteRutina(rutina);
  }

  /**
  * Navega hacia la página de creación de una nueva rutina.
  */
  goCrearRutina() {
    this.router.navigate(['/crear-rutina']);
  }

  /**
  * Copia una rutina.
  * @param rutina La rutina a copiar.
  */
  copyExercise(rutina: any) {
    console.log('copiar rutina', rutina);
    let _rutina = {
      ...rutina,
      userUUID: this.user.uuid,
      public: false
    }
    this.rutinaSvc.copyRutina(_rutina);
  }

  /**
  * Cambia el estado de una rutina.
  * @param rutina La rutina a cambiar.
  */
  changeRutina(rutina: any) {
    console.log('cambiar rutina', rutina);
    if (rutina.activo) {
      this.rutinas.forEach(otherRutina => {
        if (otherRutina.day === rutina.day && otherRutina !== rutina && otherRutina.activo) {
          otherRutina.activo = false;
        }
        this.rutinaSvc.updateRutina(rutina);
        this.rutinaSvc.updateRutina(otherRutina);
      });
    } else {
      this.rutinaSvc.updateRutina(rutina);
    }
  }

}
