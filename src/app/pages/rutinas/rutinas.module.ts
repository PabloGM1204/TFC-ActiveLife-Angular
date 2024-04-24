import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutinasPageRoutingModule } from './rutinas-routing.module';

import { RutinasPage } from './rutinas.page';
import { HttpClientModule } from '@angular/common/http';
import { CardRutinePrivateComponent } from './card-rutine-private/card-rutine-private.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RutinasPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RutinasPage, CardRutinePrivateComponent]
})
export class RutinasPageModule {}
