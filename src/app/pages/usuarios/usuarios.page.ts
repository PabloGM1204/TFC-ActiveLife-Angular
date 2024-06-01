import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { BackgroundService } from 'src/app/core/services/background.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  // Variable to store the background of the page.
  fondo: string = "";

  // Variable for the search term.
  searchTerm: string = '';

  // Observable of filtered users.
  filteredUsers$!: Observable<any[]>;

  // Variable for the state of the admin checkbox.
  showAdminsOnly: boolean = false;
  showNonAdminsOnly: boolean = false;

  /**
  * Component's constructor.
  * @param userSvc User service to handle user information.
  * @param modal Modal controller to open and manage modals.
  * @param backgroundSvc Background service to manage the component's background.
  */
  constructor(
    public userSvc: UsersService,
    private modal: ModalController,
    private backgroundSvc: BackgroundService,
  ) { }

  /**
  * Method that runs when the component is initialized.
  * Subscribes to the user service to get the collection of users.
  * Subscribes to the background service to update the component's background.
  */
  ngOnInit() {
    this.userSvc.subscribeToUsersCollection();
    this.backgroundSvc.background$.subscribe(fondo => {
      this.fondo = fondo;
    });

    // Initialize the observable of filtered users.
    this.filteredUsers$ = combineLatest([
      this.userSvc.users$,
      this.userSvc.users$.pipe(startWith(''))
    ]).pipe(
      map(([users]) => this.filterUsers(users))
    );
  }

  /**
  * Filters a list of users according to the search term and display options.
  * @param users - The list of users to filter.
  * @returns The list of users filtered according to the search term and display options.
  */
  filterUsers(users: User[]): User[] {
    let filteredUsers = users;
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower)
      );
    }
    if (this.showAdminsOnly) {
      filteredUsers = filteredUsers.filter(user => user.admin);
    } else if (this.showNonAdminsOnly) {
      filteredUsers = filteredUsers.filter(user => !user.admin);
    }
    return filteredUsers;
  }

  /**
  * Updates the list of filtered users when the search term changes.
  */
  onSearchTermChanged() {
    this.filteredUsers$ = combineLatest([
      this.userSvc.users$,
      this.userSvc.users$.pipe(startWith(''))
    ]).pipe(
      map(([users]) => this.filterUsers(users))
    );
  }

  /**
  * Handles the change in the state of the admin checkbox.
  * If only admins are being shown, it deactivates the option to show non-admins.
  * Updates the list of filtered users according to the changes in the checkbox state.
  */
  onAdminCheckboxChanged() {
    if (this.showAdminsOnly) {
      this.showNonAdminsOnly = false;
    }
    this.filteredUsers$ = combineLatest([
      this.userSvc.users$,
      this.userSvc.users$.pipe(startWith(''))
    ]).pipe(
      map(([users]) => this.filterUsers(users))
    );
  }

  /**
  * Handles the change in the state of the non-admin checkbox.
  * If only non-admins are being shown, it deactivates the option to show admins.
  * Updates the list of filtered users according to the changes in the checkbox state.
  */
  onNonAdminCheckboxChanged() {
    if (this.showNonAdminsOnly) {
      this.showAdminsOnly = false;
    }
    this.filteredUsers$ = combineLatest([
      this.userSvc.users$,
      this.userSvc.users$.pipe(startWith(''))
    ]).pipe(
      map(([users]) => this.filterUsers(users))
    );
  }

  /**
  * Method to accept a user.
  * 
  * @param user The user who is going to be accepted.
  */
  accept(user: User){
    console.log("Aceptar usuario: ", user)
    this.userSvc.acceptUser(user)
  }

  /**
  * Method to delete a user.
  * 
  * @param user The user who is going to be deleted.
  */
  deleteUser(user: User){
    var onDismiss = (result:any)=>{
      console.log("Resultado del modal: ", result)
      if(result.data){
        console.log("Eliminar usuario: ", user)
        this.userSvc.deleteUser(user)
      } else {
        console.log("Cancelar borrado")
      }
    }
    this.modalConfirm(onDismiss)
  }

  /**
  * Method to display a confirmation modal.
  * 
  * @param onDismiss Function that runs when the modal is closed, receives the result of the modal as a parameter.
  */
  async modalConfirm(onDismiss:(result:any)=>void){
    const modal = await this.modal.create({
      component: ModalConfirmComponent,
      cssClass:"modal-boton"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

}
