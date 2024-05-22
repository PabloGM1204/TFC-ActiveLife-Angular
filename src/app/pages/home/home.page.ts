import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { map } from 'rxjs';
import { Cita } from 'src/app/core/interfaces/cita';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CitasService } from 'src/app/core/services/citas.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { RutinaService } from 'src/app/core/services/rutina.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private rutinaSvc: RutinaService,
    public citasSvc: CitasService,
  ) {}

  ngOnInit() {
    this.rutinaSvc.subscribeToRutinaCollection();
    this.citasSvc.subscribeToCitasCollection();
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.citasFiltered(_.uuid);
      this.rutinasFiltered(_.uuid);
    })
  }

  // Lista de rutinas privadas
  rutinas: Rutina[] = [];

  // Filtrar las rutinas por usuario
  rutinasFiltered(uuid: string) {
    // Obtener el día actual en español
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const today = days[new Date().getDay()];
    console.log("Día actual: ", today);
    // Filtro las rutinas
    this.rutinaSvc.rutinas$.pipe(
      map(rutina => rutina.filter(rutina => rutina.userUUID === uuid && rutina.day == today && rutina.activo == true))
      ).subscribe(filteredRutinas => {
        this.rutinas = filteredRutinas;
        filteredRutinas.forEach(rutina => {
          this.exercises = rutina.exercises;
        })
        console.log("RESULTADO DE LAS RUTINAS FILTRADAS: ", this.rutinas);
    });
  }

  // Lista de ejercicios
  exercises: any[] = [];

  // Lista de rutinas privadas
  citas: Cita[] = [];

  // Citas filtradas por usuario
  citasFiltered(uuid: string) {
    this.citasSvc.citas$.pipe(
      map(citas => citas.filter(cita => cita?.encargadoUuid == uuid && cita?.estado == 'aceptado' && cita?.fechaCita.toDate() > new Date()))
      ).subscribe(filteredCitas => {
        this.citas = filteredCitas;
        console.log("RESULTADO DE LAS CITAS FILTRADAS: ", this.citas);
      });
  }

  // Método para formatear una fecha de tipo Timestamp
  getCitaDate(timestamp: Timestamp): { fechaFormateada: string, pasada: boolean } {
    const citaDate = timestamp.toDate(); // Convierte el Timestamp a un objeto Date
    const currentDate = new Date(); // Fecha y hora actuales
    const pasada = citaDate < currentDate;  // Comprueba si la fecha es anterior a la actual
    // Formatea la fecha y hora
    const fechaFormateada = citaDate.toLocaleString(); // Devuelve una cadena con la fecha y hora formateada

    // Devuelve la fecha formateada y un indicador de si la cita es pasada o no
    return { fechaFormateada, pasada };
  }

}
