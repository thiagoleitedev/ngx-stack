import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { NgxCoreModule } from '@ngx-plus/ngx-core'

import { AppComponent } from './app.component'
import { AppConfig } from './app.config'
import { AppRoutingModule } from './app.routing'
import { environment } from '../environments/environment'
import { HomeReducer } from './state'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxCoreModule.forRoot(),
    StoreModule.forFeature('home', HomeReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
