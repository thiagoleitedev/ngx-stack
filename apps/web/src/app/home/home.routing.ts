import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home.component'

import { NgxAuthGuard } from '@ngx-plus/ngx-auth'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NgxAuthGuard],
    children: [
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule',
      },
      {
        path: 'storage',
        loadChildren: './storage/storage.module#StorageModule',
      },
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
