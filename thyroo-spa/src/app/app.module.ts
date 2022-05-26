// Core imports
import { NgModule } from '@angular/core';

// Custom imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';

// Firebase auth
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/auth-interceptor.service';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ServerErrorPageComponent } from './server-error-page/server-error-page.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { PolicyComponent } from './policy/policy.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FooterComponent } from './footer/footer.component';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      ServerErrorPageComponent,
      HowItWorksComponent,
      HelpCenterComponent,
      AboutComponent,
      NotFoundComponent,
      PolicyComponent,
      FooterComponent
   ],
   imports: [
      AppRoutingModule,
      BrowserAnimationsModule,
      SharedModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireDatabaseModule,
      AngularFireStorageModule,
      HttpClientModule
   ],
   providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
   }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
