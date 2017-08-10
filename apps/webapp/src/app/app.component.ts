import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '@ngx-plus/ngx-ui'
import { Observable } from 'rxjs/Observable'

import { AuthService } from './auth'
import { UserActions, RoleActions, ControlActions, AuthActions } from './state'

@Component({
  selector: 'ngx-root',
  template: `
    <ngx-header [hidden]="!(user$ | async)"
                  [user]="user$ | async"
                  (action)="handleAction($event)">
    </ngx-header>
    <ngx-sidebar *ngIf="user$ | async"></ngx-sidebar>
    <ngx-body>
      <router-outlet></router-outlet>
    </ngx-body>
    <ngx-footer *ngIf="user$ | async"></ngx-footer>
  `,
})
export class AppComponent implements OnInit {

  user$: Observable<Account>

  constructor(
    private auth: AuthService,
    private ui: NgxUiService,
    private store: Store<any>,
  ) {
    this.user$ = this.store.select('auth').map(a => a.user)
  }

  ngOnInit() {
    this.auth.setHeaderImg('assets/img/ngx-plus-light.svg')
    this.ui.setHeaderImg('assets/img/ngx-plus-light.svg')
    this.ui.setSidebarNav([
      { items: [{ name: 'Dashboard', link: '/dashboard', icon: 'fa fa-fw fa-tachometer' }] },
      {
        title: 'Home',
        items: [
          { name: 'Todos', link: '/home/todos', icon: 'fa fa-fw fa-check-square-o' },
        ]
      },
      {
        title: 'Admin',
        items: [
          { name: 'Users', link: '/admin/users', icon: 'fa fa-fw fa-users' },
          { name: 'Roles', link: '/admin/roles', icon: 'fa fa-fw fa-tags' },
          { name: 'Controls', link: '/admin/controls', icon: 'fa fa-fw fa-ban' },
        ]
      }
    ])
  }

  handleAction(event) {
    switch (event.type) {
      case 'LogOut':
        return this.store.dispatch(new AuthActions.LogOut({}))
      default:
        return console.log('$event', event)
    }
  }

}
