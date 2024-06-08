import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowUpPageRoutingModule } from './follow-up-routing.module';

import { FollowUpPage } from './follow-up.page';
import { TypeheadComponent } from '../../../components/typehead/typehead.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowUpPageRoutingModule,
  ],
  declarations: [
    FollowUpPage,
    TypeheadComponent
  ]
})
export class FollowUpPageModule { }
