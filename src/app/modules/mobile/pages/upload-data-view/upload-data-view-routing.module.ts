import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadDataViewPage } from './upload-data-view.page';

const routes: Routes = [
  {
    path: '',
    component: UploadDataViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadDataViewPageRoutingModule {}
