import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardExerciseComponent } from './components/card-exercise/card-exercise.component';



@NgModule({
  declarations: [
    // Directives

    // Pipes

    // Componentes
    CardExerciseComponent
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
    CardExerciseComponent
    // Directivas

    // Pipes
  ]
})
export class SharedModule { }
