import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardConfig } from '../../../ui'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-detail',
  template: `
  <ngx-card *ngIf="item"
            [config]="cardConfig">
    <router-outlet></router-outlet>
  </ngx-card>
  `,
})
export class UserDetailComponent implements OnInit {
  public cardConfig: CardConfig
  public item: any

  constructor(public service: UsersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.item = this.route.snapshot.data.systemUser[0]
    this.service.setSelected(this.item)
    this.cardConfig = {
      cardTitle: this.item.fullName,
      icon: 'fa fa-fw fa-user-circle',
      nav: {
        title: 'User Detail',
        items: [
          { icon: 'fa fa-fw fa-user', name: 'Profile', link: 'profile' },
          { icon: 'fa fa-fw fa-key', name: 'Password', link: 'password' },
          {
            icon: 'fa fa-fw fa-unlock',
            name: 'Access Tokens',
            link: 'access-tokens',
          },
          { icon: 'fa fa-fw fa-tags', name: 'Roles', link: 'roles' },
        ],
      },
      subTitle: this.item.email,
    }
  }
}
