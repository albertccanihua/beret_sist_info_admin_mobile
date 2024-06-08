import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewManagementTypePage } from './view-management-type.page';

const routes: Routes = [
  {
    path: '',
    component: ViewManagementTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewManagementTypePageRoutingModule {}
