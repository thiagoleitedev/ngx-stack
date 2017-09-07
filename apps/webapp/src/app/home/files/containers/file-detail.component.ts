import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CardConfig } from '../../../ui'

import { FilesService } from '../files.service'

@Component({
  selector: 'ngx-file-detail',
  template: `
    <ngx-card *ngIf="item"
              [config]="cardConfig">
      <router-outlet></router-outlet>
    </ngx-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDetailComponent implements OnInit {
  public cardConfig: CardConfig
  public item

  constructor(public service: FilesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.item = {
      name: this.route.snapshot.params.id,
      files: this.route.snapshot.data.files
    }
    this.service.setSelected(this.item)
    this.cardConfig = {
      cardTitle: this.item.name,
      icon: 'fa fa-fw fa-folder-open',
      nav: {
        title: 'File Detail',
        items: [
          { icon: 'fa fa-fw fa-table', name: 'List', link: 'list' },
          { icon: 'fa fa-fw fa-cloud-upload', name: 'Upload', link: 'upload' },
        ],
      },
    }
  }
}
