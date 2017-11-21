import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

import { NgxAuthActions } from '@ngx-plus/ngx-auth'
import { Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService, NgxUiActions } from '@ngx-plus/ngx-ui'

import { AppConfig } from './app.config'

@Component({
  selector: 'ngx-root',
  template: `
    <ngx-layout [config]="ui$ | async"
                [user]="user$ | async"
                (action)="handleAction($event)">
    </ngx-layout>
    <ngx-alert-templates></ngx-alert-templates>
    <ngx-loading [show]="loader$ | async"
                 [config]="appConfig.loader">
                 ngx-plus
    </ngx-loading>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  public loader$: Observable<boolean>
  public ui$: Observable<any>
  public user$: Observable<Account>

  constructor(public appConfig: AppConfig, private ui: NgxUiService, private store: Store<any>) {
    this.user$ = this.store.select('auth').pipe(map(auth => auth.user))
    this.ui$ = this.store.select('ui')
    this.loader$ = this.ui$.pipe(map(ui => ui.loader.active))
  }

  ngOnInit() {
    this.ui.setHeaderImg(this.appConfig.ui.headerImg)
    this.ui.setAuthHeaderImg(this.appConfig.ui.authHeaderImg)
    this.ui.setPreHeaderImg(this.appConfig.ui.preHeaderImg)
    this.ui.setPostHeaderImg(this.appConfig.ui.postHeaderImg)
    this.ui.setSidebarNav(this.appConfig.ui.sidebarNav)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.store.dispatch(new NgxUiActions.DeactivateLoader())
    }, 3000)
  }

  handleAction(event) {
    switch (event.type) {
      case 'LogOut':
        return this.store.dispatch(new NgxAuthActions.LogOut())
      case 'ToggleMorebar':
        return this.store.dispatch(new NgxUiActions.ToggleMorebar())
      case 'ToggleSidebar':
        return this.store.dispatch(new NgxUiActions.ToggleSidebar())
      default:
        return console.log('$event', event)
    }
  }
}
