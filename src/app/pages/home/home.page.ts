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

  // Variable for the background.
  fondo: string = "";

  /**
  * Class constructor.
  * 
  * @param auth Authentication service used to manage user authentication.
  * @param router The router used for navigation within the application.
  * @param rutinaSvc Service used for routine management.
  * @param citasSvc Service used for appointment management.
  * @param userSvc Service used for user management.
  * @param backgroundSvc Service used to manage the application's background.
  * @param modal Controller used to create and manage modalities within the application.
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
  * Method called after Angular initializes the components of the class.
  * It subscribes to the authentication service to get information about the authenticated user.
  * It also subscribes to the routine, appointment, and user management services to receive updates.
  * It initializes the application's background and loads filtered data depending on the logged-in user.
  */
  ngOnInit() {
    // Callback function to handle the closure of the loading modal.
    var onDismiss = (result:any)=>{
      console.log("Resultado del modal: ", result)
    }
    // Display loading modal.
    this.modalLoading(onDismiss)
    this.rutinaSvc.subscribeToRutinaCollection();
    this.userSvc.subscribeToUsersCollection();
    this.citasSvc.subscribeToCitasCollection();
    // Get information about the authenticated user.
    this.auth.me().subscribe(_ => {
      console.log("Usuario logeado "+ _.uuid);
      this.user = _;
      // Filter and load data related to the appointments and routines of the logged-in user.
      this.citasFiltered(_.uuid);
      this.rutinasFiltered(_.uuid);
      this.backgroundSvc.setBackground(_.fondo);
    })
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });
  }

  // Variable to store the user data.
  user: any

  // List of private routines.
  rutinas: Rutina[] = [];

  /**
  * Filters the current user's routines based on the current day and active status.
  * 
  * @param uuid The unique identifier of the current user.
  */
  rutinasFiltered(uuid: string) {
    // Get the current day in Spanish.
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const today = days[new Date().getDay()];
    console.log("Día actual: ", today);
    // Filter the routines.
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

  // List of exercises.
  exercises: any[] = [];

  // List of private routines.
  citas: Cita[] = [];

  /**
  * Filters the current user's appointments based on the status, the person in charge, and the date of the appointment.
  * 
  * @param uuid The unique identifier of the current user.
  */
  citasFiltered(uuid: string) {
    // Combine the data sources of appointments and users to filter the appointments.
      combineLatest([this.citasSvc.citas$, this.userSvc.users$]).pipe(
        map(([citas, users]) => 
          citas
            // Filter the current user's appointments that are accepted and whose appointment date is after the current date.
            .filter(cita => cita?.encargadoUuid == uuid && cita?.estado == 'aceptado' && cita?.fechaCita.toDate() > new Date()).map(cita => {
              const user = users.find(user => user.uuid === cita.userUUID);
              return {
                ...cita,
                clienteFoto: user?.imageUrl ? user?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51"
              };
            })
        )
      ).subscribe(filteredCitas => {
        // Assign the filtered appointments to the appointments array and log the result to the console.
        this.citas = filteredCitas;
        console.log("RESULTADO DE LAS CITAS FILTRADAS: ", this.citas);
      });
  }

  /**
  * Gets the formatted date and time from a Timestamp object and determines whether the appointment is past or not.
  * 
  * @param timestamp The Timestamp object representing the date and time of the appointment.
  * @returns An object containing the formatted date and time and an indicator of whether the appointment is past or not.
  */
  getCitaDate(timestamp: Timestamp): { fechaFormateada: string, pasada: boolean } {
    const citaDate = timestamp.toDate();
    const currentDate = new Date();
    const pasada = citaDate < currentDate;
    const fechaFormateada = citaDate.toLocaleString();
    return { fechaFormateada, pasada };
  }

  /**
  * Redirects the user to the routines page.
  */
  goRutinas() {
    this.router.navigate(['/rutinas']);
  }

  /**
  * Opens a loading modal and waits for it to close to execute the specified action.
  * @param onDismiss The action to execute when the modal closes.
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
