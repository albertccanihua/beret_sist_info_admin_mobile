import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePatientPageRoutingModule } from './create-patient-routing.module';

import { CreatePatientPage } from './create-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePatientPageRoutingModule
  ],
  declarations: [CreatePatientPage]
})
export class CreatePatientPageModule {}
