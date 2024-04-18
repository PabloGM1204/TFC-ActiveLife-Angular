import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearRutinaPageRoutingModule } from './crear-rutina-routing.module';

import { CrearRutinaPage } from './crear-rutina.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    SharedModule,
    CrearRutinaPageRoutingModule
  ],
  declarations: [CrearRutinaPage],
  providers: [
    MessageService // Añade MessageService como un proveedor aquí
  ]
})
export class CrearRutinaPageModule {}
