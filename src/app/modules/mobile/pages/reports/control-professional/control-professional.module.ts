import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlProfessionalPageRoutingModule } from './control-professional-routing.module';

import { ControlProfessionalPage } from './control-professional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlProfessionalPageRoutingModule
  ],
  declarations: [ControlProfessionalPage]
})
export class ControlProfessionalPageModule {}
