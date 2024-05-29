import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardExerciseComponent } from './components/card-exercise/card-exercise.component';
import { DetalleExerciseComponent } from './components/detalle-exercise/detalle-exercise.component';
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component';

import { ToastModule } from 'primeng/toast';
import { CardRutineComponent } from './components/card-rutine/card-rutine.component';
import { TruncamientoPipe } from './pipes/truncamiento.pipe';
import { ModalCitaComponent } from './components/modal-cita/modal-cita.component';
import { PrimeraLetraMayusPipe } from './pipes/primera-letra-mayus.pipe';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/translate/translate';
import { AgrandarDirective } from './directives/agrandar.directive';


@NgModule({
  declarations: [
    // Directives
    AgrandarDirective,

    // Pipes
    TruncamientoPipe,
    PrimeraLetraMayusPipe,

    // Componentes
    CardExerciseComponent,
    DetalleExerciseComponent,
    AddExerciseComponent,
    CardRutineComponent,
    ModalCitaComponent,
    ModalConfirmComponent,
    AgrandarDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    // Modulos
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ToastModule,
    TranslateModule,
    // Componentes
    CardExerciseComponent,
    DetalleExerciseComponent,
    AddExerciseComponent,
    CardRutineComponent,
    ModalCitaComponent,
    ModalConfirmComponent,
    // Directivas
    AgrandarDirective,
    // Pipes
    TruncamientoPipe,
    PrimeraLetraMayusPipe
  ]
})
export class SharedModule { }
