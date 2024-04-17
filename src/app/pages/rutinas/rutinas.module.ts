import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutinasPageRoutingModule } from './rutinas-routing.module';

import { RutinasPage } from './rutinas.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutinasPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RutinasPage]
})
export class RutinasPageModule {}
