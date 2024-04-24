import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoRutinaPageRoutingModule } from './info-rutina-routing.module';

import { InfoRutinaPage } from './info-rutina.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';
import { ExercisePrivateComponent } from './components/exercise-private/exercise-private.component';
import { ModalExerciseComponent } from './components/modal-exercise/modal-exercise.component';


@NgModule({
  imports: [
    SharedModule,
    InfoRutinaPageRoutingModule
  ],
  declarations: [InfoRutinaPage, ExercisePrivateComponent, ModalExerciseComponent],
  providers: [
    MessageService // Añade MessageService como un proveedor aquí
  ]
})
export class InfoRutinaPageModule {}
