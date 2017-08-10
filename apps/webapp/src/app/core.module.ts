import { NgModule } from '@angular/core'
import { SDKBrowserModule, LoopBackConfig } from '@ngx-plus/ngx-sdk'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AuthService } from './auth'

@NgModule({
  imports: [
    NgbModule.forRoot(),
    SDKBrowserModule.forRoot(),
  ],
  providers: [
    AuthService,
  ]
})
export class CoreModule {
  constructor() {
    const apiConfig = Object.assign({}, window['apiConfig'])
    console.log(apiConfig)
    LoopBackConfig.setBaseURL(apiConfig.baseUrl)
    LoopBackConfig.setApiVersion(apiConfig.version)
  }
}
