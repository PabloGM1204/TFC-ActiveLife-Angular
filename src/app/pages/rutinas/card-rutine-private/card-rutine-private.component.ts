import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from 'src/app/core/interfaces/rutina';

@Component({
  selector: 'app-card-rutine-private',
  templateUrl: './card-rutine-private.component.html',
  styleUrls: ['./card-rutine-private.component.scss'],
})
export class CardRutinePrivateComponent  implements OnInit {

  @Input() rutina: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  editRutine(){
    console.log("Editar rutina: ", this.rutina);
    this.router.navigate(['/info-rutina', this.rutina.id]);
  }

}
