import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { CardConfig } from '@ngx-plus/ngx-ui'

import { ControlsService } from '../controls.service'

@Component({
  selector: 'ngx-control-detail',
  template: `
    <ngx-card *ngIf="item"
              [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlDetailComponent implements OnInit {
  public cardConfig: CardConfig
  public item: any

  constructor(public service: ControlsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.item = this.route.snapshot.data.control[0]
    this.service.setSelected(this.item)
    this.cardConfig = {
      cardTitle: this.item.model,
      icon: 'fa fa-fw fa-toggle-on',
      nav: {
        title: 'Control Detail',
        items: [{ icon: 'fa fa-fw fa-pencil-square-o', name: 'Edit', link: 'edit' }],
      },
      subTitle: this.item.property,
    }
  }
}
