import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtService } from './core/services/auth/jwt.service';
import { FirebaseService } from './core/services/firebase/firebase.service';
import { FirebaseAuthService } from './core/services/firebase/firebase-auth.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MediaService } from './core/services/media.service';
import { ApiService } from './core/services/api.service';
import { FirebaseMediaService } from './core/services/firebase/firebase-media.service';
import { InfoTooltipComponent } from './shared/components/info-tooltip/info-tooltip.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './core/translate/translate';
import { HttpClientProvider } from './core/services/http/http-client.provider';
import { HttpClientWebProvider } from './core/services/http/http-client-web.provider';

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

export function httpProviderFactory(http: HttpClient) {
  return new HttpClientWebProvider(http);
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
  declarations: [AppComponent, InfoTooltipComponent, HeaderComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
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
      provide: HttpClientProvider,
      deps: [HttpClient, Platform],
      useFactory: httpProviderFactory,
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
