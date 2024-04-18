import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearRutinaPageRoutingModule } from './crear-rutina-routing.module';

import { CrearRutinaPage } from './crear-rutina.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CrearRutinaPageRoutingModule
  ],
  declarations: [CrearRutinaPage]
})
export class CrearRutinaPageModule {}
