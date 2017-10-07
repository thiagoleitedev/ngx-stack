import { Component, Input, Output, EventEmitter } from '@angular/core'

import { TableConfig } from '../../interfaces'

@Component({
  selector: 'ngx-table-footer',
  template: `
  <div class="container">
    <div class="row align-items-center justify-content-between">
      <div class="col">
        <ngb-pagination [collectionSize]="(config.count$ | async) || 0"
                        [(page)]="config.currentPage || default.currentPage"
                        [pageSize]="config.limit"
                        (pageChange)="handleAction({ type: 'PageChange', payload: $event })">
        </ngb-pagination>
      </div>
      <div *ngIf="config.filteredCount"
           class="col">
        <h5 class="text-center m-0">
          Filtered Total: <div class="badge badge-success text-white">{{ config.filteredCount | number }}</div></h5>
      </div>
      <div class="col">
      <h5 class="text-right m-0">
        Total: <div class="badge badge-primary">{{ (config.count$ | async) || 0 }}</div>
      </h5>
      </div>
    </div>
  </div>
  `,
})
export class TableFooterComponent {
  @Input() config: TableConfig
  @Output() action = new EventEmitter()

  public default = {
    currentPage: 0,
    limit: 10,
  }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
