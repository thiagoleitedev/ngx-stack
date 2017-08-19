import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { NgxUiService } from '../../services/ngx-ui'

@Component({
  selector: 'ngx-table',
  template: `
    <ngx-datatable class="table table-striped"
                   [rows]="rows | async"
                   [columns]="columns"
                   [cssClasses]="tableConfig.cssClasses"
                   [messages]="tableConfig.messages"
                   [loadingIndicator]="true">
    </ngx-datatable>
  `,
})
export class TableComponent {

  @Input() columns: any[]
  @Input() rows: Observable<any[]>

  @Output() action = new EventEmitter()

  tableConfig = {
    cssClasses: {
      sortAscending: 'fa fa-arrow-up',
      sortDescending: 'fa fa-arrow-down',
      pagerLeftArrow: 'fa fa-arrow-left',
      pagerRightArrow: 'fa fa-arrow-right',
      pagerPrevious: 'fa fa-prev',
      pagerNext: 'fa fa-skip'
    },
    messages: {
      emptyMessage: 'No data to display',
      totalMessage: 'Total:'
    }
  }

  constructor(public ui: NgxUiService) { }

}
