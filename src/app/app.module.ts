import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtService } from './core/services/auth/jwt.service';
import { FirebaseService } from './core/services/firebase/firebase.service';
import { FirebaseAuthService } from './core/services/firebase/firebase-auth.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MediaService } from './core/services/media.service';
import { ApiService } from './core/services/api.service';
import { FirebaseMediaService } from './core/services/firebase/firebase-media.service';
import { InfoTooltipComponent } from './shared/components/info-tooltip/info-tooltip.component';

export function MediaServiceFactory(
  backend:string,
  api:ApiService,
  firebase:FirebaseService){
    switch(backend){
      case 'Firebase':
        return new FirebaseMediaService(firebase)
      default:
        throw new Error("Not implemented");
    }
}

export function AuthServiceFactory(
  backend:string,
  firebase:FirebaseService
) {
    switch(backend){
      case 'Firebase':
        return new FirebaseAuthService(firebase);
      default:
        throw new Error("Not implemented");
    }
}

@NgModule({
  declarations: [AppComponent, InfoTooltipComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: 'firebase-config',
      useValue:environment.firebase
    },
    {
      provide: 'backend',
      useValue:'Firebase'
    },
    {
      provide: AuthService,
      deps: ['backend', FirebaseService],
      useFactory: AuthServiceFactory,  
    },
    {
      provide: MediaService,
      deps: ['backend', ApiService, FirebaseService],
      useFactory: MediaServiceFactory,  
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
