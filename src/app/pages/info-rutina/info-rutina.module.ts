import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoRutinaPageRoutingModule } from './info-rutina-routing.module';

import { InfoRutinaPage } from './info-rutina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoRutinaPageRoutingModule
  ],
  declarations: [InfoRutinaPage]
})
export class InfoRutinaPageModule {}
