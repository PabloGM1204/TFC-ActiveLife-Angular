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

  // Variable para el fondo
  fondo: string = "";

  /**
  * Constructor de la clase.
  * 
  * @param auth Servicio de autenticación utilizado para gestionar la autenticación de usuarios.
  * @param router El enrutador utilizado para la navegación dentro de la aplicación.
  * @param rutinaSvc Servicio utilizado para la gestión de rutinas.
  * @param citasSvc Servicio utilizado para la gestión de citas.
  * @param userSvc Servicio utilizado para la gestión de usuarios.
  * @param backgroundSvc Servicio utilizado para gestionar el fondo de la aplicación.
  * @param modal Controlador utilizado para crear y gestionar modalidades dentro de la aplicación.
  */
  constructor(
    public auth: AuthService,
    private router: Router,
    private rutinaSvc: RutinaService,
    public citasSvc: CitasService,
    private userSvc: UsersService,
    private backgroundSvc: BackgroundService,
    private modal: ModalController
  ) {}

  /**
  * Método llamado después de que Angular inicializa los componentes de la clase.
  * Se suscribe al servicio de autenticación para obtener información sobre el usuario autenticado.
  * También se suscribe a los servicios de gestión de rutinas, citas y usuarios para recibir actualizaciones.
  * Inicializa el fondo de la aplicación y carga datos filtrados dependiendo del usuario logueado.
  */
  ngOnInit() {
    // Función de callback para manejar el cierre del modal del modal de carga
    var onDismiss = (result:any)=>{
      console.log("Resultado del modal: ", result)
    }
    // Mostrar modal de carga
    this.modalLoading(onDismiss)
    this.rutinaSvc.subscribeToRutinaCollection();
    this.userSvc.subscribeToUsersCollection();
    this.citasSvc.subscribeToCitasCollection();
    // Obtener información sobre el usuario autenticado
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.user = _;
      // Filtrar y cargar datos relacionados con las citas y las rutinas del usuario logueado
      this.citasFiltered(_.uuid);
      this.rutinasFiltered(_.uuid);
      this.backgroundSvc.setBackground(_.fondo);
    })
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  // Variable para guardar los datos del usuario
  user: any

  // Lista de rutinas privadas
  rutinas: Rutina[] = [];

  /**
  * Filtra las rutinas del usuario actual basándose en el día actual y el estado de activo.
  * 
  * @param uuid El identificador único del usuario actual.
  */
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

  /**
  * Filtra las citas del usuario actual basándose en el estado, el encargado y la fecha de la cita.
  * 
  * @param uuid El identificador único del usuario actual.
  */
  citasFiltered(uuid: string) {
    // Combinar las fuentes de datos de citas y usuarios para filtrar las citas
      combineLatest([this.citasSvc.citas$, this.userSvc.users$]).pipe(
        map(([citas, users]) => 
          citas
            // Filtrar las citas del usuario actual que están aceptadas y cuya fecha de cita es posterior a la actual
            .filter(cita => cita?.encargadoUuid == uuid && cita?.estado == 'aceptado' && cita?.fechaCita.toDate() > new Date()).map(cita => {
              const user = users.find(user => user.uuid === cita.userUUID);
              return {
                ...cita,
                clienteFoto: user?.imageUrl ? user?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51"
              };
            })
        )
      ).subscribe(filteredCitas => {
        // Asignar las citas filtradas al arreglo de citas y registrar el resultado en la consola
        this.citas = filteredCitas;
        console.log("RESULTADO DE LAS CITAS FILTRADAS: ", this.citas);
      });
  }

  /**
  * Obtiene la fecha y hora formateada de un objeto Timestamp y determina si la cita es pasada o no.
  * 
  * @param timestamp El objeto Timestamp que representa la fecha y hora de la cita.
  * @returns Un objeto que contiene la fecha y hora formateada y un indicador de si la cita es pasada o no.
  */
  getCitaDate(timestamp: Timestamp): { fechaFormateada: string, pasada: boolean } {
    const citaDate = timestamp.toDate(); // Convierte el Timestamp a un objeto Date
    const currentDate = new Date(); // Fecha y hora actuales
    const pasada = citaDate < currentDate;  // Comprueba si la fecha es anterior a la actual
    // Formatea la fecha y hora
    const fechaFormateada = citaDate.toLocaleString(); // Devuelve una cadena con la fecha y hora formateada

    // Devuelve la fecha formateada y un indicador de si la cita es pasada o no
    return { fechaFormateada, pasada };
  }

  /**
  * Redirige al usuario a la página de rutinas.
  */
  goRutinas() {
    this.router.navigate(['/rutinas']);
  }

  /**
  * Abre un modal de carga y espera a que se cierre para ejecutar la acción especificada.
  * @param onDismiss La acción a ejecutar cuando se cierre el modal.
  */
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
