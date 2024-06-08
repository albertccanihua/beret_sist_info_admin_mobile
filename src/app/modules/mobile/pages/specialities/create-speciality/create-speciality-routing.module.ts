import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSpecialityPage } from './create-speciality.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSpecialityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSpecialityPageRoutingModule {}
