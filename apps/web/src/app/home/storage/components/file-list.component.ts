import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'

import { GridConfig, NgxUiService } from '@ngx-plus/ngx-ui'

import { StorageService } from '../storage.service'

@Component({
  selector: 'ngx-file-list',
  template: `
  <ngx-grid [config]="gridConfig"
            (action)="handleAction($event)">
  </ngx-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent implements OnInit {
  @ViewChild('nameTmpl') nameTmpl: TemplateRef<any>
  public gridConfig: GridConfig
  public item

  constructor(private service: StorageService, private router: Router, private ui: NgxUiService) {}

  ngOnInit() {
    this.item = this.service.selected
    this.gridConfig = {
      table: {
        actionButtons: [
          {
            action: 'Download',
            class: 'btn btn-outline-info btn-sm',
            icon: 'fa fa-fw fa-cloud-download',
          },
          {
            action: 'Delete',
            class: 'btn btn-outline-danger btn-sm',
            icon: 'fa fa-fw fa-trash',
          },
        ],
        columns: [{ field: 'name', label: 'File' }],
        count$: this.service.selected$.map(selected => selected.files.length),
        items$: this.service.selected$.map(selected => selected.files),
      },
      toolbar: {
        filter: true,
      },
    }
  }

  handleAction(event) {
    switch (event.type) {
      case 'Cancel': {
        return this.router.navigate(['/home/storage'])
      }
      case 'Delete': {
        const successCb = () => this.service.deleteFile(event.payload)
        const question = {
          title: `Are you sure?`,
          text: 'This action cannot be undone.',
        }
        return this.ui.alerts.alertError(question, successCb, () => ({}))
      }
      case 'Download': {
        const item = {
          container: event.payload.container,
          file: event.payload.name,
        }
        return this.service.download(
          item,
          () =>
            this.ui.alerts.notifySuccess({
              title: 'Download Success',
              body: `You have successfully downloaded ${item.file}`,
            }),
          (err: any) =>
            this.ui.alerts.notifyError({
              title: 'Download Error',
              body: err.message,
            })
        )
      }
      default: {
        return console.log('$event', event)
      }
    }
  }
}
