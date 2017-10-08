import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from './ui'
import { Observable } from 'rxjs/Observable'

import { AppConfig } from './app.config'
import { AuthActions, UiActions } from './state'

@Component({
  selector: 'ngx-root',
  template: `
    <ngx-layout [config]="ui$ | async"
                [user]="user$ | async"
                (action)="handleAction($event)">
    </ngx-layout>
    <ngx-alert-templates></ngx-alert-templates>
    <ngx-loading [show]="loader$ | async"
                 [config]="config.loader">
    </ngx-loading>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  public loader$: Observable<boolean>
  public ui$: Observable<any>
  public user$: Observable<Account>

  constructor(
    public config: AppConfig,
    private ui: NgxUiService,
    private store: Store<any>,
  ) {
    this.user$ = this.store.select('auth').map(auth => auth.user)
    this.ui$ = this.store.select('ui')
    this.loader$ = this.ui$.map(ui => ui.loader.active)
  }

  ngOnInit() {
    this.ui.setHeaderImg(this.config.ui.headerImg)
    this.ui.setAuthHeaderImg(this.config.ui.authHeaderImg)
    this.ui.setPreHeaderImg(this.config.ui.preHeaderImg)
    this.ui.setPostHeaderImg(this.config.ui.postHeaderImg)
    this.ui.setSidebarNav(this.config.ui.sidebarNav)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.store.dispatch(new UiActions.DeactivateLoader())
    }, 1000)
  }

  handleAction(event) {
    switch (event.type) {
      case 'LogOut':
        return this.store.dispatch(new AuthActions.LogOut())
      case 'ToggleMorebar':
        return this.store.dispatch(new UiActions.ToggleMorebar())
      case 'ToggleSidebar':
        return this.store.dispatch(new UiActions.ToggleSidebar())
      default:
        return console.log('$event', event)
    }
  }
}
