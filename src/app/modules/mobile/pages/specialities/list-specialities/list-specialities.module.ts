import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSpecialitiesPageRoutingModule } from './list-specialities-routing.module';

import { ListSpecialitiesPage } from './list-specialities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSpecialitiesPageRoutingModule
  ],
  declarations: [ListSpecialitiesPage]
})
export class ListSpecialitiesPageModule {}
