import { NgModule } from '@angular/core';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    SharedModule,
    LandingPageRoutingModule,
    SwiperModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
