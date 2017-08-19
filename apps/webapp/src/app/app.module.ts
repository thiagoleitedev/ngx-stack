import { BrowserModule } from '@angular/platform-browser'
import { NgModule, ModuleWithProviders } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { environment } from '../environments/environment'
import {
  AuthEffects,
  AuthReducer,
  AdminReducer,
  UserEffects,
  RoleEffects,
  ControlEffects,
} from './state'

import { CoreModule } from './core.module'
import { NgxUiModule, NgxUiService } from './ui'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    StoreModule.forRoot({
      admin: AdminReducer,
      auth: AuthReducer,
    }),
    EffectsModule.forRoot([
      UserEffects,
      RoleEffects,
      ControlEffects,
      AuthEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
