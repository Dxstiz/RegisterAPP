import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

// Local Storage
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers, Storage } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicStorageModule.forRoot({
      name: 'mybd',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule,
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 

    provideFirebaseApp(() => initializeApp({"projectId":"registerapp-82165","appId":"1:601342409122:web:c4ea93123dee0d42d25afb","storageBucket":"registerapp-82165.appspot.com","apiKey":"AIzaSyAIgjinoNa0ZPUpWkNBtqA0wXUulGykPRw","authDomain":"registerapp-82165.firebaseapp.com","messagingSenderId":"601342409122","measurementId":"G-P46KTFDR10"})), 
    provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, 
    provideFirestore(() => getFirestore()), provideStorage(() => getStorage()),],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
