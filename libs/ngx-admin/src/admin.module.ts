import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { NgxSharedModule } from '@ngx-plus/ngx-shared'

import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin.routing'

@NgModule({
  imports: [NgxSharedModule, AdminRoutingModule],
  declarations: [AdminComponent],
})
export class NgxAdminModule {}
