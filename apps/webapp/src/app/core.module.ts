import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core'
import { SDKBrowserModule, LoopBackConfig } from '@ngx-plus/ngx-sdk'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppConfig } from './app.config'
import { environment } from '../environments/environment'
import {
  AdminGuard,
  AuthEffects,
  AuthGuard,
  AuthReducer,
  AdminReducer,
  ControlEffects,
  HomeReducer,
  ProjectEffects,
  RoleEffects,
  StorageEffects,
  UiReducer,
  UserEffects,
} from './state'

import { NgxUiModule } from './ui'

@NgModule({
  imports: [
    NgxUiModule.forRoot(),
    SDKBrowserModule.forRoot(),
    StoreModule.forRoot({
      auth: AuthReducer,
      ui: UiReducer,
    }),
    StoreModule.forFeature('home', HomeReducer),
    StoreModule.forFeature('admin', AdminReducer),
    EffectsModule.forRoot([
      AuthEffects,
      ControlEffects,
      ProjectEffects,
      RoleEffects,
      StorageEffects,
      UserEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [SDKBrowserModule, NgxUiModule],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. It can ONLY be imported in the AppModule!',
      )
    }
    const apiConfig = Object.assign({}, window['apiConfig'])
    LoopBackConfig.setBaseURL(apiConfig.baseUrl)
    LoopBackConfig.setApiVersion(apiConfig.version)
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AppConfig, AdminGuard, AuthGuard, LoopBackConfig],
    }
  }
}
