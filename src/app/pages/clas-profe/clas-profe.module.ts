import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasProfePageRoutingModule } from './clas-profe-routing.module';

import { ClasProfePage } from './clas-profe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasProfePageRoutingModule
  ],
  declarations: [ClasProfePage]
})
export class ClasProfePageModule {}
