import { Component, OnInit, OnDestroy } from '@angular/core'
import { DashCard, NgxUiService, NavItem } from '@ngx-plus/ngx-ui'
import { AccountApi, RoleApi, ACLApi } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'

import { UserActions, RoleActions, ControlActions } from '../state'

@Component({
  selector: 'dashboard',
  template: `
    <ngx-card icon="fa fa-fw fa-tachometer"
              cardTitle="Dashboard"
              [nav]="nav">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {

  public adminCards: DashCard[]
  public nav: NavItem
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    private ui: NgxUiService,
    private users: AccountApi,
    private roles: RoleApi,
    private controls: ACLApi,
  ) {

  }

  ngOnInit() {
    this.nav = {
      title: '',
      items: [
        { name: 'Home', link: '/dashboard/home', icon: 'fa fa-fw fa-home' },
        { name: 'Admin', link: '/dashboard/admin', icon: 'fa fa-fw fa-lock' }
      ]
    }
    this.ui.activateHeader()
    this.setDashCards()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  setDashCards() {
    this.adminCards = [
      {
        name: 'Users',
        icon: 'users',
        data: this.users.count().map(c => c.count),
        link: '/admin/users',
        class: 'primary',
      },
      {
        name: 'Roles',
        icon: 'tags',
        data: this.roles.count().map(c => c.count),
        link: '/admin/roles',
        class: 'warning',
      },
      {
        name: 'Controls',
        icon: 'ban',
        data: this.controls.count().map(c => c.count),
        link: '/admin/controls',
        class: 'danger',
      }
    ]
  }

}
