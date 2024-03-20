import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  activateChange: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  // Método para cambiar entre el componente de Login y Registro
  changeComponent(){
    this.activateChange = !this.activateChange
  }

}
