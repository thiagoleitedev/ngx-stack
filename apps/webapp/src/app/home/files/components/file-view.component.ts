import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { NgxUiService, NgxFormConfig, GridConfig } from '../../../ui'
import { Container, FilesService } from '../files.service'

@Component({
  selector: 'ngx-file-view',
  template: `
  <ngx-grid [config]="gridConfig"
            (action)="handleAction($event)">
  </ngx-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewComponent implements OnInit {

  @ViewChild('nameTmpl') nameTmpl: TemplateRef<any>
  public gridConfig: GridConfig
  public item

  constructor(
    public service: FilesService,
    private ui: NgxUiService,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.item = this.service.selected
    this.item.url = this.service.uploadConfig.url + '/' + this.item.name + '/download/'
    console.log(this.item)
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
        columns: [
          { field: 'name', label: 'File' },
        ],
        count$: this.service.selected$.map(selected => selected.files.length),
        items$: this.service.selected$.map(selected => selected.files),
      },
      toolbar: {
        filter: true
      },
    }
  }

  handleAction(event) {
    switch (event.type) {
      case 'Cancel': {
        return this.router.navigate(['/home/files'])
      }
      default:
        return console.log('$event', event)
    }
  }
}
