import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NavItem } from '@ngx-plus/ngx-ui'

import { RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-detail',
  template: `
    <ngx-card *ngIf="item"
                [cardTitle]="item?.name"
                [subTitle]="item?.description"
                icon="fa fa-fw fa-tag"
                [nav]="tabs">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
})
export class RoleDetailComponent implements OnInit {

  public tabs: NavItem = {
    title: '',
    items: [
      { icon: 'fa fa-fw fa-pencil-square-o', name: 'Edit', link: 'edit' },
      { icon: 'fa fa-fw fa-users', name: 'Users', link: 'users' },
    ]
  }

  public item: any

  constructor(
    public service: RolesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.item = this.route.snapshot.data.role[0]
    this.service.setSelected(this.item)
  }
}
