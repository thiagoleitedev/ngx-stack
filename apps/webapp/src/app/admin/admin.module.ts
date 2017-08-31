import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SharedModule } from '../shared.module'

import { AdminComponent } from './admin.component'
import { AdminDashboardComponent } from './admin-dashboard.component'
import { AdminRoutingModule } from './admin.routing'

import {
  AdminReducer,
  UserEffects,
  RoleEffects,
  ControlEffects,
} from '../state'

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('admin', AdminReducer),
    AdminRoutingModule,
  ],
  declarations: [AdminComponent, AdminDashboardComponent],
})
export class AdminModule { }
