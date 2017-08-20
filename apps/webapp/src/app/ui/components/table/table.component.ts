import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { DatatableComponent } from '@swimlane/ngx-datatable'

import { Observable } from 'rxjs/Observable'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-table',
  template: `
    <ngx-datatable [count]="count$ | async"
                   [rows]="(filteredItems$ | async) || (items$ | async)"
                   [columnMode]="config.columnMode"
                   [columns]="config.columns"
                   [cssClasses]="config.cssClasses"
                   [externalPaging]="config.externalPaging"
                   [footerHeight]="config.footerHeight"
                   [headerHeight]="config.headerHeight"
                   [limit]="config.limit"
                   [loadingIndicator]="config.loadingIndicator"
                   [messages]="config.messages"
                   [offset]="config.offset"
                   [sortType]="config.sortType">
    </ngx-datatable>
  `,
})
export class TableComponent {
  @Input() config
  @Input() count$: Observable<number>
  @Input() filteredItems$: Observable<any[]>
  @Input() items$: Observable<any[]>
  @Output() action = new EventEmitter()
  @ViewChild(DatatableComponent) dtable: DatatableComponent

  recalculate() {
    this.dtable.pageSize = this.config.limit
  }

  constructor(public ui: NgxUiService) { }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
