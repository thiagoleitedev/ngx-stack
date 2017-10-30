import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { SharedModule } from '../shared.module'

import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin.routing'

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [AdminComponent],
})
export class AdminModule {}
