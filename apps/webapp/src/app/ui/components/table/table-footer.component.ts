import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'

import { TableConfig } from '../../interfaces'

@Component({
  selector: 'ngx-table-footer',
  template: `
  <div class="container">
    <div class="row align-items-center justify-content-between">
      <div class="col">
        <ngb-pagination [collectionSize]="config.count$ | async"
                        [(page)]="config.currentPage || default.currentPage"
                        [pageSize]="config.limit || default.limit"
                        (pageChange)="handleAction({ type: 'PageChange', payload: $event })">
        </ngb-pagination>
      </div>
      <div *ngIf="filtered"
           class="col">
        <h5 class="text-center m-0">
          Filtered Total: <div class="badge badge-success"></div></h5>
      </div>
      <div class="col">
      <h5 class="text-right m-0">
        Total: <div class="badge badge-primary">{{ config.count$ | async }}</div>
      </h5>
      </div>
    </div>
  <div>
  `,
})
export class TableFooterComponent {
  @Input() config: TableConfig
  @Output() action = new EventEmitter()

  public default = {
    currentPage: 0,
    limit: 10,
  }

  constructor() { }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
