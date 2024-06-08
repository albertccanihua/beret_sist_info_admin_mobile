import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { authGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [authGuard],
        component: HomeComponent
      },
      {
        path: 'users',
        canActivate: [authGuard],
        component: UsersComponent
      },
      {
        path: 'patients',
        canActivate: [authGuard],
        component: PatientsComponent
      },
      {
        path: 'reports',
        canActivate: [authGuard],
        component: ReportsComponent
      },
      {
        path: 'configuration',
        canActivate: [authGuard],
        component: ConfigurationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
