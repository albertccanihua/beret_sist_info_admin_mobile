import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlGeneralPage } from './control-general.page';

const routes: Routes = [
  {
    path: '',
    component: ControlGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlGeneralPageRoutingModule {}
