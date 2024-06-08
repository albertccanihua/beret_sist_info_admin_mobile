import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePacketPage } from './update-packet.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePacketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePacketPageRoutingModule {}
