import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
    HomeComponent,
    UsersComponent,
    PatientsComponent,
    ReportsComponent,
    ConfigurationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsPageModule { }
