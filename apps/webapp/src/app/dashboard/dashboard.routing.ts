import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DashboardComponent } from './dashboard.component'
import { AdminDashboardComponent } from './components/admin-dashboard.component'
import { HomeDashboardComponent } from './components/home-dashboard.component'

import { AuthGuard } from '../state'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeDashboardComponent,
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
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
