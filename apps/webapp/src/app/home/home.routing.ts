import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home.component'
import { HomeDashboardComponent } from './home-dashboard.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeDashboardComponent,
      },
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule',
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
