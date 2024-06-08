import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateManagementTypePageRoutingModule } from './update-management-type-routing.module';

import { UpdateManagementTypePage } from './update-management-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateManagementTypePageRoutingModule
  ],
  declarations: [UpdateManagementTypePage]
})
export class UpdateManagementTypePageModule {}
