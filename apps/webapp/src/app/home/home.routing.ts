import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home.component'
import { HomeDashboardComponent } from './home-dashboard.component'

import { AuthGuard } from '../state'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: HomeDashboardComponent,
      },
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule',
      },
      {
        path: 'files',
        loadChildren: './files/files.module#FilesModule',
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
