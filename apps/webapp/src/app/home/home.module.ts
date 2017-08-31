import { NgModule } from '@angular/core'
import { SharedModule } from '../shared.module'

import { HomeComponent } from './home.component'
import { HomeDashboardComponent } from './home-dashboard.component'
import { HomeRoutingModule } from './home.routing'

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  providers: [],
  declarations: [HomeComponent, HomeDashboardComponent],
})
export class HomeModule { }
