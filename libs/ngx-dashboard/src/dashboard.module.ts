import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { NgxSharedModule } from '@ngx-plus/ngx-shared'

import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard.routing'
import { AdminDashboardComponent } from './components/admin-dashboard.component'
import { HomeDashboardComponent } from './components/home-dashboard.component'

@NgModule({
  imports: [NgxSharedModule, DashboardRoutingModule],
  providers: [],
  declarations: [DashboardComponent, AdminDashboardComponent, HomeDashboardComponent],
})
export class NgxDashboardModule {}
