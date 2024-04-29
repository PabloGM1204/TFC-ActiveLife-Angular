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



@NgModule({
  declarations: [
    // Directives

    // Pipes
    TruncamientoPipe,

    // Componentes
    CardExerciseComponent,
    DetalleExerciseComponent,
    AddExerciseComponent,
    CardRutineComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  exports: [
    // Modulos
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ToastModule,
    // Componentes
    CardExerciseComponent,
    DetalleExerciseComponent,
    AddExerciseComponent,
    CardRutineComponent,
    // Directivas

    // Pipes
    TruncamientoPipe
  ]
})
export class SharedModule { }
