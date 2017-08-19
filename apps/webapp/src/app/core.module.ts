import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core'
import { SDKBrowserModule, LoopBackConfig } from '@ngx-plus/ngx-sdk'

import { NgxUiModule } from './ui'

@NgModule({
  imports: [SDKBrowserModule.forRoot(), NgxUiModule.forRoot()],
  providers: [],
  exports: [SDKBrowserModule, NgxUiModule],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. It can ONLY be imported in the AppModule!'
      )
    }
    const apiConfig = Object.assign({}, window['apiConfig'])
    // console.log(apiConfig)
    LoopBackConfig.setBaseURL(apiConfig.baseUrl)
    LoopBackConfig.setApiVersion(apiConfig.version)
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [],
    }
  }
}
