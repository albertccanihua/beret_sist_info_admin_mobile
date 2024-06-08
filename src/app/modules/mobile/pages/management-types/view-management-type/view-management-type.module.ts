import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewManagementTypePageRoutingModule } from './view-management-type-routing.module';

import { ViewManagementTypePage } from './view-management-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewManagementTypePageRoutingModule
  ],
  declarations: [ViewManagementTypePage]
})
export class ViewManagementTypePageModule {}
