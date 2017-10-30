import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { UserListComponent } from './containers/user-list.component'
import { UserDetailComponent } from './containers/user-detail.component'

import { UserAccessTokensComponent } from './components/user-access-tokens.component'
import { UserPasswordComponent } from './components/user-password.component'
import { UserFormComponent } from './components/user-form.component'
import { UserRolesComponent } from './components/user-roles.component'

import { UserResolver } from './users.resolvers'

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: UserListComponent,
  },
  {
    path: ':id',
    component: UserDetailComponent,
    resolve: {
      systemUser: UserResolver
    },
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        component: UserFormComponent,
      },
      {
        path: 'password',
        component: UserPasswordComponent,
      },
      {
        path: 'access-tokens',
        component: UserAccessTokensComponent,
      },
      {
        path: 'roles',
        component: UserRolesComponent,
      },
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
