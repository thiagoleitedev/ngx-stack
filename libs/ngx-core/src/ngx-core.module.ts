import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { NgxAdminEffects, NgxAdminReducer, NgxAdminGuard } from '@ngx-plus/ngx-admin'
import { NgxAuthEffects, NgxAuthReducer, NgxAuthGuard } from '@ngx-plus/ngx-auth'
import { SDKBrowserModule, LoopBackConfig } from '@ngx-plus/ngx-sdk'
import { NgxUiModule, NgxUiReducer } from '@ngx-plus/ngx-ui'

@NgModule({
  imports: [
    NgxUiModule.forRoot(),
    SDKBrowserModule.forRoot(),
    StoreModule.forRoot({
      auth: NgxAuthReducer,
      ui: NgxUiReducer,
    }),
    StoreModule.forFeature('admin', NgxAdminReducer),
    EffectsModule.forRoot([...NgxAdminEffects, NgxAuthEffects]),
  ],
  exports: [SDKBrowserModule, NgxUiModule],
})
export class NgxCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxCoreModule,
  ) {
    if (parentModule) {
      throw new Error('NgxCoreModule is already loaded. It can ONLY be imported in the AppModule!')
    }
    const apiConfig = Object.assign({}, window['apiConfig'])
    LoopBackConfig.setBaseURL(apiConfig.baseUrl)
    LoopBackConfig.setApiVersion(apiConfig.version)
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxCoreModule,
      providers: [NgxAdminGuard, NgxAuthGuard, LoopBackConfig],
    }
  }
}
