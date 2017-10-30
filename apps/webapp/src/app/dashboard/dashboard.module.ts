import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '../shared.module'

import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard.routing'

import { AdminDashboardComponent } from './components/admin-dashboard.component'
import { HomeDashboardComponent } from './components/home-dashboard.component'

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  providers: [],
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    HomeDashboardComponent,
  ],
})
export class DashboardModule {}
