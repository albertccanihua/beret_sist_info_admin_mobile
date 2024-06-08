import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateManagementTypePage } from './create-management-type.page';

const routes: Routes = [
  {
    path: '',
    component: CreateManagementTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateManagementTypePageRoutingModule {}
