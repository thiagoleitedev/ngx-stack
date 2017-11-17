import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { DashCard, NgxUiService, NavItem } from '@ngx-plus/ngx-ui'

@Component({
  selector: 'ngx-admin-dashboard',
  template: `
    <ngx-dash-cards *ngIf="admin$"
                    [items]="dashCards">
    </ngx-dash-cards>
  `,
})
export class AdminDashboardComponent implements OnInit {
  public admin$: Observable<any>
  public dashCards: DashCard[]

  constructor(private ui: NgxUiService, private store: Store<any>) {}

  ngOnInit() {
    this.admin$ = this.store.select('admin')
    this.setDashCards()
  }

  setDashCards() {
    this.dashCards = [
      {
        name: 'Users',
        icon: 'fa fa-fw fa-users',
        data: this.admin$.map(admin => admin.users.count),
        link: '/admin/users',
        class: 'success',
      },
      {
        name: 'Roles',
        icon: 'fa fa-fw fa-tags',
        data: this.admin$.map(admin => admin.roles.count),
        link: '/admin/roles',
        class: 'warning',
      },
      {
        name: 'Controls',
        icon: 'fa fa-fw fa-sliders',
        data: this.admin$.map(admin => admin.controls.count),
        link: '/admin/controls',
        class: 'danger',
      },
    ]
  }
}
