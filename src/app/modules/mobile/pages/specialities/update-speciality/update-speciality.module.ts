import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSpecialityPageRoutingModule } from './update-speciality-routing.module';

import { UpdateSpecialityPage } from './update-speciality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSpecialityPageRoutingModule
  ],
  declarations: [UpdateSpecialityPage]
})
export class UpdateSpecialityPageModule {}
