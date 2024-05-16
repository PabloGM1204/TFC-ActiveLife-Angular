import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() user: any | undefined;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  // Metodo para ir al perfil
  onProfile(){
    this.router.navigate(['/profile'])
  }

}
