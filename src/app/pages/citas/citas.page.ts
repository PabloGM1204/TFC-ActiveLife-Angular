import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Cita } from 'src/app/core/interfaces/cita';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CitasService } from 'src/app/core/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  constructor(
    public citasSvc: CitasService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.citasSvc.subscribeToCitasCollection();
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.citasFiltered(_.uuid);
      this.citasFilteredByPublic();
    })
  }

  // Lista de rutinas privadas
  citas: Cita[] = [];

  // Lista de rutinas publicas
  citasPublic: Cita[] = [];

  // Citas filtradas por usuario
  citasFiltered(uuid: string) {
    this.citasSvc.citas$.pipe(
      map(citas => citas.filter(cita => cita?.encargadoUuid == uuid))
      ).subscribe(filteredCitas => {
        this.citas = filteredCitas;
        console.log("RESULTADO DE LAS CITAS FILTRADAS: ", this.citas);
      });
  }

  // Citas publicas
  citasFilteredByPublic() {
    this.citasSvc.citas$.pipe(
      map(citas => citas.filter(cita => !cita.encargadoUuid))
      ).subscribe(filteredRutinas => {
        this.citasPublic = filteredRutinas;
        console.log("RESULTADO DE LAS RUTINAS PUBLICAS: ", this.citasPublic);
      });
  }

  // Variable para activar o no las citas publicas
  publicCitas: boolean = false;

  // Metodo de boton para ver las citas de un admin en concreto
  misCitas() {
    this.publicCitas = false;
  }

  // Metodo de boton para ver todas las citas
  noAdmins() {
    this.publicCitas = true;
  }

}
