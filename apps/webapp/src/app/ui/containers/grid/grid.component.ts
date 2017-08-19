import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'

import { NgxUiService } from '../../services'
import { TableConfig } from '../../interfaces'

@Component({
  selector: 'ngx-grid',
  template: `
    <ngx-card [config]="cardConfig"
              (action)="handleAction($event)">
      <div class="row align-items-center justify-content-center page-wrapper">
        <div class="col-12">
          <ngx-toolbar [viewOptions]="viewOptions"
                       [viewSelection]="viewSelection"
                       (action)="handleAction($event)">
          </ngx-toolbar>
        </div>
        <div class="col-12">
          <ngx-table *ngIf="viewSelection === 'table'"
                     [config]="tableConfig"
                     [count$]="count$"
                     [items$]="items$"
                     (action)="handleAction($event)">
          </ngx-table>
          <ngx-table-footer [config]="tableConfig"
                            [count$]="count$"
                            (action)="handleAction($event)">
          </ngx-table-footer>
        </div>
      </div>
    </ngx-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() count$: Observable<number>
  @Input() items$: Observable<any[]>
  @Input() cardConfig = {
    cardTitle: 'Roles',
    icon: 'fa fa-fw fa-tags',
  }
  @Input()
  viewOptions = [
    {
      value: 'table',
      icon: 'fa fa-fw fa-table',
    },
    {
      value: 'cards',
      icon: 'fa fa-fw fa-th-large',
    },
  ]
  @Input() viewSelection = 'table'
  @Input() tableConfig: TableConfig
  @Output() action = new EventEmitter()

  constructor() { }

  handleAction(event) {
    switch (event.type) {
      case 'PageChange': {
        return (this.tableConfig.offset = event.payload - 1)
      }
      case 'RadioSelection': {
        return (this.viewSelection = event.payload)
      }
      case 'ToolbarDropSelection': {
        this.tableConfig.limit = event.payload
        return (this.tableConfig.offset = 0)
      }
      default: {
        return console.log('$event', event)
      }
    }
  }
}
