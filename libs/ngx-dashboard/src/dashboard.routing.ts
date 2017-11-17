import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DashboardComponent } from './dashboard.component'
import { AdminDashboardComponent } from './components/admin-dashboard.component'
import { HomeDashboardComponent } from './components/home-dashboard.component'

import { NgxAdminGuard } from '@ngx-plus/ngx-admin'
import { NgxAuthGuard } from '@ngx-plus/ngx-auth'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [NgxAuthGuard],
    children: [
      {
        path: 'home',
        component: HomeDashboardComponent,
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [NgxAdminGuard],
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
