import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared.module'

import { RolesService } from './roles.service'
import { RoleResolver } from './roles.resolvers'
import { RolesRoutingModule } from './roles.routing'

import { RoleDetailComponent } from './containers/role-detail.component'
import { RoleListComponent } from './containers/role-list.component'
import { RoleFormComponent } from './components/role-form.component'
import { RoleUsersComponent } from './components/role-users.component'

@NgModule({
  imports: [
    SharedModule,
    RolesRoutingModule
  ],
  declarations: [
    RoleDetailComponent,
    RoleListComponent,
    RoleFormComponent,
    RoleUsersComponent,
  ],
  providers: [
    RolesService,
    RoleResolver,
  ]
})
export class RolesModule { }
