import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth'; // Para autenticación
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Firestore
import { provideAnalytics, getAnalytics, ScreenTrackingService } from '@angular/fire/analytics'; // Analytics opcional
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule,
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Inicialización de Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()), // Servicio de autenticación
    provideFirestore(() => getFirestore()), // Firestore
    provideAnalytics(() => getAnalytics()), // Analytics (opcional)
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
