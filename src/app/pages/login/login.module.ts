import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SwiperModule } from 'swiper/angular';
import { InfoModalComponent } from './components/info-modal/info-modal.component';


@NgModule({
  imports: [
    SharedModule,
    LoginPageRoutingModule,
    SwiperModule
  ],
  declarations: [
    LoginPage,
    LoginFormComponent,
    RegisterFormComponent,
    InfoModalComponent
  ]
})
export class LoginPageModule {}
