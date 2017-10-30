import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared.module'

import { UsersRoutingModule } from './users.routing'
import { UsersService } from './users.service'
import { UserResolver } from './users.resolvers'

import { UserAccessTokensComponent } from './components/user-access-tokens.component'
import { UserDetailComponent } from './containers/user-detail.component'
import { UserFormComponent } from './components/user-form.component'
import { UserListComponent } from './containers/user-list.component'
import { UserPasswordComponent } from './components/user-password.component'
import { UserRolesComponent } from './components/user-roles.component'

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  exports: [
    UserListComponent
  ],
  declarations: [
    UserAccessTokensComponent,
    UserDetailComponent,
    UserFormComponent,
    UserListComponent,
    UserPasswordComponent,
    UserRolesComponent,
  ],
  providers: [
    UsersService,
    UserResolver,
  ],
})
export class UsersModule { }
