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
  declarations: [AppComponent],
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

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
