import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePacketPage } from './create-packet.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePacketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePacketPageRoutingModule {}
