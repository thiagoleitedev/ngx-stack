import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ContainerListComponent } from './containers/container-list.component'
import { ContainerDetailComponent } from './containers/container-detail.component'
import { FileListComponent } from './components/file-list.component'
import { FileFormComponent } from './components/file-form.component'

import { ContainerResolver } from './storage.resolvers'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: ContainerListComponent,
  },
  {
    path: ':id',
    component: ContainerDetailComponent,
    resolve: {
      container: ContainerResolver,
    },
    children: [
      {
        path: 'upload',
        component: FileFormComponent,
      },
      {
        path: 'files',
        component: FileListComponent,
      },

      { path: '', redirectTo: 'files', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ContainerResolver],
})
export class StorageRoutingModule {}
