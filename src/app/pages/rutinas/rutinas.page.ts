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

  // Lista de rutinas privadas
  rutinas: Rutina[] = [];

  // Lista de rutinas publicas
  rutinasPublic: Rutina[] = [];

  // Usuario
  user: any;

  ngOnInit() {
    this.rutinaSvc.subscribeToRutinaCollection();
    this.auth.me().subscribe(_ => {
      this.user = _;
      console.log("Usuario logeado "+ _.uuid);
      this.rutinasFiltered(_.uuid);
      this.rutinasFilteredByPublic();
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

  // Filtrar las rutinas por las que son publicas
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

  // Método para activar las rutinas privadas
  privateRutines(){
    this.publicRutine = false;
  }

  // Método para activar las rutinas publicas
  publicRutines(){
    this.publicRutine = true;
  }

  // Método para eliminar una rutina
  deleteRutine(rutina: Rutina){
    console.log("Eliminar rutina: ", rutina);
    this.rutinaSvc.deleteRutina(rutina);
  }

  // Método para ir a crear una rutina
  goCrearRutina() {
    this.router.navigate(['/crear-rutina']);
  }

  // Método para copiar una rutina
  copyExercise(rutina: any) {
    console.log('copiar rutina', rutina);
    let _rutina = {
      ...rutina,
      userUUID: this.user.uuid,
      public: false
    }
    this.rutinaSvc.copyRutina(_rutina);
  }

}
