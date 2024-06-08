import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePacketPageRoutingModule } from './create-packet-routing.module';

import { CreatePacketPage } from './create-packet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePacketPageRoutingModule
  ],
  declarations: [CreatePacketPage]
})
export class CreatePacketPageModule {}
