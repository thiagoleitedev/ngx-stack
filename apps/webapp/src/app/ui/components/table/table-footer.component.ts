import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { NgxUiService } from '../../services'

@Component({
  selector: 'ngx-table-footer',
  template: `
  <div class="container">
    <div class="row align-items-center justify-content-between">
      <div class="col">
        <ngb-pagination [collectionSize]="count$ | async"
                        [(page)]="currentPage"
                        [pageSize]="config.limit"
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
        Total: <div class="badge badge-primary">{{ count$ | async }}</div>
      </h5>
      </div>
    </div>
  <div>
  `,
})
export class TableFooterComponent {
  @Input() config
  @Input() currentPage: number = 0
  @Input() count$: Observable<number>
  @Output() action = new EventEmitter()

  constructor(public ui: NgxUiService) { }

  handleAction(event) {
    switch (event.type) {
      default: {
        return this.action.emit(event)
      }
    }
  }
}
