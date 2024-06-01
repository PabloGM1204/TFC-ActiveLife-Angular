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

  // Variable to store the background of the page.
  fondo: string = "";

  /**
  * Class constructor.
  * @param rutinaSvc Service to manage routines.
  * @param auth Authentication service.
  * @param router Router for navigation.
  * @param backgroundSvc Service to manage the application's background.
  */
  constructor(
    private rutinaSvc: RutinaService,
    public auth: AuthService,
    private router: Router,
    private backgroundSvc: BackgroundService,
  ) { }

  // List of private routines.
  rutinas: Rutina[] = [];

  // List of public routines.
  rutinasPublic: Rutina[] = [];

  // User.
  user: any;

  /**
  * Method that runs when the component is initialized.
  * Subscribes the component to the routines collection.
  * Obtains the authenticated user's information and filters the routines associated with their UUID.
  * Filters the available public routines.
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
  * Filters the routines associated with the specified user's UUID.
  * @param uuid The UUID of the user to filter the routines.
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
  * Filters the public routines.
  */
  rutinasFilteredByPublic() {
    this.rutinaSvc.rutinas$.pipe(
      map(rutina => rutina.filter(rutina => rutina.public == true))
      ).subscribe(filteredRutinas => {
        this.rutinasPublic = filteredRutinas;
        console.log("RESULTADO DE LAS RUTINAS PUBLICAS: ", this.rutinasPublic);
      });
  }

  // Variable to enable or disable public routines.
  publicRutine: boolean = false;

  /**
  * Hides the public routines and only shows the private ones.
  */
  privateRutines(){
    this.publicRutine = false;
  }

  /**
  * Hides the private routines and only shows the public ones.
  */
  publicRutines(){
    this.publicRutine = true;
  }

  /**
  * Deletes a routine.
  * @param rutina The routine to delete.
  */
  deleteRutine(rutina: Rutina){
    console.log("Eliminar rutina: ", rutina);
    this.rutinaSvc.deleteRutina(rutina);
  }

  /**
  * Navigates to the page for creating a new routine.
  */
  goCrearRutina() {
    this.router.navigate(['/crear-rutina']);
  }

  /**
  * Copies a routine.
  * @param rutina The routine to copy.
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
  * Changes the status of a routine.
  * @param rutina The routine to change.
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
