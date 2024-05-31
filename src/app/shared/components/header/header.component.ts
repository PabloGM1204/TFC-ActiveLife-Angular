import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  /**
  * Entrada del usuario que se mostrará en el componente.
  */
  @Input() user: any | undefined;

  constructor( private router: Router ) { }

  ngOnInit() {}

  /**
  * Redirige a la página de perfil del usuario.
  */
  onProfile(){
    this.router.navigate(['/profile'])
  }

}
