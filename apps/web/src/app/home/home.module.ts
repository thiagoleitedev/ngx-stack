import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'

import { NgxSharedModule } from '@ngx-plus/ngx-shared'

import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home.routing'

@NgModule({
  imports: [NgxSharedModule, HomeRoutingModule],
  providers: [],
  declarations: [HomeComponent],
})
export class HomeModule {}
