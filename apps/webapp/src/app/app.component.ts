import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from './ui'
import { Observable } from 'rxjs/Observable'

import {
  UserActions,
  RoleActions,
  ControlActions,
  AuthActions,
  UiActions,
} from './state'

@Component({
  selector: 'ngx-root',
  template: `
    <ngx-layout [config]="(ui$ | async)"
                [user]="(user$ | async)"
                (action)="handleAction($event)">
    </ngx-layout>
    <ngx-alert-templates></ngx-alert-templates>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public user$: Observable<Account>
  public ui$: Observable<any>

  constructor(private ui: NgxUiService, private store: Store<any>) {
    this.user$ = this.store.select('auth').map(a => a.user)
    this.ui$ = this.store.select('ui')
  }

  ngOnInit() {
    this.ui.setHeaderImg('assets/img/ngx-plus.svg')
    this.ui.setAuthHeaderImg('assets/img/ngx-plus-light.svg')
    this.ui.setPreHeaderImg('ngx')
    this.ui.setPostHeaderImg('plus')
    this.ui.setSidebarNav([
      {
        items: [
          {
            name: 'Dashboard',
            link: '/dashboard',
            icon: 'fa fa-fw fa-tachometer',
          },
        ],
      },
      {
        title: 'Home',
        items: [
          {
            name: 'Todos',
            link: '/home/todos',
            icon: 'fa fa-fw fa-check-square-o',
          },
        ],
      },
      {
        title: 'Admin',
        items: [
          { name: 'Users', link: '/admin/users', icon: 'fa fa-fw fa-users' },
          { name: 'Roles', link: '/admin/roles', icon: 'fa fa-fw fa-tags' },
          {
            name: 'Controls',
            link: '/admin/controls',
            icon: 'fa fa-fw fa-cogs',
          },
        ],
      },
    ])
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
