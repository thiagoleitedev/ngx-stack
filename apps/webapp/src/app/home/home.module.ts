import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '../shared.module'

import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home.routing'

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {}
