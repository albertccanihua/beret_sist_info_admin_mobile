import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPatientPageRoutingModule } from './view-patient-routing.module';

import { ViewPatientPage } from './view-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPatientPageRoutingModule
  ],
  declarations: [ViewPatientPage]
})
export class ViewPatientPageModule {}
