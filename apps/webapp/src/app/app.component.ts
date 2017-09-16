import { Component, OnInit, AfterViewInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from './ui'
import { ANIMATION_TYPES } from 'ngx-loading'
import { Observable } from 'rxjs/Observable'

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
                 [config]="loaderConfig">
    </ngx-loading>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  public loader$: Observable<boolean>
  public user$: Observable<Account>
  public ui$: Observable<any>

  public loaderConfig = {
    animationType: ANIMATION_TYPES.rectangleBounce,
    fullScreenBackdrop: true,
  }

  constructor(private ui: NgxUiService, private store: Store<any>) {
    this.user$ = this.store.select('auth').map(auth => auth.user)
    this.ui$ = this.store.select('ui')
    this.loader$ = this.ui$.map(ui => ui.loader.active)
  }

  ngOnInit() {
    this.ui.setHeaderImg('assets/img/ngx-plus.svg')
    this.ui.setAuthHeaderImg('assets/img/ngx-plus-light.svg')
    this.ui.setPreHeaderImg('ngx')
    this.ui.setPostHeaderImg('plus')
    this.ui.setSidebarNav([
      {
        title: 'Home',
        items: [
          {
            name: 'Dashboard',
            link: '/home/dashboard',
            icon: 'fa fa-fw fa-tachometer',
          },
          {
            name: 'Projects',
            link: '/home/projects',
            icon: 'fa fa-fw fa-calendar-check-o',
          },
          {
            name: 'Files',
            link: '/home/files',
            icon: 'fa fa-fw fa-files-o',
          },
        ],
      },
      {
        title: 'Admin',
        items: [
          {
            name: 'Dashboard',
            link: '/admin/dashboard',
            icon: 'fa fa-fw fa-tachometer',
          },
          { name: 'Users', link: '/admin/users', icon: 'fa fa-fw fa-users' },
          { name: 'Roles', link: '/admin/roles', icon: 'fa fa-fw fa-tags' },
          {
            name: 'Controls',
            link: '/admin/controls',
            icon: 'fa fa-fw fa-sliders',
          },
        ],
      },
    ])
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.store.dispatch(new UiActions.DeactivateLoader())
    }, 1000)
  }

  handleAction(event) {
    switch (event.type) {
      case 'LogOut':
        return this.store.dispatch(new AuthActions.LogOut({}))
      case 'ToggleMorebar':
        return this.store.dispatch(new UiActions.ToggleMorebar())
      case 'ToggleSidebar':
        return this.store.dispatch(new UiActions.ToggleSidebar())
      default:
        return console.log('$event', event)
    }
  }
}
