import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPacketPage } from './view-packet.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPacketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPacketPageRoutingModule {}
