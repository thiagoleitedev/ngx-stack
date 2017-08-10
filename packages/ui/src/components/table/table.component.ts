import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/admin-sdk'
import { NgxUiService } from '../../services/ngx-ui'

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styles: [`

  `]
})
export class TableComponent {

  @Input() columns: any
  @Input() rows: any

  @Output() action = new EventEmitter()

  constructor(public ui: NgxUiService) { }

  clickColumn($event, column) {
    $event.preventDefault()
    this.action.emit({ type: 'SortByColumn', payload: column.field })
  }

  clickItem($event, action, item) {
    $event.preventDefault()
    this.action.emit({ type: action, payload: item })
  }

}
