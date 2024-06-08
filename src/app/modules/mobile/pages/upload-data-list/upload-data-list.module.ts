import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadDataListPageRoutingModule } from './upload-data-list-routing.module';

import { UploadDataListPage } from './upload-data-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadDataListPageRoutingModule
  ],
  declarations: [UploadDataListPage]
})
export class UploadDataListPageModule {}
