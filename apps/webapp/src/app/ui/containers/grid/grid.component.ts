import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core'

import { TableComponent } from '../../components'
import { NgxUiService } from '../../services'
import { CardConfig, TableConfig, ToolbarConfig } from '../../interfaces'

@Component({
  selector: 'ngx-grid',
  template: `
    <ngx-card [config]="cardConfig"
              (action)="handleAction($event)">
      <div class="row align-items-center justify-content-center page-wrapper">
        <div class="col-12">
          <ngx-toolbar [config]="toolbarConfig"
                       (action)="handleAction($event)">
          </ngx-toolbar>
        </div>
        <div class="col-12">
          <ngx-table *ngIf="toolbarConfig.radioButtons.selected === 'table'"
                     [config]="tableConfig"
                     (action)="handleAction($event)">
          </ngx-table>
        </div>
      </div>
    </ngx-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  // TODO: implement cards view

  @Input() cardConfig: CardConfig
  @Input() tableConfig: TableConfig
  @Input() toolbarConfig: ToolbarConfig
  @Output() action = new EventEmitter()
  @ViewChild(TableComponent) table: TableComponent

  public items: any[]
  public searchItem: string

  constructor() {}

  ngOnInit() {
    if (!this.toolbarConfig.radioButtons) {
      this.toolbarConfig.radioButtons = {
        options: [
          {
            value: 'table',
            icon: 'fa fa-fw fa-table',
          },
          {
            value: 'cards',
            icon: 'fa fa-fw fa-th-large',
          },
        ],
        selected: 'table',
      }
    }
    this.tableConfig.items$.subscribe(items => {
      this.items = items
      this.refresh()
    })
  }

  refresh() {
    if (!this.searchItem) {
      this.tableConfig.filteredItems = this.items
    } else {
      const filtered = this.items.filter(
        item => this.getRowString(item).indexOf(this.searchItem) > -1
      )
      this.tableConfig.filteredItems = filtered
    }
  }

  getRowString(item): string {
    const list: string[] = []
    this.tableConfig.columns.forEach(col => {
      if (item[col.field]) {
        list.push(item[col.field].toString().toLowerCase())
      }
    })
    const regex = new RegExp(',', 'g')
    const output = list.toString().replace(regex, ' ')
    return output
  }

  handleAction(event) {
    switch (event.type) {
      case 'DropSelection': {
        this.tableConfig.limit = event.payload.value
        this.tableConfig.offset = 0
        return this.table.recalculate()
      }
      case 'Filter': {
        this.searchItem = event.payload.toLowerCase()
        return this.refresh()
      }
      case 'PageChange': {
        return (this.tableConfig.offset = event.payload - 1)
      }
      case 'RadioSelection': {
        return (this.toolbarConfig.radioButtons.selected = event.payload)
      }
      default: {
        return this.action.emit(event)
      }
    }
  }
}
