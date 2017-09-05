import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { DatatableComponent } from '@swimlane/ngx-datatable'

import { Observable } from 'rxjs/Observable'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-table',
  template: `
    <ngx-datatable [rows]="config.filteredItems$ | async"
                   [columnMode]="config.columnMode || default.columnMode"
                   [columns]="config.columns"
                   [cssClasses]="config.cssClasses || default.cssClasses"
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
    </ngx-datatable>
    <ngx-table-footer [config]="config"
                      (action)="handleAction($event)">
    </ngx-table-footer>
    <ng-template #defaultCell let-col="column" let-row="row" let-value="value" ngx-datatable-cell-template>
      <span *ngIf="!col.action">{{ value }}</span>
      <span *ngIf="col.action">
        <a href="#" (click)="$event.preventDefault(); handleAction({ type: col.action, payload: row })">
          {{ value }}
        </a>
      </span>
    </ng-template>
    <ng-template #actionButton let-row="row" let-value="value" ngx-datatable-cell-template>
      <ngx-action-button *ngFor="let button of config.actionButtons"
                         [config]="button"
                         (action)="handleAction({ type: button.action, payload: row })"
                         nowrap>
      </ngx-action-button>
    </ng-template>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() config
  @Output() action = new EventEmitter()
  @ViewChild(DatatableComponent) dtable: DatatableComponent
  @ViewChild('defaultCell') defaultCell: TemplateRef<any>
  @ViewChild('actionButton') actionButton: TemplateRef<any>

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

  constructor(public ui: NgxUiService) { }

  ngOnInit() {
    this.config.columns.forEach(column => {
      column.name = column.label
      column.prop = column.field
      if (!column.cellTemplate) {
        column.cellTemplate = this.defaultCell
      }
    })

    if (this.config.actionButtons) {
      let colNames = this.config.columns.map(col => col.name)
      if (colNames.indexOf('Actions') === -1) {
        this.config.columns.push({
          name: 'Actions',
          label: 'Actions',
          cellTemplate: this.actionButton,
          maxWidth: 200,
          resizeable: false,
          sortable: false
        })
      }
    }

    if (!this.config.limit) {
      this.config.limit = 10
    }
  }

  recalculate() {
    this.dtable.pageSize = this.config.limit
  }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
