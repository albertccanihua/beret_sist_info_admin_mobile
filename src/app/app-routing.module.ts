import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mobile/tabs/patients',
    pathMatch: 'full'
  },
  {
    path: 'mobile',
    loadChildren: () => import('./modules/mobile/mobile-routing.module').then(m => m.MobileRouterModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
