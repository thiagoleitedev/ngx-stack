import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/filter'

import { TableComponent } from '../../components'
import { NgxUiService } from '../../services'
import { CardConfig, TableConfig } from '../../interfaces'

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
                     [filteredItems$]="filteredItems$"
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
  // TODO: get filtering to work correctly

  @Input() count$: Observable<number>
  @Input() items$: Observable<any[]>
  @Input() cardConfig: CardConfig
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
  @ViewChild(TableComponent) table: TableComponent

  public filteredItems$: Observable<any[]>

  constructor() { }

  getRowString(item): string {
    const list: string[] = []
    this.tableConfig.columns.forEach(col => {
      if (item[col.field]) {
        list.push(item[col.field].toString())
      }
    })
    const regex = new RegExp(',', 'g')
    const output = list.toString().toLowerCase().replace(regex, ' ')
    return output
  }

  handleAction(event) {
    switch (event.type) {
      case 'Filter': {
        if (!event.payload || event.payload === '') {
          return this.filteredItems$ = undefined
        }
        const search = event.payload.toString()
        return this.filteredItems$ = this.items$.filter(item => this.getRowString(item).indexOf(search) > -1)
      }
      case 'PageChange': {
        return (this.tableConfig.offset = event.payload - 1)
      }
      case 'RadioSelection': {
        return (this.viewSelection = event.payload)
      }
      case 'ToolbarDropSelection': {
        this.tableConfig.limit = event.payload
        this.tableConfig.offset = 0
        return this.table.recalculate()
      }
      default: {
        return this.action.emit(event)
      }
    }
  }
}
