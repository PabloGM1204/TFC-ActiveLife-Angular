import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from 'src/app/core/interfaces/rutina';

@Component({
  selector: 'app-card-rutine-private',
  templateUrl: './card-rutine-private.component.html',
  styleUrls: ['./card-rutine-private.component.scss'],
})
export class CardRutinePrivateComponent  implements OnInit {

  /**
  * Entrada: La rutina que se mostrará en el componente.
  * Salida: Se emite cuando se solicita eliminar la rutina.
  */
  @Input() rutina: any;

  /**
  * Salida: Se emite cuando se solicita eliminar la rutina.
  */
  @Output() deleteRutina: EventEmitter<any> = new EventEmitter<any>();
  
  /**
  * Salida: Se emite cuando se solicita cambiar la rutina.
  */
  @Output() changeRutina: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  /**
  * Método para editar la rutina.
  * Navega a la página de información de la rutina para su edición.
  */
  editRutine(){
    console.log("Editar rutina: ", this.rutina);
    this.router.navigate(['/info-rutina', this.rutina.id]);
  }

  /**
  * Método para eliminar la rutina.
  * Emite un evento para notificar la eliminación de la rutina.
  */
  deleteRutine(){
    console.log("Eliminar rutina: ", this.rutina);
    this.deleteRutina.emit(this.rutina);
  }

  /**
  * Método para cambiar el estado de la rutina.
  * Emite un evento para notificar el cambio de estado de la rutina.
  * @param rutina La rutina que se va a cambiar de estado.
  */
  toggleChange(rutina: any) {
    console.log("Cambiar rutina: ", rutina);
    this.changeRutina.emit(rutina);
  }

}
