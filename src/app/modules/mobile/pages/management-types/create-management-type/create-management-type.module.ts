import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateManagementTypePageRoutingModule } from './create-management-type-routing.module';

import { CreateManagementTypePage } from './create-management-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateManagementTypePageRoutingModule
  ],
  declarations: [CreateManagementTypePage]
})
export class CreateManagementTypePageModule {}
