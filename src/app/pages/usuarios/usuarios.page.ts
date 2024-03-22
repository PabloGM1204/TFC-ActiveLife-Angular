import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  constructor(
    public userSvc: UsersService
  ) { }

  ngOnInit() {
    this.userSvc.subscribeToUsersCollection();
  }

  accept(user: User){
    console.log("Aceptar usuario: ", user)
    this.userSvc.acceptUser(user)
  }

}
