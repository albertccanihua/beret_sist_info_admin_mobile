import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSpecialityPageRoutingModule } from './create-speciality-routing.module';

import { CreateSpecialityPage } from './create-speciality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSpecialityPageRoutingModule
  ],
  declarations: [CreateSpecialityPage]
})
export class CreateSpecialityPageModule {}
