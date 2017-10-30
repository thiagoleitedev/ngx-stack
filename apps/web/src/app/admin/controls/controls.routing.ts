import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ControlListComponent } from './containers/control-list.component'
import { ControlDetailComponent } from './containers/control-detail.component'
import { ControlFormComponent } from './components/control-form.component'

import { ControlResolver } from './controls.resolvers'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: ControlListComponent,
  },
  {
    path: ':id',
    component: ControlDetailComponent,
    resolve: {
      control: ControlResolver,
    },
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      {
        path: 'edit',
        component: ControlFormComponent,
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlsRoutingModule {}
