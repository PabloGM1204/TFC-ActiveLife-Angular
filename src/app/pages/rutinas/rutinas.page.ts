import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RutinaService } from 'src/app/core/services/rutina.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
})
export class RutinasPage implements OnInit {

  constructor(
    private rutinaSvc: RutinaService,
    public auth: AuthService,
    private router: Router
  ) { }

  // Lista de rutinas
  rutinas: Rutina[] = [];

  ngOnInit() {
    this.rutinaSvc.subscribeToRutinaCollection();
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.rutinasFiltered(_.uuid);
    })
  }

  // Filtrar las rutinas por usuario
  rutinasFiltered(uuid: string) {
    this.rutinaSvc.rutinas$.pipe(
      map(rutina => rutina.filter(rutina => rutina.userUUID === uuid))
      ).subscribe(filteredRutinas => {
        this.rutinas = filteredRutinas;
        console.log("RESULTADO DE LAS RUTINAS FILTRADAS: ", this.rutinas);
      });
  }

  goCrearRutina() {
    this.router.navigate(['/crear-rutina']);
  }

}
