import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NavItem } from '../../../ui'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-detail',
  template: `
    <ngx-card *ngIf="item"
              [cardTitle]="item?.fullName"
              [subTitle]="item?.email"
              icon="fa fa-fw fa-user-circle"
              [nav]="tabs">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
})
export class UserDetailComponent implements OnInit {

  public tabs: NavItem = {
    title: '',
    items: [
      { icon: 'fa fa-fw fa-user', name: 'Profile', link: 'profile' },
      { icon: 'fa fa-fw fa-key', name: 'Password', link: 'password' },
      { icon: 'fa fa-fw fa-unlock', name: 'Access Tokens', link: 'access-tokens' },
      { icon: 'fa fa-fw fa-tags', name: 'Roles', link: 'roles' },
    ]
  }

  public item: any

  constructor(
    public service: UsersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.item = this.route.snapshot.data.systemUser[0]
    this.service.setSelected(this.item)
  }
}
