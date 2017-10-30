import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { CoreModule } from './core.module'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule.forRoot(), AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
