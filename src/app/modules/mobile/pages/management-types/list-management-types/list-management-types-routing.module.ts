import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListManagementTypesPage } from './list-management-types.page';

const routes: Routes = [
  {
    path: '',
    component: ListManagementTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListManagementTypesPageRoutingModule {}
