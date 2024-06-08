import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadDataViewPageRoutingModule } from './upload-data-view-routing.module';

import { UploadDataViewPage } from './upload-data-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadDataViewPageRoutingModule
  ],
  declarations: [UploadDataViewPage]
})
export class UploadDataViewPageModule {}
