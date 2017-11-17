import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { CardConfig } from '@ngx-plus/ngx-ui'

import { RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-detail',
  template: `
    <ngx-card *ngIf="item"
              [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleDetailComponent implements OnInit {
  public cardConfig: CardConfig
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
