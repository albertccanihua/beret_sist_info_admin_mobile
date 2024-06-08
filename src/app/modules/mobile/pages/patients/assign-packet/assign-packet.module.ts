import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignPacketPageRoutingModule } from './assign-packet-routing.module';

import { AssignPacketPage } from './assign-packet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignPacketPageRoutingModule
  ],
  declarations: [AssignPacketPage]
})
export class AssignPacketPageModule {}
