import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadDataListPage } from './upload-data-list.page';

const routes: Routes = [
  {
    path: '',
    component: UploadDataListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadDataListPageRoutingModule {}
