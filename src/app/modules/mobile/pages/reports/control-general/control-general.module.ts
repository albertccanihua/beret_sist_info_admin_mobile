import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlGeneralPageRoutingModule } from './control-general-routing.module';

import { ControlGeneralPage } from './control-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlGeneralPageRoutingModule
  ],
  declarations: [ControlGeneralPage]
})
export class ControlGeneralPageModule {}
