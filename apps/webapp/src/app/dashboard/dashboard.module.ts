import { NgModule } from '@angular/core'
import { SharedModule } from '../shared.module'

import { DashboardComponent } from './dashboard.component'
import { HomeDashboardComponent } from './home/home-dashboard.component'
import { AdminDashboardComponent } from './admin/admin-dashboard.component'
import { DashboardRoutingModule } from './dashboard.routing'

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  providers: [

  ],
  declarations: [
    DashboardComponent,
    HomeDashboardComponent,
    AdminDashboardComponent,
  ],
})

export class DashboardModule { }
