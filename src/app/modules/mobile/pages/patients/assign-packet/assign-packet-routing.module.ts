import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignPacketPage } from './assign-packet.page';

const routes: Routes = [
  {
    path: '',
    component: AssignPacketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignPacketPageRoutingModule {}
