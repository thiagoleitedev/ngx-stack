import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardConfig } from '../../../ui'

import { StorageService } from '../storage.service'

@Component({
  selector: 'ngx-container-detail',
  template: `
    <ngx-card *ngIf="item"
              [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerDetailComponent implements OnInit {
  public cardConfig: CardConfig
  public item

  constructor(public service: StorageService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.item = this.route.snapshot.data.container[0]
    this.service.setSelected(this.item)
    this.cardConfig = {
      cardTitle: this.item.name,
      icon: 'fa fa-fw fa-folder-open',
      nav: {
        title: 'File Detail',
        items: [
          { icon: 'fa fa-fw fa-files-o', name: 'Files', link: 'files' },
          { icon: 'fa fa-fw fa-cloud-upload', name: 'Upload', link: 'upload' },
        ],
      },
    }
  }
}
