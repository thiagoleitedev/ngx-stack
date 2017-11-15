import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'
import { SDKBrowserModule, LoopBackConfig, LoopbackReducer, LoopbackEffects } from '@ngx-plus/ngx-sdk'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppConfig } from './app.config'
import { environment } from '../environments/environment'
import {
  AdminGuard,
  AuthEffects,
  AuthGuard,
  HomeReducer,
  AdminReducer,
  UiReducer,
} from './state'

import { NgxUiModule } from './ui'

@NgModule({
  imports: [
    NgxUiModule.forRoot(),
    SDKBrowserModule.forRoot(),
    StoreModule.forRoot({
      auth: LoopbackReducer['LoopbackAuth'],
      ui: UiReducer,
    }),
    StoreModule.forFeature('home', HomeReducer),
    StoreModule.forFeature('admin', AdminReducer),
    EffectsModule.forRoot([
      ...LoopbackEffects,
      AuthEffects,
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
      throw new Error('CoreModule is already loaded. It can ONLY be imported in the AppModule!')
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
