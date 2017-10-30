import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import {
  UiActions,
  ProjectActions,
  StorageActions,
  UserActions,
  RoleActions,
  ControlActions,
} from '../state'

@Component({
  selector: 'ngx-dashboard',
  template: `
    <ngx-card [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
})
export class DashboardComponent implements OnInit {
  public cardConfig = {
    icon: 'fa fa-fw fa-tachometer',
    cardTitle: 'Dashboard',
    nav: {
      title: 'Dashboard',
      items: [
        { name: 'Home', link: '/dashboard/home', icon: 'fa fa-fw fa-home' },
        {
          name: 'Admin',
          link: '/dashboard/admin',
          icon: 'fa fa-fw fa-lock',
        },
      ],
    },
  }

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new UiActions.ActivateHeader())
    this.store.dispatch(new UiActions.ActivateSidebar())
    this.store.dispatch(new UiActions.ActivateFooter())
    this.store.dispatch(new ProjectActions.ReadProjects({ order: 'name ASC' }))
    this.store.dispatch(
      new StorageActions.ReadContainers({
        include: 'files',
        order: 'container ASC',
      }),
    )
    this.store.dispatch(
      new UserActions.ReadUsers({ include: 'roles', order: 'fullName ASC' }),
    )
    this.store.dispatch(
      new RoleActions.ReadRoles({ include: 'principals', order: 'name ASC' }),
    )
    this.store.dispatch(new ControlActions.ReadControls({ order: 'model ASC' }))
  }
}
