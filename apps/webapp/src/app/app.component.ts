import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Account } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from './ui'
import { Observable } from 'rxjs/Observable'

import { UserActions, RoleActions, ControlActions, AuthActions } from './state'

@Component({
  selector: 'ngx-root',
  template: `
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <ngx-header [hidden]="!(user$ | async)"
                    [user]="user$ | async"
                    (action)="handleAction($event)">
        </ngx-header>
        <ngx-sidebar *ngIf="user$ | async"></ngx-sidebar>
        <ngx-body>
          <router-outlet></router-outlet>
          <ngx-alert-templates></ngx-alert-templates>
        </ngx-body>
        <ngx-footer *ngIf="user$ | async"></ngx-footer>
      </div>
    </div>
  </div>
  `,
})
export class AppComponent implements OnInit {
  user$: Observable<Account>

  constructor(private ui: NgxUiService, private store: Store<any>) {
    this.user$ = this.store.select('auth').map(a => a.user)
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
            icon: 'fa fa-fw fa-ban',
          },
        ],
      },
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
