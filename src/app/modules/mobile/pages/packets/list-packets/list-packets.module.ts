import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPacketsPageRoutingModule } from './list-packets-routing.module';

import { ListPacketsPage } from './list-packets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPacketsPageRoutingModule
  ],
  declarations: [ListPacketsPage]
})
export class ListPacketsPageModule {}
