import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateManagementTypePage } from './update-management-type.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateManagementTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateManagementTypePageRoutingModule {}
