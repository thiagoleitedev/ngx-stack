import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { RoleListComponent } from './containers/role-list.component'
import { RoleDetailComponent } from './containers/role-detail.component'
import { RoleFormComponent } from './components/role-form.component'
import { RoleUsersComponent } from './components/role-users.component'

import { RoleResolver } from './roles.resolvers'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: RoleListComponent,
  },
  {
    path: ':id',
    component: RoleDetailComponent,
    resolve: {
      role: RoleResolver,
    },
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
      {
        path: 'edit',
        component: RoleFormComponent,
      },
      {
        path: 'users',
        component: RoleUsersComponent,
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
