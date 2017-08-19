import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SharedModule } from '../shared.module'

import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin.routing'
// import { ControlModule } from './controls/control.module'

import {
  AdminReducer,
  UserEffects,
  RoleEffects,
  ControlEffects,
} from '../state'

@NgModule({
  imports: [
    SharedModule,
    // ControlModule,
    StoreModule.forFeature('admin', AdminReducer),
    AdminRoutingModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule {}
