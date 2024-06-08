import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePacketPageRoutingModule } from './update-packet-routing.module';

import { UpdatePacketPage } from './update-packet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePacketPageRoutingModule
  ],
  declarations: [UpdatePacketPage]
})
export class UpdatePacketPageModule {}
