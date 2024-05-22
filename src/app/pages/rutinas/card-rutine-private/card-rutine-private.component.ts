import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from 'src/app/core/interfaces/rutina';

@Component({
  selector: 'app-card-rutine-private',
  templateUrl: './card-rutine-private.component.html',
  styleUrls: ['./card-rutine-private.component.scss'],
})
export class CardRutinePrivateComponent  implements OnInit {

  @Input() rutina: any;
  @Output() deleteRutina: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeRutina: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  editRutine(){
    console.log("Editar rutina: ", this.rutina);
    this.router.navigate(['/info-rutina', this.rutina.id]);
  }

  deleteRutine(){
    console.log("Eliminar rutina: ", this.rutina);
    this.deleteRutina.emit(this.rutina);
  }

  toggleChange(rutina: any) {
    console.log("Cambiar rutina: ", rutina);
    this.changeRutina.emit(rutina);
  }

}
