import { NgModule } from '@angular/core'

import { NgxSharedModule } from '@ngx-plus/ngx-shared'

import { ControlsService } from './controls.service'
import { ControlResolver } from './controls.resolvers'
import { ControlsRoutingModule } from './controls.routing'
import { ControlDetailComponent } from './containers/control-detail.component'
import { ControlListComponent } from './containers/control-list.component'
import { ControlFormComponent } from './components/control-form.component'

@NgModule({
  imports: [NgxSharedModule, ControlsRoutingModule],
  declarations: [ControlDetailComponent, ControlListComponent, ControlFormComponent],
  providers: [ControlsService, ControlResolver],
})
export class ControlsModule {}
