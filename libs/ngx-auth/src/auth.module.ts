import { NgModule } from '@angular/core'

import { NgxSharedModule } from '@ngx-plus/ngx-shared'

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AuthComponent } from './auth.component'
import { AuthHeaderComponent } from './header/auth-header.component'
import { AuthRoutingModule } from './auth.routing'

const components = [AuthComponent, AuthHeaderComponent, LoginComponent, RegisterComponent]

@NgModule({
  imports: [NgxSharedModule, AuthRoutingModule],
  declarations: [...components],
  exports: [...components],
})
export class NgxAuthModule {}
