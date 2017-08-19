import { Component, OnInit, OnDestroy } from '@angular/core'
import { DashCard, NgxUiService, NavItem } from '../ui'
import { AccountApi, RoleApi, ACLApi } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'

import { UserActions, RoleActions, ControlActions } from '../state'

@Component({
  selector: 'dashboard',
  template: `
    <ngx-card [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public cardConfig
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    private ui: NgxUiService,
    private users: AccountApi,
    private roles: RoleApi,
    private controls: ACLApi
  ) {}

  ngOnInit() {
    this.cardConfig = {
      cardTitle: 'Dashboard',
      icon: 'fa fa-fw fa-tachometer',
      nav: {
        title: '',
        items: [
          { name: 'Home', link: '/dashboard/home', icon: 'fa fa-fw fa-home' },
          { name: 'Admin', link: '/dashboard/admin', icon: 'fa fa-fw fa-lock' },
        ],
      },
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    )
  }
}
