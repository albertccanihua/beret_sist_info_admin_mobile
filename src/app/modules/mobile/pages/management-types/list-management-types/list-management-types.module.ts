import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListManagementTypesPageRoutingModule } from './list-management-types-routing.module';

import { ListManagementTypesPage } from './list-management-types.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListManagementTypesPageRoutingModule
  ],
  declarations: [ListManagementTypesPage]
})
export class ListManagementTypesPageModule {}
