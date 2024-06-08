import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePatientPage } from './create-patient.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePatientPageRoutingModule {}
