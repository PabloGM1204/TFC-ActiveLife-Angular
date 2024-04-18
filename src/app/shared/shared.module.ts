import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardExerciseComponent } from './components/card-exercise/card-exercise.component';
import { DetalleExerciseComponent } from './components/detalle-exercise/detalle-exercise.component';
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component';



@NgModule({
  declarations: [
    // Directives

    // Pipes

    // Componentes
    CardExerciseComponent,
    DetalleExerciseComponent,
    AddExerciseComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // Modulos
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    // Componentes
    CardExerciseComponent,
    DetalleExerciseComponent,
    AddExerciseComponent
    // Directivas

    // Pipes
  ]
})
export class SharedModule { }
