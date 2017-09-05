import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from '../shared.module'

import { HomeComponent } from './home.component'
import { HomeDashboardComponent } from './home-dashboard.component'
import { HomeRoutingModule } from './home.routing'

import { HomeReducer } from '../state'

@NgModule({
  imports: [SharedModule, StoreModule.forFeature('home', HomeReducer), HomeRoutingModule],
  providers: [],
  declarations: [HomeComponent, HomeDashboardComponent],
})
export class HomeModule { }
