import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { auth2Guard } from "src/app/auth2.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'tabs',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'users/create',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/users/create-user/create-user.module').then(m => m.CreateUserPageModule)
  },
  {
    path: 'users/update/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/users/update-user/update-user.module').then(m => m.UpdateUserPageModule)
  },
  {
    path: 'users/view/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/users/view-user/view-user.module').then(m => m.ViewUserPageModule)
  },
  {
    path: 'patients/create',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/patients/create-patient/create-patient.module').then(m => m.CreatePatientPageModule)
  },
  {
    path: 'patients/update/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/patients/update-patient/update-patient.module').then(m => m.UpdatePatientPageModule)
  },
  {
    path: 'patients/view/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/patients/view-patient/view-patient.module').then(m => m.ViewPatientPageModule)
  },
  {
    path: 'patients/assign-packet/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/patients/assign-packet/assign-packet.module').then(m => m.AssignPacketPageModule)
  },
  {
    path: 'patients/view-treatment/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/patients/view-treatment/view-treatment.module').then(m => m.ViewTreatmentPageModule)
  },
  {
    path: 'packets/list',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/packets/list-packets/list-packets.module').then(m => m.ListPacketsPageModule)
  },
  {
    path: 'packets/view/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/packets/view-packet/view-packet.module').then(m => m.ViewPacketPageModule)
  },
  {
    path: 'packets/create',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/packets/create-packet/create-packet.module').then(m => m.CreatePacketPageModule)
  },
  {
    path: 'packets/update/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/packets/update-packet/update-packet.module').then(m => m.UpdatePacketPageModule)
  },
  {
    path: 'specialities/list',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/specialities/list-specialities/list-specialities.module').then(m => m.ListSpecialitiesPageModule)
  },
  {
    path: 'specialities/create',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/specialities/create-speciality/create-speciality.module').then(m => m.CreateSpecialityPageModule)
  },
  {
    path: 'specialities/update/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/specialities/update-speciality/update-speciality.module').then(m => m.UpdateSpecialityPageModule)
  },
  {
    path: 'management-types/list',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/management-types/list-management-types/list-management-types.module').then(m => m.ListManagementTypesPageModule)
  },
  {
    path: 'management-types/view/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/management-types/view-management-type/view-management-type.module').then(m => m.ViewManagementTypePageModule)
  },
  {
    path: 'management-types/create',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/management-types/create-management-type/create-management-type.module').then(m => m.CreateManagementTypePageModule)
  },
  {
    path: 'management-types/update/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/management-types/update-management-type/update-management-type.module').then(m => m.UpdateManagementTypePageModule)
  },
  {
    path: 'reports/follow-up',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/reports/follow-up/follow-up.module').then(m => m.FollowUpPageModule)
  },
  {
    path: 'reports/control-general',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/reports/control-general/control-general.module').then(m => m.ControlGeneralPageModule)
  },
  {
    path: 'reports/control-professional',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/reports/control-professional/control-professional.module').then(m => m.ControlProfessionalPageModule)
  },
  {
    path: 'upload-data',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/upload-data/upload-data.module').then(m => m.UploadDataPageModule)
  },
  {
    path: 'upload-data-list',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/upload-data-list/upload-data-list.module').then( m => m.UploadDataListPageModule)
  },
  {
    path: 'upload-data-view/:id',
    canActivateChild: [auth2Guard],
    loadChildren: () => import('./pages/upload-data-view/upload-data-view.module').then( m => m.UploadDataViewPageModule)
  },


]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MobileRouterModule { }