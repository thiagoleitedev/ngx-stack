import { NgModule } from '@angular/core'

import { NgxUiModule } from '@ngx-plus/ngx-ui'

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AuthComponent } from './auth.component'
import { AuthRoutingModule } from './auth.routing'

const components = [AuthComponent, LoginComponent, RegisterComponent]

@NgModule({
  imports: [NgxUiModule, AuthRoutingModule],
  declarations: [...components],
  exports: [...components],
})
export class NgxAuthModule {}
