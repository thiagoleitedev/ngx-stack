import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { FileListComponent } from './containers/file-list.component'
import { FileDetailComponent } from './containers/file-detail.component'
import { FileFormComponent } from './components/file-form.component'
import { FileViewComponent } from './components/file-view.component'

import { FileResolver } from './files.resolvers'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: FileListComponent
  },
  {
    path: ':id',
    component: FileDetailComponent,
    resolve: {
      files: FileResolver
    },
    children: [
      {
        path: 'upload',
        component: FileFormComponent,
      },
      {
        path: 'list',
        component: FileViewComponent,
      },

      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [FileResolver]
})
export class FilesRoutingModule { }
