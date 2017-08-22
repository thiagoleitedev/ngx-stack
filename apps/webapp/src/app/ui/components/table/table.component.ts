import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { DatatableComponent } from '@swimlane/ngx-datatable'

import { Observable } from 'rxjs/Observable'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-table',
  template: `
    <ngx-datatable [count]="config.count$ | async"
                   [rows]="config.filteredItems"
                   [columnMode]="config.columnMode || default.columnMode"
                   [columns]="config.columns"
                   [cssClasses]="config.cssClasses || default.cssClasses"
                   [externalPaging]="config.externalPaging || default.externalPaging"
                   [footerHeight]="config.footerHeight || default.footerHeight"
                   [headerHeight]="config.headerHeight || default.headerHeight"
                   [limit]="config.limit || default.limit"
                   [loadingIndicator]="config.loadingIndicator || default.loadingIndicator"
                   [messages]="config.messages || default.messages"
                   [offset]="config.offset || default.offset"
                   [rowHeight]="config.rowHeight || default.rowHeight"
                   [scrollbarH]="config.scrollbarH || default.scrollbarH"
                   [scrollbarV]="config.scrollbarV || default.scrollbarV"
                   [sortType]="config.sortType || default.sortType">
      <ngx-datatable-column *ngFor="let col of config.columns"
                            [name]="col.name">
        <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
          <span *ngIf="!col.action">{{ value }}</span>
          <span *ngIf="col.action">
            <a href="#" (click)="$event.preventDefault(); handleAction({ type: col.action, payload: row })">
              {{ value }}
            </a>
          </span>
        </ng-template>
      </ngx-datatable-column>
      <ngx-datatable-column *ngIf="config.actionButtons"
                            name="Actions"
                            maxWidth="200"
                            resizable="false"
                            sortable="false">
        <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
          <ngx-action-button *ngFor="let button of config.actionButtons"
                             [config]="button"
                             (action)="handleAction({ type: button.action, payload: row })">
          </ngx-action-button>
        </ng-template>
      </ngx-datatable-column>
    </ngx-datatable>
    <ngx-table-footer [config]="config"
                      (action)="handleAction($event)">
    </ngx-table-footer>
  `,
})
export class TableComponent {
  @Input() config
  @Output() action = new EventEmitter()
  @ViewChild(DatatableComponent) dtable: DatatableComponent

  public default = {
    columnMode: 'force',
    cssClasses: {
      sortAscending: 'fa fa-fw fa-angle-up',
      sortDescending: 'fa fa-fw fa-angle-down',
      pagerLeftArrow: 'fa fa-fw fa-angle-left',
      pagerRightArrow: 'fa fa-fw fa-angle-right',
    },
    footerHeight: 0,
    headerHeight: 40,
    limit: 10,
    loadingIndicator: false,
    messages: {
      emptyMessage: 'No data to display',
      totalMessage: 'Total',
    },
    offset: 0,
    rowHeight: 'auto',
    scrollbarH: false,
    scrollbarV: false,
    sortType: 'single',
  }

  recalculate() {
    this.dtable.pageSize = this.config.limit
  }

  constructor(public ui: NgxUiService) {}

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
