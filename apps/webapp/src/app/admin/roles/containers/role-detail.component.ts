import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NavItem } from '../../../ui'

import { RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-detail',
  template: `
    <ngx-card *ngIf="item"
              [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
})
export class RoleDetailComponent implements OnInit {
  public cardConfig
  public item: any

  constructor(public service: RolesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.item = this.route.snapshot.data.role[0]
    this.service.setSelected(this.item)
    this.cardConfig = {
      cardTitle: this.item.name,
      icon: 'fa fa-fw fa-tag',
      nav: {
        title: 'Role Detail',
        items: [
          { icon: 'fa fa-fw fa-pencil-square-o', name: 'Edit', link: 'edit' },
          { icon: 'fa fa-fw fa-users', name: 'Users', link: 'users' },
        ],
      },
      subTitle: this.item.description,
    }
  }
}
