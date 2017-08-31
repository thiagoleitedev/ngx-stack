import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProjectListComponent } from './containers/project-list.component'
import { ProjectDetailComponent } from './containers/project-detail.component'
import { ProjectFormComponent } from './components/project-form.component'

import { ProjectResolver } from './projects.resolvers'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: ProjectListComponent
  },
  {
    path: ':id',
    component: ProjectDetailComponent,
    resolve: {
      project: ProjectResolver
    },
    children: [
      {
        path: 'edit',
        component: ProjectFormComponent,
      },
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProjectResolver]
})
export class ProjectsRoutingModule { }
