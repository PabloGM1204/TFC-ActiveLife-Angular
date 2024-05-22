import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { map } from 'rxjs';
import { Cita } from 'src/app/core/interfaces/cita';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CitasService } from 'src/app/core/services/citas.service';
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
    private firebaseSvc: FirebaseService,
    public citasSvc: CitasService,
  ) {}

  ngOnInit() {
    /*const isAnon = await this.firebaseSvc.isUserConnectedAnonymously();
    if(isAnon){
      console.warn("El usuario está conectado anónimamente");
    }*/
    this.citasSvc.subscribeToCitasCollection();
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.citasFiltered(_.uuid);
    })
  }

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
