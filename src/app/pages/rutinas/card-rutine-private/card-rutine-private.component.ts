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
  * The routine that will be displayed in the component.
  */
  @Input() rutina: any;

  /**
  * Output: It is emitted when the routine is requested to be deleted.
  */
  @Output() deleteRutina: EventEmitter<any> = new EventEmitter<any>();
  
 /**
  * Output: It is emitted when a change in the routine is requested.
  */
  @Output() changeRutina: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  /**
  * Method to edit the routine.
  * Navigates to the routine information page for its editing.
  */
  editRutine(){
    console.log("Editar rutina: ", this.rutina);
    this.router.navigate(['/info-rutina', this.rutina.id]);
  }

  /**
  * Method to delete the routine.
  * Emits an event to notify the routine's deletion.
  */
  deleteRutine(){
    console.log("Eliminar rutina: ", this.rutina);
    this.deleteRutina.emit(this.rutina);
  }

  /**
  * Method to change the status of the routine.
  * Emits an event to notify the change of status of the routine.
  * @param rutina The routine that is going to be changed in status.
  */
  toggleChange(rutina: any) {
    console.log("Cambiar rutina: ", rutina);
    this.changeRutina.emit(rutina);
  }

}
