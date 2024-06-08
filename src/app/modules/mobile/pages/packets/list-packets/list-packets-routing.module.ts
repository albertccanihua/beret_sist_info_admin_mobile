import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPacketsPage } from './list-packets.page';

const routes: Routes = [
  {
    path: '',
    component: ListPacketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPacketsPageRoutingModule {}
