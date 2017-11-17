import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { combineLatest, filter } from 'rxjs/operators'

import { TableComponent } from '../../components'
import { NgxUiService } from '../../services'
import { GridConfig } from '../../interfaces'

@Component({
  selector: 'ngx-grid',
  template: `
    <ngx-card *ngIf="config.card"
              [config]="config.card"
              (action)="handleAction($event)">
      <div class="row align-items-center justify-content-center page-wrapper">
        <div class="col-12">
          <ngx-toolbar [config]="config.toolbar"
                       (action)="handleAction($event)">
          </ngx-toolbar>
        </div>
        <div class="col-12">
          <ngx-table *ngIf="config.toolbar.radioButtons.selected === 'table'"
                     [config]="config.table"
                     (action)="handleAction($event)">
          </ngx-table>
        </div>
      </div>
    </ngx-card>
    <div *ngIf="!config.card"
         class="row align-items-center justify-content-center page-wrapper">
      <div class="col-12">
        <ngx-toolbar [config]="config.toolbar"
                     (action)="handleAction($event)">
        </ngx-toolbar>
      </div>
      <div class="col-12">
        <ngx-table *ngIf="config.toolbar.radioButtons.selected === 'table'"
                   [config]="config.table"
                   (action)="handleAction($event)">
        </ngx-table>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  // TODO: implement cards view

  @Input() config: GridConfig
  @Output() action = new EventEmitter()
  @ViewChild(TableComponent) ngxTable: TableComponent

  public items: any[]

  constructor() {}

  ngOnInit() {
    this.config.searchItem$ = new BehaviorSubject('')
    if (!this.config.toolbar.radioButtons) {
      this.config.toolbar.radioButtons = {
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
    this.config.table.filteredItems$ = this.config.table.items$.pipe(
      combineLatest(this.config.searchItem$, (items, searchItem) => {
        if (!searchItem || searchItem === '') {
          this.config.table.filteredCount = null
          return items
        }
        const filtered = items.filter(item => this.getRowString(item).indexOf(searchItem) > -1)
        this.config.table.filteredCount = filtered.length
        return filtered
      })
    )
  }

  getRowString(item): string {
    const list: string[] = []
    this.config.table.columns.forEach(col => {
      if (item[col.field]) {
        list.push(item[col.field].toString().toLowerCase())
      }
    })
    const regex = new RegExp(',', 'g')
    return list.toString().replace(regex, ' ')
  }

  handleAction(event) {
    switch (event.type) {
      case 'DropSelection': {
        this.config.table.limit = event.payload.value
        return this.ngxTable.recalculate()
      }
      case 'Filter': {
        return this.config.searchItem$.next(event.payload.toLowerCase() || '')
      }
      case 'PageChange': {
        return (this.config.table.offset = event.payload - 1)
      }
      case 'RadioSelection': {
        return (this.config.toolbar.radioButtons.selected = event.payload)
      }
      default: {
        return this.action.emit(event)
      }
    }
  }
}
