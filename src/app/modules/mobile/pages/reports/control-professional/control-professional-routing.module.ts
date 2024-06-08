import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlProfessionalPage } from './control-professional.page';

const routes: Routes = [
  {
    path: '',
    component: ControlProfessionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlProfessionalPageRoutingModule {}
