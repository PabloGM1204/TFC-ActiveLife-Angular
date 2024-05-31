import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { combineLatest, map } from 'rxjs';
import { Cita } from 'src/app/core/interfaces/cita';
import { Rutina } from 'src/app/core/interfaces/rutina';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BackgroundService } from 'src/app/core/services/background.service';
import { CitasService } from 'src/app/core/services/citas.service';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { RutinaService } from 'src/app/core/services/rutina.service';
import { UsersService } from 'src/app/core/services/users.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  fondo: string = "";

  constructor(
    public auth: AuthService,
    private router: Router,
    private rutinaSvc: RutinaService,
    public citasSvc: CitasService,
    private userSvc: UsersService,
    private backgroundSvc: BackgroundService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    var onDismiss = (result:any)=>{
      console.log("Resultado del modal: ", result)
    }
    this.modalLoading(onDismiss)
    this.rutinaSvc.subscribeToRutinaCollection();
    this.userSvc.subscribeToUsersCollection();
    this.citasSvc.subscribeToCitasCollection();
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.user = _;
      this.citasFiltered(_.uuid);
      this.rutinasFiltered(_.uuid);
      this.backgroundSvc.setBackground(_.fondo);
    })
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  ionViewDidEnter() {
    //console.log("Valor de la rutina ", this.rutinas, "Valor de la distancia ", this.rutinas.length);
    console.log("Valor del fondo ", this.fondo)
  }

  // Variable para guardar los datos del usuario
  user: any

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
      combineLatest([this.citasSvc.citas$, this.userSvc.users$]).pipe(
        map(([citas, users]) => 
          citas
            .filter(cita => cita?.encargadoUuid == uuid && cita?.estado == 'aceptado' && cita?.fechaCita.toDate() > new Date()).map(cita => {
              const user = users.find(user => user.uuid === cita.userUUID);
              return {
                ...cita,
                clienteFoto: user?.imageUrl ? user?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51"
              };
            })
        )
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

  // Método para redirigir a la página de rutinas
  goRutinas() {
    this.router.navigate(['/rutinas']);
  }


  async modalLoading(onDismiss:(result:any)=>void){
    const modal = await this.modal.create({
      component: LoadingComponent,
      cssClass:"modal-loading",
      backdropDismiss: false
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

}
