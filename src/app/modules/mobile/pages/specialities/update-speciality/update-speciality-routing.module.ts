import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSpecialityPage } from './update-speciality.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSpecialityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSpecialityPageRoutingModule {}
