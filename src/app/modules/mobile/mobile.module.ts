import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPageModule } from './pages/tabs/tabs.module';
import { MobileRouterModule } from './mobile-routing.module';
import { TypeheadComponent } from './components/typehead/typehead.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MobileRouterModule,
    TabsPageModule
  ]
})
export class MobileModule { }
